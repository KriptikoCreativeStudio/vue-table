<template>
    <div>
        <div class="card mb-4">
            <div class="card-body">
                <div class="form-row">
                    <slot name="filters" v-bind:columns="columnsPayload" v-bind:refreshResults="refreshResults"></slot>

                    <div class="col">
                        <vue-table-search-bar v-if="isSearchable"
                                              @searchPerformed="getItems"
                        />
                    </div>

                    <div class="col-auto">
                        <slot name="reset-button" v-bind:resetFilters="resetFilters">
                            <button type="button" class="btn btn-primary" @click="resetFilters">
                                <i class="fas fa-eraser"></i>
                            </button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-body">
                <slot name="header" v-bind:table="this"></slot>

                <div class="alert alert-info" v-if="items.length === 0">
                    {{ lang.no_records }}
                </div>

                <div v-else>
                    <div class="table-responsive">
                        <table :class="tableClass">
                            <thead>
                                <tr>
                                    <th v-if="orderable" class="fit-content"></th>
                                    <th v-if="checkable.display" class="fit-content">
                                        <div class="custom-control custom-checkbox">
                                            <input class="custom-control-input" type="checkbox"
                                                   :id="`vueTableCheckableAll${_uid}`"
                                                   @change="toggleVueTableCheckables">
                                            <label class="custom-control-label"
                                                   :for="`vueTableCheckableAll${_uid}`"></label>
                                        </div>
                                    </th>
                                    <th v-for="column in visibleColumns"
                                        :key="column.name"
                                        :class="column.headerClasses"
                                    >
                                        <vue-table-heading :column="column" @vueTableSortChanged="setColumnSorting"/>
                                    </th>
                                </tr>
                            </thead>

                            <vue-draggable v-model="items"
                                           tag="tbody"
                                           handle=".v-table-drag-handle"
                                           :disabled="!orderable"
                                           @change="$emit('vueTableItemsReordered', $event.moved.element, $event.moved.newIndex)"
                            >
                                <tr v-for="(item, index) in items" :key="index" :class="setRowClass(item, index)">
                                    <td v-if="orderable" class="fit-content align-middle">
                                        <button class="btn btn-sm v-table-drag-handle" type="button">
                                            <i class="fas fa-arrows-alt-v"></i>
                                        </button>
                                    </td>
                                    <td v-if="checkable.display" class="fit-content align-middle">
                                        <div class="custom-control custom-checkbox">
                                            <input class="custom-control-input" type="checkbox"
                                                   :id="`vueTableCheckable${_uid}_${item[checkable.attribute]}`"
                                                   :value="item[checkable.attribute]"
                                                   v-model="selectedItems"
                                            >
                                            <label class="custom-control-label"
                                                   :for="`vueTableCheckable${_uid}_${item[checkable.attribute]}`"></label>
                                        </div>
                                    </td>
                                    <td v-for="(column, index) in visibleColumns"
                                        :key="index"
                                        :class="column.rowClasses"
                                    >
                                        <template v-if="column.render && typeof column.render === 'function'">
                                            <div v-html="column.render(item)"></div>
                                        </template>

                                        <template v-else-if="column.slotName">
                                            <slot :name="column.slotName" v-bind:item="item"></slot>
                                        </template>

                                        <template v-else-if="column.name">
                                            {{ column.name.split(".").reduce((a,b) => a[b], item) }}
                                        </template>
                                    </td>
                                </tr>
                            </vue-draggable>
                        </table>
                    </div>

                    <vue-table-pagination v-if="paginate"
                                          :items="totalItems"
                                          @itemsPerPageSelected="getItems"
                                          @pageSelected="getItems"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import VueTableHeading from "@/components/VueTableHeading";
    import VueTableSearchBar from "@/components/VueTableSearchBar";
    import VueTablePagination from "@/components/VueTablePagination";
    import store from '@/store/';
    import { localStorageManager } from "../mixins/local-storage-manager";
    import { filtersManager } from "../mixins/filters-manager";
    import VueDraggable from 'vuedraggable';

    export default {
        store,
        name: "VueTable",
        mixins: [localStorageManager, filtersManager],
        components: {
            VueTableHeading,
            VueDraggable,
            VueTablePagination,
            VueTableSearchBar
        },
        data: function () {
            return {
                items: [],
                selectedItems: [],
                lang: {
                    "no_records": "No records found!",
                    "search_for": "Search for..."
                },
                totalItems: 0,
                columnsPayload: {}
            };
        },
        props: {
            tableClass: {
                type: String,
                default: 'table table-striped',
            },
            rowClass: {
                type: [String, Function],
                default: '',
            },
            columns: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            dataKey: {
                type: String,
                default: 'data'
            },
            locale: {
                type: String,
                default: 'en'
            },
            metaKey: {
                type: String,
                default: null
            },
            orderable: {
                type: Boolean,
                default: false
            },
            checkable: {
                type: Object,
                default: function () {
                    return {
                        display: false,
                        attribute: null
                    };
                },
                validator: function (checkable) {
                    return Object.prototype.hasOwnProperty.call(checkable, 'display') && Object.prototype.hasOwnProperty.call(checkable, 'attribute');
                }
            },
            paginate: {
                type: Boolean,
                default: true
            },
            uri: {
                type: String,
                default: null
            }
        },
        methods: {
            /**
             * Get the items from storage.
             *
             * @param extraParams
             * @returns {Promise<AxiosResponse<T>>}
             */
            getItems(extraParams = {}) {
                const axios = require('axios');
                const qs = require('qs');

                let options = {
                    params: {
                        columns: this.columnsPayload,
                        page: this.page,
                        perPage: this.itemsPerPage,
                        search: this.search,
                        extraParams: extraParams
                    },
                    paramsSerializer: function (params) {
                        return qs.stringify(params);
                    },
                };

                this.storeFilters();

                return axios.get(this.uri, options)
                    .then(response => {
                        if (Object.prototype.hasOwnProperty.call(response.data, this.dataKey)) {
                            this.items = response.data[this.dataKey];
                        }

                        this.totalItems = ((this.metaKey != null) ? response.data[this.metaKey].total : response.data.total) || this.items.length;

                        this.$emit('update:items', this.items);
                    });
            },

            /**
             * Refresh results.
             */
            refreshResults() {
                this.setPage(1);

                this.getItems();
            },

            /**
             * Returns the searchable columns
             *
             * @return {array}
             */
            getSearchableColumns() {
                return this.columns.filter(column => column.searchable);
            },

            /**
             * Checks that the columns contain all the required properties
             * and that these properties are correctly initialized.
             */
            hydrateColumns() {
                this.columns.forEach(column => {
                    // Set name defaults
                    if (!Object.prototype.hasOwnProperty.call(column, 'name')) {
                        column.name = null;
                    }

                    // Set title defaults
                    if (!Object.prototype.hasOwnProperty.call(column, 'title')) {
                        column.title = '';
                    }

                    // Set sortable defaults
                    if (!Object.prototype.hasOwnProperty.call(column, 'sortable') || typeof column.sortable !== 'boolean') {
                        column.sortable = true;
                    }

                    // Set visibility defaults
                    if (!Object.prototype.hasOwnProperty.call(column, 'visible')) {
                        column.visible = true;
                    }
                });
            },

            /**
             * Toggles the selected items.
             */
            toggleVueTableCheckables(event) {
                if (event.target.checked) {
                    this.selectedItems = this.items.map(item => item[this.checkable.attribute]);
                } else {
                    this.selectedItems = [];
                }
            },

            /**
             * Evaluates whether the rowClass property is a String or a Function and returns the resulting evaluation.
             *
             * @param item
             * @param index
             */
            setRowClass(item, index) {
                if (typeof (this.rowClass) === 'function') {
                    return this.rowClass(item, index);
                }
                return this.rowClass;
            },

            setColumnSorting({ columnName, columnSort }) {
                this.columnsPayload[columnName].sort = columnSort;

                this.getItems();
            },

            ...mapActions('paginationModule', { setPage: 'setPageAction' }),
            ...mapActions('searchModule', { setSearchValue: 'setValueAction' }),
            ...mapActions('itemsPerPageModule', { setItemsPerPage: 'setItemsPerPageAction' }),
        },
        computed: {
            /**
             * Checks whether the search form should be displayed. The form will
             * be displayed if there is at least one searchable column.
             *
             * @returns {boolean}
             */
            isSearchable: function () {
                return this.getSearchableColumns().length > 0;
            },

            /**
             * Scope the columns to only include the ones that are visible.
             *
             * @returns {*}
             */
            visibleColumns: function () {
                return this.columns.filter((column) => column.visible);
            },

            ...mapState('searchModule', { search: 'value' }),
            ...mapState('paginationModule', ['page']),
            ...mapState('itemsPerPageModule', ['itemsPerPage']),
        },
        created() {
            this.hydrateColumns();
        }
    };
</script>

<style scoped lang="scss">
    .fit-content {
        width: 1%;
        white-space: nowrap;
    }
</style>

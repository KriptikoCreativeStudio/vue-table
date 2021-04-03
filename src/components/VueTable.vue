<template>
    <div>
        <div class="card mb-4">
            <div class="card-body">
                <div class="form-row">
                    <slot name="filters"></slot>

                    <div class="col">
                        <vue-table-search-bar v-if="isSearchable"/>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-body">
                <slot name="header"></slot>

                <div class="alert alert-info" v-if="items.length === 0">
                    {{ lang.no_records }}
                </div>

                <div v-else>
                    <div class="table-responsive">
                        <table class="table table-striped">
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
                                        <vue-table-heading :column="column"/>
                                    </th>
                                    <th v-if="actions.slots.length"></th>
                                </tr>
                            </thead>

                            <vue-draggable v-model="items"
                                           tag="tbody"
                                           handle=".v-table-drag-handle"
                                           :disabled="!orderable"
                                           @change="$emit('itemsReordered', $event.moved.element, $event.moved.newIndex)"
                            >
                                <tr v-for="(item, index) in items" :key="index">
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

                                        <template v-else-if="column.name">
                                            {{ item[column.name] }}
                                        </template>

                                        <template v-else-if="column.slotName">
                                            <slot :name="column.slotName" v-bind:item="item"></slot>
                                        </template>
                                    </td>
                                    <td v-if="actions.slots.length" :class="actions.classes"
                                        class="fit-content align-middle">
                                        <slot v-for="action in actions.slots" :name="`action-${action}`"
                                              v-bind:item="item"></slot>
                                    </td>
                                </tr>
                            </vue-draggable>
                        </table>
                    </div>

                    <vue-table-pagination v-if="paginate"
                                          :items="totalItems"
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
    import VueDraggable from 'vuedraggable';

    export default {
        store,
        name: "VueTable",
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
                totalItems: 0
            };
        },
        props: {
            actions: {
                type: Object,
                default: function () {
                    return {
                        classes: "",
                        slots: []
                    };
                },
                validator: function (actions) {
                    return Object.prototype.hasOwnProperty.call(actions, 'slots') && typeof actions.slots === "object";
                }
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
            perPage: {
                type: Number,
                default: null,
                validator: function (value) {
                    return value > 0;
                }
            },
            sorting: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            uri: {
                type: String,
                default: null
            }
        },
        methods: {
            /**
             * Get the items
             */
            getItems() {
                const axios = require('axios');
                const qs = require('qs');

                let options = {
                    params: {
                        columns: this.columns,
                        page: this.page,
                        filters: this.filters,
                        perPage: this.itemsPerPage,
                        search: this.search,
                        sorting: this.currentSorting
                    },
                    paramsSerializer: function (params) {
                        return qs.stringify(params);
                    },
                };

                axios.get(this.uri, options)
                    .then(response => {
                        if (Object.prototype.hasOwnProperty.call(response.data, this.dataKey)) {
                            this.items = response.data[this.dataKey];
                        }

                        this.totalItems = ((this.metaKey != null) ? response.data[this.metaKey].total : response.data.total) ?? this.items.length;

                        this.$emit('update:items', this.items);
                    });
            },

            /**
             * Returns the searchable columns
             *
             * @return {array}
             */
            getSearchableColumns() {
                let columns = this.columns.filter(column => column.searchable);

                return columns;
            },

            /**
             * Checks whether the columns contain all the necessary properties
             * and whether these properties have been initialized correctly.
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

            ...mapActions('sortingModule', { addSort: 'addSortAction' }),
            ...mapActions('paginationModule', { setPage: 'setPageAction' }),
            ...mapActions('itemsPerPageModule', { setItemsPerPage: 'setItemsPerPageAction' }),
            ...mapActions('filtersModule', { setFilter: 'addFilterAction' })
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
             *
             */
            visibleColumns: function () {
                return this.columns.filter((column) => column.visible);
            },

            ...mapState('filtersModule', ['filters']),
            ...mapState('sortingModule', { currentSorting: 'sorting' }),
            ...mapState('searchModule', { search: 'value' }),
            ...mapState('paginationModule', ['page']),
            ...mapState('itemsPerPageModule', ['itemsPerPage']),
        },
        watch: {
            itemsPerPage: function () {
                this.getItems();
            },
            page: function () {
                this.getItems();
            },
            currentSorting: function () {
                this.getItems();
            },
            search: function () {
                this.setPage(1);
                this.getItems();
            },
            filters: function () {
                this.setPage(1);
                this.getItems();
            }
        },
        created() {
            this.hydrateColumns();
        },
        mounted() {
            // If the perPage prop was used, let's override the local storage
            // and set the items per page on the pagination module
            if (this.perPage !== null) {
                this.setItemsPerPage(this.perPage);
            }

            // Dispatch the sorting prop values
            this.sorting.forEach(sort => this.addSort(sort));

            // Register events
            this.$root.$on('filterOptionSelected', this.setFilter);

            if (this.uri !== null) {
                this.getItems();
            }
        }
    };
</script>

<style scoped lang="scss">
    .fit-content {
        width: 1%;
        white-space: nowrap;
    }
</style>

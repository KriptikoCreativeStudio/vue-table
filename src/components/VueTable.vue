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
                <div class="alert alert-info" v-if="items.length === 0">
                    {{ lang.no_records }}
                </div>

                <div v-else>
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th v-if="orderable" class="min-width"></th>
                                    <th v-for="column in columns"
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
                                <tr v-for="item in items" :key="item.id">
                                    <td v-if="orderable" class="min-width align-middle">
                                        <button class="btn btn-sm v-table-drag-handle" type="button">
                                            <i class="fas fa-arrows-alt-v"></i>
                                        </button>
                                    </td>
                                    <td v-for="(column, index) in columns"
                                        :key="index"
                                        :class="column.rowClasses"
                                    >
                                        <template v-if="column.render && typeof column.render === 'function'">
                                            <div v-html="column.render(item)"></div>
                                        </template>

                                        <template v-else-if="column.name">
                                            {{ item[column.name] }}
                                        </template>
                                    </td>
                                    <td v-if="actions.slots.length" :class="actions.classes"
                                        class="v-table-options-wrapper min-width align-middle">
                                        <slot v-for="action in actions.slots" :name="`action-${action}`"
                                              v-bind:item="item"></slot>
                                    </td>
                                </tr>
                            </vue-draggable>
                        </table>
                    </div>

                    <vue-table-pagination v-if="paginate"
                                          :per-page="perPage"
                                          :items="totalItems"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import VueTableHeading from "./VueTableHeading";
    import VueTableSearchBar from "./VueTableSearchBar";
    import VueTablePagination from "./VueTablePagination";
    import VueDraggable from 'vuedraggable';

    export default {
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
                lang: require(`../resources/lang/${ this.locale }.json`),
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
                default: 'meta'
            },
            orderable: {
                type: Boolean,
                default: false
            },
            paginate: {
                type: Boolean,
                default: true
            },
            perPage: {
                type: Number,
                default: 20,
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
                        perPage: this.perPage,
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

                        if (Object.prototype.hasOwnProperty.call(response.data, this.metaKey)) {
                            this.totalItems = response.data[this.metaKey].total ?? this.items.length;
                        }

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
                });
            },
            ...mapActions('sortingModule', { addSort: 'addSortAction' }),
            ...mapActions('paginationModule', { setPage: 'setPageAction' })
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
            ...mapState('filtersModule', ['filters']),
            ...mapState('sortingModule', { currentSorting: 'sorting' }),
            ...mapState('searchModule', { search: 'value' }),
            ...mapState('paginationModule', ['page']),
        },
        watch: {
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
            // Dispatch the sorting prop values
            this.sorting.forEach(sort => this.addSort(sort));

            if (this.uri !== null) {
                this.getItems();
            }
        }
    };
</script>

<style lang="scss" scoped>
    .v-table {
        // Options wrapper
        &-options-wrapper {
            & > {
                :not(:last-child) {
                    margin-right: 4px;
                }

                :not(:first-child) {
                    margin-left: 4px;
                }
            }
        }
    }
</style>

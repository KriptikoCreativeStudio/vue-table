<template>
    <div>
        <vue-table-search-bar v-if="isSearchable" v-model="search"/>

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
                                    <th v-for="column in columns" :key="column.name" :class="column.class">
                                        <vue-table-heading :column.sync="column"/>
                                    </th>
                                    <th v-if="rows.actions.length"></th>
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
                                    <td v-for="(column, index) in columns" :key="index" class="align-middle"
                                        :class="column.rowClasses">
                                        <template v-if="column.name">
                                            {{ item[column.name] }}
                                        </template>

                                        <template v-else-if="column.render && typeof column.render === 'function'">
                                            <div v-html="column.render(item)"></div>
                                        </template>

                                        <template v-else-if="column.thumb && typeof column.thumb === 'function'">
                                            <div class="v-table-img-thumb">
                                                <img :src="getThumbSrc(column.thumb(item))"
                                                     :alt="getThumbAlt(column.thumb(item))">
                                            </div>
                                        </template>
                                    </td>
                                    <td v-if="rows.actions.length"
                                        class="v-table-options-wrapper min-width align-middle">
                                        <slot v-for="action in rows.actions" :name="`action-${action}`"
                                              v-bind:item="item"></slot>
                                    </td>
                                </tr>
                            </vue-draggable>
                        </table>
                    </div>

                    <vue-table-pagination v-if="paginate" :page.sync="page"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import VueTableHeading from "./VueTableHeading";
    import VueTableSearchBar from "./VueTableSearchBar";
    import VueTablePagination from "./VueTablePagination";
    import VueDraggable from 'vuedraggable';
    import ImageIcon from '../assets/image-icon.svg';
    import axios from 'axios';

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
                search: '',
                sortBy: null,
                sortDirection: null,
                lang: require(`../resources/lang/${ this.locale }.json`)
            };
        },
        props: {
            server: {
                uri: {
                    type: String,
                    default: null
                },
                responseKey: {
                    type: String,
                    default: null
                }
            },
            columns: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            rows: {
                type: Object,
                default: function () {
                    return {
                        actions: []
                    };
                }
            },
            locale: {
                type: String,
                default: 'en'
            },
            orderable: {
                type: Boolean,
                default: true
            },
            paginate: {
                type: Boolean,
                default: true
            },
            page: {
                type: Number,
                default: 1,
                validator: function (value) {
                    return value > 0;
                }
            }
        },
        methods: {
            /**
             * Get the items
             */
            getItems() {
                let options = {
                    params: {
                        search: this.search,
                        // columns: this.columns,
                        page: this.page
                    }
                };

                axios.get(this.server.uri, options)
                    .then(response => {
                        const responseKey = this.server.responseKey;

                        this.items = responseKey !== null ? response.data[responseKey] : response.data;

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
             * Get the image source.
             *
             * @param {Object} thumb
             * @return {String}
             */
            getThumbSrc(thumb) {
                if (thumb === null) {
                    return ImageIcon;
                }

                return thumb.src;
            },

            /**
             * Get the image source.
             *
             * @param {Object} thumb
             * @return {String}
             */
            getThumbAlt(thumb) {
                if (!thumb) {
                    return 'Image alt';
                }

                return thumb.alt;
            }
        },
        computed: {
            /**
             * Checks whether the search form should be displayed.
             * The form will be displayed if there are filters
             * or if there is at least one searchable columns.
             *
             * @returns {boolean}
             */
            isSearchable: function () {
                return this.getSearchableColumns().length > 0;
            }
        },
        watch: {
            search: function () {
                this.getItems();
            },
            columns: function () {
                this.getItems();
            },
            page: function () {
                this.getItems();
            }
        },
        mounted() {
            if (this.server.uri !== null) {
                this.getItems();
            }
        }
    };
</script>

<style lang="scss" scoped>
    .v-table {
        // Image thumbnails
        &-img-thumb {
            width: 70px;
            height: 50px;
            background-color: #fff;
            border: 2px solid #dedede;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
                max-width: 100%;
                max-height: 100%;
                display: block;
            }
        }

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

<template>
    <vue-table v-bind="options" :items.sync="items" ref="vueTable">
        <template v-slot:filters>
            <div class="col-md-3">
                <select class="custom-select" v-filter-column="'city.id'" ref="cityFilter">
                    <option value="">Cities</option>
                    <option v-for="city in filters.cities" :value="city.id" :key="city.id">
                        {{ city.name }}
                    </option>
                </select>
            </div>
        </template>

        <template v-slot:header>
            <div class="mb-4 text-right">
                <button class="btn btn-outline-secondary btn-sm mr-1" @click="importItems()">
                    <i class="fas fa-file-import mr-1"></i> Import
                </button>

                <button class="btn btn-outline-secondary btn-sm" @click="exportItems($refs.vueTable.selectedItems)">
                    <i class="fas fa-file-export mr-1"></i> Export
                </button>
            </div>
        </template>

        <template v-slot:star-slot="slotProps">
            <star :id="slotProps.item.id"></star>
        </template>

        <template v-slot:actions-slot="slotProps">
            <div class="btn-group">
                <button type="button" class="btn btn-sm rounded text-muted" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-ellipsis-v"></i>
                </button>

                <div class="dropdown-menu dropdown-menu-right">
                    <a class="dropdown-item text-muted"
                       :href="`${options.uri}/${slotProps.item.id}/edit`"
                    >
                        <i class="fas fa-pencil-alt fa-fw fa-xs mr-1"></i> Edit
                    </a>

                    <a class="dropdown-item text-muted" href="#" @click.prevent="handleItemDeleted(slotProps.item)">
                        <i class="fas fa-trash-alt fa-fw fa-xs mr-1"></i> Delete
                    </a>
                </div>
            </div>
        </template>
    </vue-table>
</template>

<script>
    import VueTable from "../src/components/VueTable";
    import Star from "./components/Star";
    import filterColumn from "../src/directives/filter-column.directive";
    import { dataMixin } from "./mixins/data.mixin";

    export default {
        name: 'App',
        mixins: [dataMixin],
        components: {
            VueTable,
            Star
        },
        directives: { filterColumn },
        data() {
            return {
                items: [],
                filters: {
                    cities: [],
                },
                options: {
                    tableClass: 'table',
                    columns: [
                        {
                            slotName: "star-slot",
                            rowClasses: "align-middle fit-content",
                            sortable: false,
                            searchable: false,
                        },
                        {
                            headerClasses: "fit-content",
                            name: "id",
                            rowClasses: "align-middle",
                            title: "#"
                        },
                        {
                            name: "name",
                            rowClasses: "align-middle",
                            searchable: true,
                            title: "Name"
                        },
                        {
                            name: "email",
                            rowClasses: "align-middle",
                            searchable: true,
                            title: "Email"
                        },
                        {
                            headerClasses: "text-center",
                            name: "city_id",
                            rowClasses: "align-middle text-center",
                            sortable: false,
                            searchable: true,
                            title: "City",
                            render: function (data) {
                                return data.city.name;
                            }
                        },
                        {
                            headerClasses: "fit-content",
                            name: "created_at",
                            rowClasses: "fit-content align-middle",
                            title: "Created at",
                            render(data) {
                                return new Date(data.created_at).toLocaleDateString('pt');
                            }
                        },
                        {
                            slotName: "actions-slot",
                            rowClasses: "align-middle fit-content",
                            sortable: false,
                            searchable: false,
                        }
                    ],
                    sorting: [
                        {
                            column: "created_at",
                            direction: "desc"
                        }
                    ],
                    checkable: {
                        display: true,
                        attribute: "id",
                    },
                    orderable: true,
                    uri: "https://api.sandbox.codetech.pt/api/users",
                    metaKey: "meta",
                    locale: "pt"
                }
            };
        },
        methods: {
            /**
             * Removes an item from this item list after it is deleted
             *
             * @param item
             */
            handleItemDeleted(item) {
                this.items.splice(this.items.indexOf(item), 1);
            },

            /**
             * Get the cities from an external API.
             */
            getCitiesOptions: function () {
                const axios = require('axios');

                axios.get('https://api.sandbox.codetech.pt/api/cities')
                    .then(response => {
                        new Promise((resolve) => {
                            this.filters.cities = response.data.data;

                            resolve();
                        })
                            .then(() => {
                                this.$refs.cityFilter.dispatchEvent(new Event('vueTable.optionsLoaded'));
                            });
                    });
            }
        },
        mounted() {
            this.getCitiesOptions();
        }
    };
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>

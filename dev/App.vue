<template>
    <vue-table v-bind="options" :items.sync="items">
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

        <template v-slot:action-edit="slotProps">
            <a class="btn btn-sm btn-primary"
               :href="`${options.uri}/${slotProps.item.id}/edit`"
            >
                <i class="fas fa-pencil-alt"></i>
            </a>
        </template>

        <template v-slot:action-delete="slotProps">
            <a class="btn btn-sm btn-danger ml-2" href="#" @click.prevent="handleItemDeleted(slotProps.item)">
                <i class="fas fa-trash-alt"></i>
            </a>
        </template>
    </vue-table>
</template>

<script>
    import VueTable from "../src/components/VueTable";
    import filterColumn from "../src/directives/filter-column.directive";

    export default {
        name: 'App',
        components: {
            VueTable
        },
        directives: { filterColumn },
        data() {
            return {
                items: [],
                filters: {
                    cities: [],
                },
                options: {
                    columns: [
                        {
                            headerClasses: "fit-content",
                            name: "id",
                            rowClasses: 'align-middle',
                            title: "#"
                        },
                        {
                            name: "name",
                            rowClasses: 'align-middle',
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
                            rowClasses: 'align-middle text-center',
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
                        }
                    ],
                    sorting: [
                        {
                            column: "created_at",
                            direction: "desc"
                        }
                    ],
                    actions: {
                        classes: "fit-content align-middle",
                        slots: [
                            "edit",
                            "delete"
                        ]
                    },
                    uri: 'https://api.sandbox.codetech.pt/api/users',
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

    .fit-content {
        width: 1%;
        white-space: nowrap;
    }
</style>

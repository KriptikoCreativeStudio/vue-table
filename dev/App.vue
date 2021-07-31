<template>
    <vue-table v-bind="options" :items.sync="items" ref="vueTable">
        <template v-slot:filters="slotProps">
            <div class="col-md-3">
                <select class="custom-select" @change="slotProps.refreshResults"
                        v-model="slotProps.columns.city_id.value" multiple>
                    <option value="" disabled>Cities</option>
                    <option v-for="city in filtersOptions.cities" :value="city.id" :key="city.id">
                        {{ city.name }}
                    </option>
                </select>
            </div>
            <div class="col-md-3">
                <select class="custom-select" @change="slotProps.refreshResults"
                        v-model="slotProps.columns.email.value">
                    <option value="">Email</option>
                    <option value="karianne29@example.com">karianne29@example.com</option>
                    <option value="labbott@example.org">labbott@example.org</option>
                    <option value="dejah85@example.org">dejah85@example.org</option>
                    <option value="imante@example.net">imante@example.net</option>
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

        <template v-slot:reset-button="slotProps">
            <button type="button" class="btn btn-primary" @click="slotProps.resetFilters">
                <i class="fas fa-sync-alt"></i>
            </button>
        </template>
    </vue-table>
</template>

<script>
    import VueTable from "../src/components/VueTable";
    import Star from "./components/Star";
    import { dataMixin } from "./mixins/data.mixin";

    export default {
        name: 'App',
        mixins: [dataMixin],
        components: {
            VueTable,
            Star
        },
        data() {
            return {
                items: [],
                filtersOptions: {
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
                            name: "city_id",
                            value: [],
                            visible: false,
                        },
                        {
                            headerClasses: "text-center",
                            name: "city.name",
                            rowClasses: "align-middle text-center",
                            sortable: false,
                            title: "City",
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
                    checkable: {
                        display: true,
                        attribute: "id",
                    },
                    saveState: true,
                    localStorageName: 'demoVueTable',
                    orderable: true,
                    uri: "https://api.sandbox.codetech.pt/api/users",
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
                        this.filtersOptions.cities = response.data;
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

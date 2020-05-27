<template>
    <vue-table v-bind="options" :items.sync="items">
        <template v-slot:filters>
            <div class="col-md-3">
                <select class="form-control" v-filter-column:city>
                    <option value="">Cities</option>
                    <option value="Abbottton">Abbottton</option>
                    <option value="Camrenland">Camrenland</option>
                    <option value="Delfinamouth">Delfinamouth</option>
                    <option value="East Benborough">East Benborough</option>
                    <option value="Feeneymouth">Feeneymouth</option>
                    <option value="Sipesburgh">Sipesburgh</option>
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
                options: {
                    columns: [
                        {
                            name: "id",
                            rowClasses: 'align-middle',
                            title: "#",
                            visible: false
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
                            name: "city",
                            rowClasses: 'align-middle text-center',
                            searchable: true,
                            sortable: false,
                            title: "City"
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
            }
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

<template>
    <div class="container-fluid py-5">
        <div class="form-row">
            <div class="col">
                <select class="form-control" v-filter-column:city multiple>
                    <option value="Sipesburgh">Sipesburgh</option>
                    <option value="Abbottton">Abbottton</option>
                    <option value="Abernathyville">Abernathyville</option>
                    <option value="Adriannachester">Adriannachester</option>
                    <option value="Ahmadville">Ahmadville</option>
                    <option value="Baileyfurt">Baileyfurt</option>
                    <option value="Baumbachside">Baumbachside</option>
                    <option value="Camrenland">Camrenland</option>
                    <option value="Delfinamouth">Delfinamouth</option>
                    <option value="East Benborough">East Benborough</option>
                    <option value="Feeneymouth">Feeneymouth</option>
                </select>
            </div>

            <div class="col">
                <select class="form-control" v-filter-column:name>
                    <option value="Abe Fritsch Jr.">Abe Fritsch Jr.</option>
                    <option value="Ada Stark">Ada Stark</option>
                    <option value="Alexandrine Mertz">Alexandrine Mertz</option>
                </select>
            </div>
        </div>

        <vue-table v-bind="options" :items.sync="items">


            <template v-slot:action-edit="slotProps">
                <a class="btn btn-info"
                   :href="`${options.uri}/${slotProps.item.id}/edit`"
                >
                    <i class="fas fa-pencil-alt"></i>
                </a>
            </template>

            <template v-slot:action-delete="slotProps">
                <a class="btn btn-danger" href="#" @click.prevent="handleItemDeleted(slotProps.item)">
                    <i class="fas fa-trash-alt"></i>
                </a>
            </template>
        </vue-table>
    </div>
</template>

<script>
    import VueTable from "./components/VueTable";

    export default {
        name: 'App',
        components: {
            VueTable
        },
        data() {
            return {
                items: [],
                options: {
                    columns: [
                        {
                            name: "name",
                            rowClasses: 'align-middle',
                            searchable: true,
                            title: "Name"
                        },
                        {
                            name: "email",
                            rowClasses: 'align-middle',
                            searchable: true,
                            title: "Email"
                        },
                        {
                            headerClasses: 'text-center',
                            name: "city",
                            rowClasses: 'align-middle text-center',
                            searchable: true,
                            sortable: false,
                            title: "City"
                        },
                        {
                            name: "created_at",
                            rowClasses: 'align-middle',
                            title: "Created at",
                            render(data) {
                                return new Date(data.created_at).toLocaleDateString('pt');
                            }
                        }
                    ],
                    sort: {
                        name: 'asc',
                    },
                    rows: {
                        actions: [
                            'edit',
                            'delete'
                        ]
                    },
                    uri: 'https://api.sandbox.codetech.pt/api/users',
                    metaKey: 'meta',
                    locale: 'pt'
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
</style>

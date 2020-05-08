<template>
    <div class="container-fluid py-5">
        <select class="form-control" name="city" id="city">
            <option value=""></option>
            <option value="Abbeyhaven">Abbeyhaven</option>
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

        <vue-table v-bind="options">
            <template v-slot:action-edit="slotProps">
                <a class="btn btn-info"
                   :href="`${options.uri}/${slotProps.item.id}/edit`"
                >
                    <i class="fas fa-pencil-alt"></i>
                </a>
            </template>

            <template v-slot:action-delete="slotProps">
                <a class="btn btn-danger"
                   :href="`${options.uri}/${slotProps.item.id}/delete`"
                >
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
                options: {
                    columns: [
                        // {
                        //     rowClasses: "min-width",
                        //     thumb: function (data) {
                        //         if (data.avatar === null) {
                        //             return null;
                        //         }
                        //
                        //         return {
                        //             src: data.avatar,
                        //             alt: `${ data.first_name } ${ data.last_name }`
                        //         };
                        //     },
                        //     sortable: false
                        // },
                        {
                            title: "Name",
                            name: "name",
                            searchable: true
                        },
                        {
                            title: "Email",
                            name: "email",
                            searchable: true,
                            sortable: true
                        },
                        {
                            title: "City",
                            name: "city",
                            searchable: true,
                            filtererBy: '#city',
                            sortable: true
                        },
                        {
                            title: "Created at",
                            name: "created_at",
                            render: function (data) {
                                return new Date(data.created_at).toLocaleDateString('pt');
                            }
                        }
                    ],
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
            },
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

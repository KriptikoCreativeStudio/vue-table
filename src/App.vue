<template>
    <div class="container py-5">
        <vue-table v-bind="options">
            <template v-slot:action-edit="slotProps">
                <a class="btn btn-info"
                   :href="`${options.server.uri}/${slotProps.item.id}/edit`"
                >
                    <i class="fas fa-pencil-alt"></i>
                </a>
            </template>

            <template v-slot:action-delete="slotProps">
                <a class="btn btn-danger"
                   :href="`${options.server.uri}/${slotProps.item.id}/delete`"
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
                            title: "Created at",
                            sortable: true,
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
                    server: {
                        uri: 'https://api.sandbox.codetech.pt/api/users',
                        responseKey: 'data'
                    },
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

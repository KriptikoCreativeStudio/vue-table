<template>
    <span v-if="!column.sortable">
        {{ column.title }}
    </span>

    <a v-else
       role="button"
       href="#"
       @click.prevent="setOrder"
    >
        {{ column.title }}

        <i class="fas fa-fw" :class="sortIcon"></i>
    </a>
</template>

<script>
    import { mapActions, mapState } from "vuex";

    export default {
        name: "VueTableHeading",
        props: {
            column: {
                type: Object,
                required: true,
                validator: function (value) {
                    return Object.prototype.hasOwnProperty.call(value, 'name') &&
                        Object.prototype.hasOwnProperty.call(value, 'title') &&
                        Object.prototype.hasOwnProperty.call(value, 'sortable');
                }
            }
        },
        computed: {
            sortIcon: function () {
                switch (this.sorting[this.column.name]) {
                    case 'asc':
                        return 'fa-sort-up';
                    case 'desc':
                        return 'fa-sort-down';
                    default:
                        return 'fa-sort';
                }
            },
            sort: function () {
                switch (this.sorting[this.column.name]) {
                    case 'asc':
                        return 'desc';
                    case 'desc':
                        return null;
                    default:
                        return 'asc';
                }
            },

            ...mapState('sortingModule', ['sorting'])
        },
        methods: {
            setOrder() {
                const payload = {
                    columnName: this.column.name,
                    columnSort: this.sort
                };

                this.setColumnSort(payload);

                this.$emit('vueTableSortChanged', payload);
            },
            ...mapActions('sortingModule', { setColumnSort: 'setColumnSortAction' }),
        }
    };
</script>

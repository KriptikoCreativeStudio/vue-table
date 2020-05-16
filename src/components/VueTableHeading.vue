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
        data() {
            return {
                direction: null
            };
        },
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
                switch (this.direction) {
                    case 'asc':
                        return 'fa-sort-up';

                    case 'desc':
                        return 'fa-sort-down';

                    default:
                        return 'fa-sort';
                }
            },
            ...mapState('sortingModule', ['sorting'])
        },
        methods: {
            setOrder() {
                this.direction = this.direction == null ? 'asc' : (this.direction === 'asc' ? 'desc' : null);

                this.addSort({ column: this.column.name, direction: this.direction });
            },
            extractDirectionFromSorting() {
                let column = this.sorting.filter(sort => sort.column == this.column.name);

                return column[0] ? column[0].direction : null;
            },
            ...mapActions('sortingModule', { addSort: 'addSortAction' }),
        },
        mounted() {
            if(this.sortable){
                this.direction = this.extractDirectionFromSorting();
            }
        }
    };
</script>

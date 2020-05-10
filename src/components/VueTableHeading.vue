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
    export default {
        name: "VueTableHeading",
        data() {
            return {
                currentDirection: null
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
            },
            direction: {
                type: String,
                default: null,
                validator: function (value) {
                    if (value === null) {
                        return true;
                    }

                    return ['asc', 'desc'].indexOf(value) !== -1;
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
            }
        },
        methods: {
            setCurrentDirection() {
                if (this.direction == null || ['asc', 'desc'].indexOf(this.direction) !== -1) {
                    this.currentDirection = this.direction;
                }
            },
            setOrder() {
                this.currentDirection = this.direction == null ? 'asc' : (this.direction === 'asc' ? 'desc' : null);

                this.$emit('sort', this.column.name, this.currentDirection);
            }
        },
        mounted() {
            this.setCurrentDirection();
        }
    };
</script>

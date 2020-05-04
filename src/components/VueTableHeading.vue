<template>
    <span v-if="typeof column.sortable !== 'undefined' && column.sortable === false">
        {{ column.title }}
    </span>

    <a v-else
       role="button"
       href="#"
       @click.prevent="setOrder"
    >
        {{ column.title }}

        <i class="fas" :class="`fa-sort-amount-${ direction == 'asc' ? 'up-alt' : 'down' }`"></i>
    </a>
</template>

<script>
    export default {
        name: "VueTableHeading",
        data: function () {
            return {
                direction: 'asc'
            };
        },
        props: {
            column: {
                type: Object,
                required: true
            }
        },
        methods: {
            setOrder() {
                this.direction = this.direction == 'asc' ? 'desc' : 'asc';

                this.column.sort.direction = this.direction;

                this.$emit('update:column', this.column);
            }
        }
    };
</script>

<style scoped>

</style>

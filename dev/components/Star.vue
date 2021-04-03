<template>
    <button type="button" class="btn btn-sm" @click="starred = !starred">
        <i :class="['far fa-star', starred ? 'text-warning' : 'text-muted']" ref="star"></i>
    </button>
</template>

<script>
    export default {
        name: "Star",
        data() {
            return {
                starred: false
            };
        },
        props: {
            id: {
                type: Number,
                required: true
            }
        },
        methods: {
            star() {
                alert(`Starring item ${ this.id }`);
            }
        }
    };
</script>

<style scoped>

</style>

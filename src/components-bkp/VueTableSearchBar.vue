<template>
    <div class="input-group">
        <div class="input-group-prepend">
            <div class="input-group-text">
                <i class="fas fa-search"></i>
            </div>
        </div>

        <input type="text" class="form-control" :value="value" :placeholder="lang.search_for"
               @input="setValue($event.target.value)">
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';

    export default {
        name: "VueTableSearchBar",
        data() {
            return {
                lang: this.$parent.lang
            };
        },
        methods: {
            ...mapActions('searchModule', { setValue: 'setValueAction' })
        },
        computed: {
            ...mapState('searchModule', ['value'])
        }
    };
</script>

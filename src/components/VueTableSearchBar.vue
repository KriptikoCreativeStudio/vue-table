<template>
    <div class="input-group">
        <div class="input-group-prepend">
            <div class="input-group-text">
                <i class="fas fa-search"></i>
            </div>
        </div>

        <input type="text" class="form-control" :value="value" :placeholder="lang.search_for"
               @input="handleSearch">
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import debounce from 'lodash.debounce';

    export default {
        name: "VueTableSearchBar",
        data() {
            return {
                lang: this.$parent.lang
            };
        },
        methods: {
            ...mapActions('searchModule', { setValue: 'setValueAction' }),
            ...mapActions('paginationModule', { setPage: 'setPageAction' }),

            /**
             * Handles the search event.
             *
             * @param event
             */
            handleSearch: debounce(function (event) {
                this.setValue(event.target.value);

                this.setPage(1);

                this.$emit('searchPerformed');
            }, 400)
        },
        computed: {
            ...mapState('searchModule', ['value'])
        }
    };
</script>

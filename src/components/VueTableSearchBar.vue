<template>
    <div class="card mb-4">
        <div class="card-body">
            <div class="row">
                <div class="col">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <i class="fas fa-search"></i>
                            </div>
                        </div>

                        <input type="text" class="form-control" :value="value" :placeholder="lang.search_for"
                               @keyup="$emit('input', $event.target.value)">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "VueTableSearchBar",
        data() {
            return {
                lang: this.$parent.lang
            };
        },
        props: {
            value: {
                type: String,
                default: ''
            },
            filters: {
                type: Array,
                default: function () {
                    return [];
                },
            }
        }
    };
</script>

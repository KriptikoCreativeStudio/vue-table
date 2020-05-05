<template>
    <nav v-if="totalPages > 1">
        <ul class="pagination">
            <template v-if="page != 1">
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="First" @click.prevent="setPage(1)">
                        <i class="fas fa-backward"></i>
                        <span class="sr-only">First</span>
                    </a>
                </li>
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous" @click.prevent="setPage(page - 1)">
                        <i class="fas fa-caret-left"></i>
                        <span class="sr-only">Previous</span>
                    </a>
                </li>
            </template>

            <li v-for="(linkButton, index) in linkButtons"
                :key="index"
                class="page-item"
                :class="{'active': linkButton == page}"
            >
                <a class="page-link" href="#" @click.prevent="setPage(linkButton)">{{ linkButton }}</a>
            </li>

            <template v-if="page != totalPages">
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next" @click.prevent="setPage(page + 1)">
                        <i class="fas fa-caret-right"></i>
                        <span class="sr-only">Next</span>
                    </a>
                </li>
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Last" @click.prevent="setPage(totalPages)">
                        <i class="fas fa-forward"></i>
                        <span class="sr-only">Last</span>
                    </a>
                </li>
            </template>
        </ul>

        Showing {{ start }} - {{ end }} of {{ items }}
    </nav>
</template>

<script>
    export default {
        name: "VueTablePagination",
        props: {
            page: {
                type: Number,
                default: 1,
                validator: (value) => {
                    return value >= 1;
                },
            },
            items: {
                type: Number,
                default: 400,
                validator: (value) => {
                    return value >= 0;
                }
            },
            perPage: {
                type: Number,
                default: 20,
                validator: (value) => {
                    return value > 0;
                }
            },
            maxLinks: {
                type: Number,
                default: 5,
                validator: (value) => {
                    return value > 0;
                }
            }
        },
        methods: {
            setPage(page) {
                this.$emit('update:page', page);
            }
        },
        computed: {
            start: function () {
                return (this.page - 1) * this.perPage;
            },
            end: function () {
                let end = this.start + this.perPage;

                return this.items < end ? this.items : end;
            },
            totalPages: function () {
                return Math.ceil(this.items / this.perPage);
            },

            linkButtons: function () {
                let linksSpan = this.linksSpan;

                let pages = [];

                for (let p = linksSpan.lower; p <= linksSpan.higher; p++) {
                    pages.push(p);
                }

                return pages;
            },

            linksSpan: function () {
                const span = Math.floor(this.maxLinks / 2);

                let lowerBound = this.page - span;
                console.log('lower bound:', lowerBound);

                let lowerOverflow = lowerBound < 0 ? Math.abs(lowerBound) + 1 : 0;
                console.log('lower overflow:', lowerOverflow);

                let higherBound = this.page + span;
                console.log('higher bound:', higherBound);

                let higherOverflow = higherBound > this.totalPages ? higherBound - this.totalPages : 0;
                console.log('higher overflow:', higherOverflow);

                // Correct overflows
                lowerBound += lowerOverflow;
                higherBound -= higherOverflow;

                // Correct bounds
                lowerBound -= higherOverflow;
                lowerBound += lowerBound < 1 ? 1 + Math.abs(lowerBound) : 0;

                higherBound += lowerOverflow;
                higherBound -= higherBound > this.totalPages ? higherBound - this.totalPages : 0;

                return {
                    lower: lowerBound,
                    higher: higherBound
                };
            }
        }
    };
</script>

<style scoped>

</style>

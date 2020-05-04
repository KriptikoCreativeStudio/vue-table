<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item" v-if="page != 1">
                <a class="page-link" href="#" aria-label="First" @click.prevent="setPage(1)">
                    <i class="fas fa-backward"></i>
                    <span class="sr-only">First</span>
                </a>
            </li>
            <li class="page-item" v-if="page != 1">
                <a class="page-link" href="#" aria-label="Previous" @click.prevent="setPage(page - 1)">
                    <i class="fas fa-caret-left"></i>
                    <span class="sr-only">Previous</span>
                </a>
            </li>
            <li v-for="(link, index) in pages"
                :key="index"
                class="page-item"
                :class="{'active': link == page}"
            >
                <a class="page-link" href="#" @click.prevent="setPage(link)">{{ link }}</a>
            </li>
            <li class="page-item" v-if="page != pages.length">
                <a class="page-link" href="#" aria-label="Next" @click.prevent="setPage(page + 1)">
                    <i class="fas fa-caret-right"></i>
                    <span class="sr-only">Next</span>
                </a>
            </li>
            <li class="page-item" v-if="page != pages.length">
                <a class="page-link" href="#" aria-label="Last" @click.prevent="setPage(pages.length)">
                    <i class="fas fa-forward"></i>
                    <span class="sr-only">Last</span>
                </a>
            </li>
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
                default: 6,
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
            pages() {
                let filteredPages = this.filteredPages;

                let pages = filteredPages ?
                    [
                        filteredPages[0] - 1 === 1 ? 1 : '...',
                        ...filteredPages,
                        filteredPages[filteredPages.length - 1] + 1 === this.totalPages - 2 ? this.totalPages - 2 : '...',
                    ] :
                    [
                        ...Array(this.totalPages - 2).keys(),
                    ].map(page => page + 1);

                return [
                    this.page - 1,
                    0,
                    ...pages,
                    this.totalPages - 1,
                    this.page + 1,
                ];
            },
            filteredPages() {
                let diff = this.maxLinks / 2;

                let toFilterPages = [
                    ...Array(this.totalPages).keys(),
                ].slice(2, -2);

                if (toFilterPages.length > this.maxLinks) {
                    let diffFirst = this.page - toFilterPages[0];
                    let diffLast = this.page - toFilterPages[toFilterPages.length - 1];

                    if (diffFirst < diff) {
                        return toFilterPages.slice(0, this.maxLinks);
                    } else if (diffLast >= -diff) {
                        return toFilterPages.slice(-this.maxLinks);
                    } else {
                        return toFilterPages.filter(page => {
                            let diffPage = this.page - page;
                            return diffPage < 0 ? Math.abs(diffPage) <= diff : diffPage < diff;
                        });
                    }
                }
                return null;
            }
        }
    };
</script>

<style scoped>

</style>

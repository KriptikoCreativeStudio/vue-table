<template>
    <nav class="row align-items-center mt-5">
        <div class="col-auto">
            <select class="custom-select" @change="setItemsPerPage($event.target.value)" v-model="selectedItemsPerPage">
                <option :value="perPageOption" v-for="perPageOption in perPageOptions"
                        :key="`perPageOptions${perPageOption}`">{{ perPageOption }}
                </option>
            </select>
        </div>

        <div class="col">
            Showing {{ start }} - {{ end }} of {{ items }}
        </div>

        <div class="col-sm-auto mt-4 mt-sm-0">
            <ul class="pagination mb-0" v-if="totalPages > 1">
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
        </div>
    </nav>
</template>

<script>
    import { mapActions, mapState } from 'vuex';

    export default {
        name: "VueTablePagination",
        data() {
            return {
                selectedItemsPerPage: null
            };
        },
        props: {
            perPageOptions: {
                type: Array,
                default() {
                    return [20, 50, 100];
                }
            },
            items: {
                type: Number,
                default: 0,
                validator: (value) => {
                    return value >= 0;
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
            ...mapActions('paginationModule', { setPage: 'setPageAction' }),
            ...mapActions('itemsPerPageModule', { setItemsPerPage: 'setItemsPerPageAction' })
        },
        computed: {
            start: function () {
                return (this.page - 1) * this.itemsPerPage + 1;
            },
            end: function () {
                let end = this.start + this.itemsPerPage - 1;

                return this.items < end ? this.items : end;
            },
            totalPages: function () {
                return Math.ceil(this.items / this.itemsPerPage);
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

                let lowerOverflow = lowerBound < 0 ? Math.abs(lowerBound) + 1 : 0;

                let higherBound = this.page + span;

                let higherOverflow = higherBound > this.totalPages ? higherBound - this.totalPages : 0;

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
            },
            ...mapState('paginationModule', ['page']),
            ...mapState('itemsPerPageModule', ['itemsPerPage'])
        },
        mounted() {
            this.selectedItemsPerPage = this.itemsPerPage;
        }
    };
</script>

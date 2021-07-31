import { mapActions, mapState } from 'vuex';

export const filtersManager = {
    data() {
        return {
            filters: {}
        };
    },
    props: {
        perPage: {
            type: Number,
            default: 20,
            validator: function (value) {
                return value > 0;
            }
        }
    },
    methods: {
        /**
         * Store the filters in the local storage.
         */
        storeFilters() {
            let filters = {};

            for (let columnName in this.columnsPayload) {
                if (this.columnsPayload[columnName].value) {
                    filters[columnName] = this.columnsPayload[columnName].value;
                }
            }

            this.storeState({
                filters: filters,
                page: this.page,
                perPage: this.itemsPerPage,
                search: this.search,
                sorting: this.currentSorting,
            });
        },

        /**
         * Load the filters from local storage.
         */
        async loadStoredFilters() {
            const storedSettings = this.getStoredValues() || {};

            this.setColumnsPayload(storedSettings.filters, storedSettings.sorting);

            this.setPage(storedSettings.page || 1);
            this.setItemsPerPage(storedSettings.perPage || this.perPage);
            this.setSearchValue(storedSettings.search || null);

            if (storedSettings.sorting) {
                this.setSorting(storedSettings.sorting);
            }
        },

        /**
         * Resets all the filters.
         */
        resetFilters() {
            this.setColumnsPayload();

            this.setSorting(this.currentSorting);
            this.setPage(1);
            this.setItemsPerPage(this.itemsPerPage);
            this.setSearchValue(null);

            this.getItems();
        },

        /**
         * Set the columns payload to be sent with requests
         */
        setColumnsPayload(storedFilters = {}, storedSorting = {}) {
            this.columns.forEach(column => {
                if (column.name) {
                    const columnPayload = {
                        modifiers: column.modifiers || [],
                        searchable: column.searchable || false,
                        sort: storedSorting[column.name] || column.sort || null,
                        value: storedFilters[column.name] || column.value || ''
                    };

                    this.$set(this.columnsPayload, column.name, columnPayload);
                }
            });
        },

        ...mapActions('sortingModule', { setSorting: 'setSortingAction' }),
    },
    computed: {
        currentSorting: function () {
            let sorting = {};

            for (let columnName in this.columnsPayload) {
                if (this.columnsPayload[columnName].sort) {
                    sorting[columnName] = this.columnsPayload[columnName].sort;
                }
            }

            return sorting;
        },

        ...mapState('sortingModule', ['sorting']),
    },
    beforeMount() {
        this.loadStoredFilters()
            .then(() => {
                if (this.uri !== null) {
                    this.getItems();
                }
            });
    }
};

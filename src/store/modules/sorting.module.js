export const sortingModule = {
    namespaced: true,
    state: {
        sorting: {}
    },
    mutations: {
        /**
         * Sets the sorting.
         *
         * @param state
         * @param sorting
         */
        setSorting(state, sorting) {
            state.sorting = sorting;
        },

        /**
         * Adds a sorting to the store.
         *
         * @param state
         * @param columnName
         * @param columnSort
         */
        setColumnSort(state, { columnName, columnSort }) {
            state.sorting = { ...state.sorting, [columnName]: columnSort };
        }
    },
    actions: {
        /**
         * The action of setting the sorting.
         *
         * @param commit
         * @param sorting
         */
        setSortingAction({ commit }, sorting) {
            commit('setSorting', sorting);
        },

        /**
         * The action of setting a column sort.
         *
         * @param commit
         * @param columnName
         * @param columnSort
         */
        setColumnSortAction({ commit }, { columnName, columnSort }) {
            commit('setColumnSort', { columnName, columnSort });
        }
    }
};

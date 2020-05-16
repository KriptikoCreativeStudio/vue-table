export const sortingStorageName = `vue_table_${ window.location.pathname }_sorting`;

let sorting = window.localStorage.getItem(sortingStorageName);

export const sortingModule = {
    namespaced: true,
    state: {
        sorting: sorting ? JSON.parse(sorting) : []
    },
    mutations: {
        /**
         * Adds a sort to the store.
         *
         * @param state
         * @param newSorting
         */
        addSort(state, newSort) {
            // If a sorting with this key already exists, it must be removed from the array.
            state.sorting = state.sorting.filter(sort => sort.column != newSort.column);

            state.sorting.push(newSort);
        },

        /**
         * Saves the data into local storage.
         *
         * @param state
         */
        saveData(state) {
            window.localStorage.setItem(sortingStorageName, JSON.stringify(state.sorting));
        }
    },
    actions: {
        /**
         * The action of adding a sorting.
         *
         * @param commit
         * @param sorting
         */
        addSortAction({ commit }, sort) {
            commit('addSort', sort);
            commit('saveData');
        }
    }
};

let filters = window.localStorage.getItem('filters');

export const filtersModule = {
    namespaced: true,
    state: {
        filters: filters ? JSON.parse(filters) : []
    },
    mutations: {
        /**
         * Adds a filter to the store.
         *
         * @param state
         * @param newFilter
         */
        addFilter(state, newFilter) {
            // If a filter with this key already exists, it must be removed from the array.
            state.filters = state.filters.filter(filter => filter.column != newFilter.column);

            if (newFilter.values.length) {
                state.filters.push(newFilter);
            }
        },

        /**
         * Saves the data into local storage.
         *
         * @param state
         */
        saveData(state) {
            window.localStorage.setItem('filters', JSON.stringify(state.filters));
        }
    },
    actions: {
        /**
         * The action of adding a filter.
         *
         * @param commit
         * @param filter
         */
        addFilterAction({ commit }, filter) {
            commit('addFilter', filter);
            commit('saveData');
        }
    }
};

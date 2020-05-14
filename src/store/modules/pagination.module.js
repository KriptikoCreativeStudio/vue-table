export const paginationStorageName = `vue_table_${ window.location.pathname }_page`;

let page = window.localStorage.getItem(paginationStorageName);

export const paginationModule = {
    namespaced: true,
    state: {
        page: page ? parseInt(page) : 1
    },
    mutations: {
        /**
         * Adds a filter to the store.
         *
         * @param state
         * @param newFilter
         */
        setPage(state, page) {
            state.page = page;
        },

        /**
         * Saves the data into local storage.
         *
         * @param state
         */
        saveData(state) {
            window.localStorage.setItem(paginationStorageName, state.page);
        }
    },
    actions: {
        /**
         * The action of adding a filter.
         *
         * @param commit
         * @param filter
         */
        setPageAction({ commit }, filter) {
            commit('setPage', filter);
            commit('saveData');
        }
    }
};

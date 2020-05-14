export const paginationStorageName = `vue_table_${ window.location.pathname }_page`;

let page = window.localStorage.getItem(paginationStorageName);

export const paginationModule = {
    namespaced: true,
    state: {
        page: page ? parseInt(page) : 1
    },
    mutations: {
        /**
         * Sets the page number.
         *
         * @param state
         * @param page
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
         * The action of setting a page.
         *
         * @param commit
         * @param page
         */
        setPageAction({ commit }, page) {
            commit('setPage', page);
            commit('saveData');
        }
    }
};

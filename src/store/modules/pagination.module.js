export const paginationModule = {
    namespaced: true,
    state: {
        page: 1
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
        }
    }
};

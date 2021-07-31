export const itemsPerPageModule = {
    namespaced: true,
    state: {
        itemsPerPage: 20
    },
    mutations: {
        /**
         * Sets the amount of items displayed per page.
         *
         * @param state
         * @param itemsPerPage
         */
        setItemsPerPage(state, itemsPerPage) {
            state.itemsPerPage = parseInt(itemsPerPage);
        }
    },
    actions: {
        /**
         * The action of setting the amount of items displayed per page.
         *
         * @param commit
         * @param itemsPerPage
         */
        setItemsPerPageAction({ commit }, itemsPerPage) {
            commit('setItemsPerPage', itemsPerPage);
        }
    }
};

export const paginationStorageName = `vue_table_${ window.location.pathname }_items_per_page`;

let itemsPerPage = window.localStorage.getItem(paginationStorageName);

export const itemsPerPageModule = {
    namespaced: true,
    state: {
        itemsPerPage: itemsPerPage ? parseInt(itemsPerPage) : 20
    },
    mutations: {
        /**
         * Sets the amount of items displayed per page.
         *
         * @param state
         * @param itemsPerPage
         */
        setItemsPerPage(state, itemsPerPage) {
            state.itemsPerPage = itemsPerPage;
        },

        /**
         * Saves the data into local storage.
         *
         * @param state
         */
        saveData(state) {
            window.localStorage.setItem(paginationStorageName, state.itemsPerPage);
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
            commit('saveData');
        }
    }
};

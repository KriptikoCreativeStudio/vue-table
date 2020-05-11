export const filtersModule = {
    namespaced: true,
    state: {
        filters: null
    },
    getters: {},
    mutations: {
        addFilter(state, filter) {
            let newFilter = {};
            newFilter[filter.key] = filter.value;

            state.filters = Object.assign([], state.filters, newFilter);
        }
    },
    actions: {
        addFilterAction({ commit }, filter) {
            commit('addFilter', filter);
        }
    }
};

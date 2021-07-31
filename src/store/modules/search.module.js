export const searchModule = {
    namespaced: true,
    state: {
        value: ''
    },
    mutations: {
        /**
         * Sets the value.
         *
         * @param state
         * @param value
         */
        setValue(state, value) {
            state.value = value;
        }
    },
    actions: {
        /**
         * The action of setting the value tha will be searched.
         *
         * @param commit
         * @param value
         */
        setValueAction({ commit }, value) {
            commit('setValue', value);
        }
    }
};

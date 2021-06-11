export const searchStorageName = `vue_table_${ window.location.pathname }_search`;

let value = window.localStorage.getItem(searchStorageName);

export const searchModule = {
    namespaced: true,
    state: {
        value: value || ''
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
        },

        /**
         * Saves the data into local storage.
         *
         * @param state
         */
        saveData(state) {
            window.localStorage.setItem(searchStorageName, state.value);
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
            commit('saveData');
        }
    }
};

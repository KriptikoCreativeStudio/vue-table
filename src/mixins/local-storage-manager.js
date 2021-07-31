export const localStorageManager = {
    data() {
        return {
            selection: null
        };
    },
    props: {
        saveState: {
            type: Boolean,
            default: false
        },
        localStorageName: {
            type: String,
            default: function () {
                return `${ this.$options.name }_${ this._uid }_${ window.location.pathname }`;
            }
        }
    },
    methods: {
        /**
         * Get the state of the local storage.
         */
        getStoredValues() {
            return JSON.parse(localStorage.getItem(this.localStorageName));
        },

        /**
         * Stores the state in local storage.
         */
        storeState(data) {
            if (this.saveState) {
                localStorage.setItem(this.localStorageName, JSON.stringify(data));
            }
        }
    }
};

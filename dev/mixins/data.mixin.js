export const dataMixin = {
    methods: {
        importItems() {
            alert('Importing items...');
        },

        exportItems(items) {
            alert(`Exporting items ${ items.join(', ') }`);
        }
    }
};

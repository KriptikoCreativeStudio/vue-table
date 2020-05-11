export const columnFilter = {
    bind: function (el, binding, vnode) {
        el.addEventListener('change', (event) => {
            const selectedValues = [...event.target.options].filter(option => option.selected).map(option => option.value);

            vnode.context.$store.dispatch('filtersModule/addFilterAction', {
                key: binding.arg,
                value: selectedValues
            });
        });
    },
};



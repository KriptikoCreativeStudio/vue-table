import { filtersStorageName } from "../../store/modules/filters.module";

export const columnFilter = {
    bind: function (el, binding, vnode) {
        let storedFilters = window.localStorage.getItem(filtersStorageName);

        storedFilters = storedFilters ? JSON.parse(storedFilters) : [];

        let storedFilter = storedFilters.find(filter => filter.column == binding.arg);

        if (typeof storedFilter !== 'undefined') {
            [...el.options]
                .filter(option => storedFilter.values.includes(option.value))
                .map(option => option.setAttribute('selected', true));
        }

        el.addEventListener('change', (event) => {
            const selectedValues = [...event.target.options].filter(option => option.selected).map(option => option.value);

            vnode.context.$store.dispatch('filtersModule/addFilterAction', {
                column: binding.arg,
                values: selectedValues
            });
        });
    },
};



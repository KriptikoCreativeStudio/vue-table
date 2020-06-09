import { filtersStorageName } from "../store/modules/filters.module";

export default {
    name: 'filter-column',
    bind: function (el, binding, vnode) {
        let columnName = binding.value;

        let storedFilters = window.localStorage.getItem(filtersStorageName);
        storedFilters = storedFilters ? JSON.parse(storedFilters) : [];

        let storedFilter = storedFilters.find(filter => filter.column == columnName);

        let setSelection = (el) => {
            if (typeof storedFilter !== 'undefined') {
                [...el.options]
                    .filter(option => storedFilter.values.includes(option.value))
                    .map(option => option.setAttribute('selected', true));
            }
        };

        setSelection(el);

        el.addEventListener('vueTable.optionsLoaded', (event) => {
            setSelection(event.target);
        });

        el.addEventListener('change', (event) => {
            let selectedValues = [...event.target.options]
                .filter(option => option.selected && option.value)
                .map(option => option.value);

            const payload = {
                column: columnName,
                values: selectedValues
            };

            vnode.context.$root.$emit('filterOptionSelected', payload);
        });
    },
};

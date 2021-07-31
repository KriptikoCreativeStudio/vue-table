import VueTable from '@/components/VueTable';

// install function executed by Vue.use()
const install = function installVueTable(Vue) {
    if (install.installed) {
        return;
    }

    install.installed = true;

    Vue.component('VueTable', VueTable);
};

// Create module definition for Vue.use()
const plugin = {
    install,
};

// To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare
/* global window, global */
if ('false' === process.env.ES_BUILD) {
    let GlobalVue = null;

    if (typeof window !== 'undefined') {
        GlobalVue = window.Vue;
    } else if (typeof global !== 'undefined') {
        GlobalVue = global.Vue;
    }

    if (GlobalVue) {
        GlobalVue.use(plugin);
    }
}

// Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()
VueTable.install = install;

// Export component by default
export {
    VueTable
};

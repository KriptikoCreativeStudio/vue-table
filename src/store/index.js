import Vue from 'vue';
import Vuex from 'vuex';
import { filtersModule } from "./modules/filters.module";
import { paginationModule } from "./modules/pagination.module";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        filtersModule,
        paginationModule
    }
});

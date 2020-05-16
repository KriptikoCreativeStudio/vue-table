import Vue from 'vue';
import Vuex from 'vuex';
import { filtersModule } from "./modules/filters.module";
import { paginationModule } from "./modules/pagination.module";
import { searchModule } from "./modules/search.module";
import { sortingModule } from "./modules/sorting.module";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        filtersModule,
        paginationModule,
        searchModule,
        sortingModule
    }
});

import Vue from 'vue';
import Vuex from 'vuex';
import { paginationModule } from "./modules/pagination.module";
import { itemsPerPageModule } from "./modules/itemsPerPage.module";
import { searchModule } from "./modules/search.module";
import { sortingModule } from "./modules/sorting.module";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        paginationModule,
        itemsPerPageModule,
        searchModule,
        sortingModule
    }
});

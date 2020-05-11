import Vue from 'vue';
import { columnFilter } from "./custom/filter-column.directive";

Vue.directive('filter-column', columnFilter);

import Vue from 'vue';
import App from './App.vue';
import 'bootstrap/scss/bootstrap.scss';

Vue.config.productionTip = false;

window.Popper = require('popper.js').default;
window.$ = window.jQuery = require('jquery');
require('bootstrap');

new Vue({
    render: h => h(App),
}).$mount('#app');

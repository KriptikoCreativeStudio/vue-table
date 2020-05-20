<script>
import Vue from 'vue';
import VueTable from '@/vue-table.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VueTable
  }
});
</script>

<template>
  <div id="app">
    <vue-table />
  </div>
</template>

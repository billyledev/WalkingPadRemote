<template>
  <div id="app">
    <app-splitter></app-splitter>
    <v-ons-toast :visible.sync="visible">
      {{ visible ? active.message : '' }}
    </v-ons-toast>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapGetters } from 'vuex';

import AppSplitter from '@/AppSplitter.vue';

@Component({
  components: {
    AppSplitter,
  },
  computed: {
    ...mapGetters('alert', ['visible']),
    ...mapState('alert', ['active']),
  },
})
export default class App extends Vue {}
</script>

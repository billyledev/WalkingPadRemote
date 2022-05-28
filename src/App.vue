<template>
  <div id="app">
    <app-navigator></app-navigator>
    <v-ons-toast :visible.sync="visible">
      {{ visible ? active.message : '' }}
    </v-ons-toast>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import AppNavigator from './components/AppNavigator.vue';

export default {
  components: { AppNavigator },
  name: 'App',
  computed: {
    ...mapGetters('alert', ['visible']),
    ...mapState('alert', ['active']),
  },
};
</script>

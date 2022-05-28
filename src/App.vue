<template>
  <div id="app">
    <router-view></router-view>
    <v-ons-toast :visible.sync="visible">
      {{ visible ? active.message : '' }}
    </v-ons-toast>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters('alert', ['visible']),
    ...mapState('alert', ['active']),
  },
};
</script>

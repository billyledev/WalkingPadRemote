<template>
  <v-ons-splitter>
    <v-ons-splitter-side
      swipeable side="left" collapse="" width="80%"
      :animation="md ? 'overlay' : 'reveal'"
      :swipe-target-width="md && 25" :open.sync="isOpen"
    >
      <Menu/>
    </v-ons-splitter-side>
    <v-ons-spliter-content>
      <Home/>
    </v-ons-spliter-content>
  </v-ons-splitter>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

import Menu from '@/views/MenuView.vue';
import Home from '@/views/HomeView.vue';

@Component({
  components: {
    Menu,
    Home,
  },
})
export default class AppSplitter extends Vue {
  get isOpen() {
    return this.$store.state.splitter.open;
  }

  set isOpen(newValue) {
    this.$store.commit('splitter/toggle', newValue);
  }
}
</script>

<template>
  <v-ons-page>
    <toolbar v-bind="toolbarInfo"></toolbar>
  </v-ons-page>
</template>

<script>
import Toolbar from '@/components/Toolbar.vue';

export default {
  name: 'HomeView',
  components: {
    Toolbar,
  },
  data() {
    return {
      toolbarInfo: {
        title: 'WalkingPad Remote',
      },
    };
  },
};
</script>

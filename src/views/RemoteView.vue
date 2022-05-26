<template>
  <v-ons-page>
    <toolbar v-bind="toolbarInfo"></toolbar>
  </v-ons-page>
</template>

<script>
import Toolbar from '@/components/Toolbar.vue';

export default {
  name: 'RemoteView',
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

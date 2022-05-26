<template>
  <v-ons-page>
    <v-ons-list>
      <v-ons-list-item modifier="chevron" @click="select()" tappable>
        Remote
      </v-ons-list-item>
      <v-ons-list-item modifier="chevron">
        Stats (coming soon)
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
export default {
  name: 'MenuView',
  methods: {
    select() {
      this.$store.commit('splitter/toggle');
    },
  },
};
</script>

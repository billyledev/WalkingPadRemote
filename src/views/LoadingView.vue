<template>
  <v-ons-page>
    <div class="content">
      <div>
        <ons-row v-if="loading">
          <ons-progress-circular indeterminate></ons-progress-circular>
        </ons-row>
        <ons-row v-if="!bluetoothSupport">
          <p>This browser does not support Web Bluetooth!</p>
        </ons-row>
        <v-ons-row v-else>
          <v-ons-button modifier="outline" @click="connect">
            Connect
          </v-ons-button>
        </v-ons-row>
      </div>
    </div>
  </v-ons-page>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'LoadingView',
  data() {
    return {
      loading: false,
      bluetoothSupport: false,
    };
  },
  methods: {
    ...mapActions('treadmill', ['setup']),
    ...mapActions('alert', ['pushToast']),
    connect() {
      if (this.loading) return;
      this.loading = true;
      setTimeout(() => {
        this.setup().then((result) => {
          console.log(result);
        }, (error) => {
          this.error = true;
          this.loading = false;
          this.pushToast(error);
        });
      }, 1000);
    },
  },
  mounted() {
    this.bluetoothSupport = !!navigator.bluetooth;
  },
};
</script>

<style scoped>
div.content.page__content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

ons-row {
  margin-bottom: 10%;
  text-align: center;
  justify-content: center;
}
</style>

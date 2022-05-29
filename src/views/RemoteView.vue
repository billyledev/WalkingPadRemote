<template>
  <v-ons-page>
    <toolbar v-bind="toolbarInfo"></toolbar>

    <div class="content">
      <v-ons-segment :index.sync="mode">
        <button>Automatic</button>
        <button>Manual</button>
      </v-ons-segment>

      <div id="speedControl">
        <div>
          <v-ons-button modifier="quiet" @click="speedDown()">-</v-ons-button>
          {{ currentSpeed }}
          <v-ons-button modifier="quiet" @click="speedUp()">+</v-ons-button>
        </div>
        <div>
          <v-ons-button modifier="outline" @click="stop()">{{ speed === 0 ? 'Start' : 'Stop' }}</v-ons-button>
        </div>
      </div>
    </div>
    <div id="infos">
      <p>Distance: {{ distance }}</p>
      <p>Time: {{ time }}</p>
      <p>Steps: {{ steps }}</p>
    </div>
  </v-ons-page>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
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
  computed: {
    ...mapState('treadmill', ['steps']),
    ...mapGetters('treadmill', { currentSpeed: 'speed', distance: 'distance', time: 'time' }),
    mode: {
      get() {
        return this.$store.state.treadmill.mode;
      },
      set(newMode) {
        this.$store.dispatch('treadmill/updateMode', newMode);
      },
    },
    speed: {
      get() {
        return this.$store.state.treadmill.speed;
      },
      set(newSpeed) {
        this.$store.dispatch('treadmill/updateSpeed', newSpeed);
      },
    },
  },
  methods: {
    ...mapActions('treadmill', ['startBelt']),
    speedDown() {
      if (this.speed === 0) return;
      this.speed -= 5;
    },
    speedUp() {
      if (this.speed === 60) return;
      this.speed += 5;
    },
    stop() {
      if (this.speed !== 0) {
        this.speed = 0;
      } else {
        this.startBelt();
      }
    },
  },
};
</script>

<style scoped>
  ons-page, ons-segment, #speedControl, #infos {
    width: 100%;
  }

  div.content.page__content {
    text-align: center;
    padding: 2em;
  }

  #speedControl {
    margin-top: 3em;
  }

  #infos {
    text-align: center;
    position: fixed;
    bottom: 2em;
  }
</style>

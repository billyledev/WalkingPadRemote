import VueOnsen from 'vue-onsenui';

declare module 'vue/types/vue' {
    interface Vue {
      $ons: VueOnsen;
    }
}

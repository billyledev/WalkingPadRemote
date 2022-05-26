// https://www.reddit.com/r/vuejs/comments/dfbv35/vuex_toast_notification_queue/f32bwfc/
/*
Use with :
this.$store.dispatch('pushToast', {
  message: 'The message',
})
*/

const TOAST_DURATION = 3000;
const toastTimeout = (callback) => setTimeout(callback, TOAST_DURATION);

const alertModule = {
  namespaced: true,
  state: {
    queue: [],
  },
  getters: {
    visible: (state) => state.active,
  },
  mutations: {
    enqueue(state, { toast }) {
      state.queue.push(toast);
    },
    dequeue(state, { timeoutId }) {
      const active = state.queue.shift();

      state.active = active;
      state.timeoutId = timeoutId;
    },
    reset(state) {
      const { timeoutId } = state;
      if (timeoutId) clearTimeout(timeoutId);

      delete state.active;
      delete state.timeoutId;
    },
  },
  actions: {
    pushToast(context, toast) {
      context.commit('enqueue', toast);
      if (!context.state.active) context.dispatch('processQueue');
    },
    processQueue(context) {
      if (!context.state.queue.length && !context.state.active) return;
      if (!context.state.queue.length && context.state.active) {
        // eslint-disable-next-line consistent-return
        return toastTimeout(() => context.commit('reset'));
      }

      const timeoutId = toastTimeout(() => context.dispatch('processQueue'));

      context.commit('dequeue', { timeoutId });
    },
  },
  modules: {},
};

export default alertModule;

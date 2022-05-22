// https://www.reddit.com/r/vuejs/comments/dfbv35/vuex_toast_notification_queue/f32bwfc/
/*
Use with :
this.$store.dispatch('pushToast', {
  message: 'The message',
})
*/

import { ActionContext, Module } from 'vuex';

interface Toast {
  message: string;
}

interface AlertState {
  queue: Array<Toast>;
  active?: Toast;
  timeoutId?: number;
}

const TOAST_DURATION = 3000;
const toastTimeout = (callback: TimerHandler) => setTimeout(callback, TOAST_DURATION);

const alertModule: Module<AlertState, any> = {
  namespaced: true,
  state: {
    queue: [],
  },
  getters: {
    visible: (state: AlertState) => state.active,
  },
  mutations: {
    enqueue(state: AlertState, { toast }: { toast: Toast }) {
      state.queue.push(toast);
    },
    dequeue(state: AlertState, { timeoutId }: { timeoutId: number }) {
      const active = state.queue.shift();

      state.active = active;
      state.timeoutId = timeoutId;
    },
    reset(state: AlertState) {
      const { timeoutId } = state;
      if (timeoutId) clearTimeout(timeoutId);

      delete state.active;
      delete state.timeoutId;
    },
  },
  actions: {
    pushToast(context: ActionContext<AlertState, any>, toast: Toast) {
      context.commit('enqueue', toast);
      if (!context.state.active) context.dispatch('processQueue');
    },
    processQueue(context: ActionContext<AlertState, any>) {
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

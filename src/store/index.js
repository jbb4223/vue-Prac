import { createStore } from 'vuex';

export default createStore({
   state: {
      toastMsessage : 'hi',
      toastAlertType : 'success',
      showToast : false,
   },
   mutations: {
      UPDATE_TOAST_MESSAGE (state, payload) {
         state.toastMsessage = payload;
      },
      UPDATE_TOAST_ALERT_TYPE (state, payload) {
         state.toastAlertType = payload;
      },
      UPDATE_TOAST_SATUS (state, payload) {
         state.showToast = payload;
      },
   },
   actions: {
      triggerToast ( {commit}, message, type = 'success')  {
         // toastMsessage.value = message;
         commit('UPDATE_TOAST_MESSAGE', message);
         commit('UPDATE_TOAST_ALERT_TYPE', type);
         commit('UPDATE_TOAST_SATUS', true);

         setTimeout( () => {
            commit('UPDATE_TOAST_MESSAGE', '');
            commit('UPDATE_TOAST_ALERT_TYPE', '');
            commit('UPDATE_TOAST_SATUS', false);
         }, 5000);
      }
   },
   getters: {
      toastMessageWithSmile (state) {
         return state.toastMsessage + '^_^';
      }
   }
});
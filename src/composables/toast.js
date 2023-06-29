import { computed } from "vue";
import { useStore } from 'vuex';
export const useToast = () => {
    const store = useStore();

    const toastMsessage = computed(() => store.getters.toastMessageWithSmile);
    const toastAlertType = computed(() => store.state.toastAlertType);
    const showToast = computed(() => store.state.showToast);
    const triggerToast = (message, type = 'success') => {
        store.dispatch('triggerToast', message, type);
    };
    return {
        toastMsessage,
        toastAlertType,
        showToast,
        triggerToast,
    }
}
import {onUnmounted, ref} from "vue";
export const useToast = () => {
    const toastMsessage = ref('');
    const toastAlertType = ref('');
    const showToast = ref(false);
    const timeOut = ref(null);
    const triggerToast = (message, type = 'success') => {
        toastMsessage.value = message;
        toastAlertType.value = type;
        showToast.value = true;
        // 메모리 누수관리를 위해 필요
        timeOut.value = setTimeout( () => {
            toastMsessage.value = '';
            toastAlertType.value = '';
            showToast.value = false;
        }, 1000);

        // DOM에 Mount가 되었을 때 실행
        // timeout이 걸려있을때 시간을 기다리는도안 다른페이지로 이동하여 unMounted가 작동할때 clearTimeout처리를 해줌
        onUnmounted(() => {
            clearTimeout(timeOut.value);
        });
    };
    return {
        toastMsessage,
        toastAlertType,
        showToast,
        triggerToast,
    }
}
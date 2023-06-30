<template>
  <Navbar />
  <div class="container">
    <router-view />
  </div>

  <Toast
      v-if="showToast"
      :message="toastMsessage"
      :type="toastAlertType"
  />
</template>

<script>
import Toast from '@/components/Toast.vue';
import { useToast } from "@/composables/toast";
import Navbar from "@/components/Navbar.vue";
  export default {
    components: {
      Navbar,
      Toast
    },
    setup () {
      const {
        toastMsessage,
        toastAlertType,
        showToast,
        triggerToast,
      } = useToast();

      console.log(showToast.value);

      return {
        toastMsessage,
        toastAlertType,
        showToast,
        triggerToast,
        Navbar,
      }
    }
  }
</script>

<style>

</style>

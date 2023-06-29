<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand m-2" :to="{name: 'Home'}">
      JinBoung
    </router-link>

      <ul class="navbar-nav m-2">
        <li class="nav-item active">
          <router-link class="nav-link" :to="{ name: 'Todos' }">
            Todos
          </router-link>
        </li>
      </ul>
  </nav>
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
  export default {
    components: {
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
      }
    }
  }
</script>

<style>

</style>

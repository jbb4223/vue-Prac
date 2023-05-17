<template>
  <input
      type="text"
      v-model="Name"
  >
  <button
      class="btn btn-primary"
      @click="onSubmit"
  >
    Click
  </button>
</template>

<script>
  import { ref } from 'vue'; // eslint-disable-line no-unused-vars

  export default {
    setup() {
      const Name= ref('Kossie');

      const onSubmit = () => { // eslint-disable-line no-unused-vars
        console.log(Name.value);
      };

      return {
        Name,
        onSubmit,
      };
    }
  }
</script>

<style>
  .name {
    color : red;
  }
</style>

<template>
    <div :class="nameClass">
      {{ Name }}
    </div>
  <input :type="type" :value="Name">
  <button
      class="btn btn-primary" @click="updateName"
  >Click
  </button>
</template>

<script>
  import { ref } from 'vue'; // eslint-disable-line no-unused-vars

  export default {
    setup() {
      const Name= ref('Kossie');
      const type = ref('number'); // eslint-disable-line no-unused-vars
      const nameClass = ref(''); // eslint-disable-line no-unused-vars

      const updateName = () => { // eslint-disable-line no-unused-vars
        Name.value = 'Coder';
        type.value = 'text';
        nameClass.value = 'name';
      };

      return {
        Name,
        updateName,
        type,
        nameClass,
      };
    }
  }
</script>

<style>
  .name {
    color : red;
  }
</style>

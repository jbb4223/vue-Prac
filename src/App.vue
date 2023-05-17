<template>
    <div class="name">
      {{ greet }}
    </div>
</template>

<script>
  export default {
    setup() {
      const Name= 'Kossie Coder';

      const greeting = (Name) => { // eslint-disable-line no-unused-vars
        return 'Hello, ' + Name;
      };

      const greet = greeting(Name); // eslint-disable-line no-unused-vars

      return {
        greet,
      };
    }
  }
</script>

<style>
  .name {
    color : red;
  }
</style>

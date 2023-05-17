<template>
    <div class="name">
      {{ Name }}
    </div>
  <button
      class="btn btn-primary" v-on:click="updateName"
  >Click
  </button>
</template>

<script>
  export default {
    // eslint-disable-line no-unused-vars
    setup() {
      let Name= 'Kossie Coder123';

      // const greeting = (Name) => { // eslint-disable-line no-unused-vars
      //   return 'Hello, ' + Name;
      // };
      //
      // const greet = greeting(Name); // eslint-disable-line no-unused-vars

      const consoleLog = () => { // eslint-disable-line no-unused-vars
        console.log('hello world');
      };

      const updateName = () => { // eslint-disable-line no-unused-vars
        Name = 'Kossie Coder';
        console.log(Name);
      };

      return {
        Name,
        updateName,
      };
    }
  }
</script>

<style>
  .name {
    color : red;
  }
</style>

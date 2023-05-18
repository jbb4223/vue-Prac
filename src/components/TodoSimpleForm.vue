<template>
  <form @submit.prevent="onSubmit" >
    <div class="d-flex">
      <div class="flex-grow-1 m-1">
        <input
            class="form-control"
            type="text"
            v-model="todo"
            placeholder="Type new to-do"
        >
      </div>
      <div>
        <button
            class="btn btn-primary m-1"
            type="submit"
        >
          Add
        </button>
      </div>
    </div>
    <div v-show="hasError" style="color : red">
      This field cannot be empty
    </div>
  </form>
</template>

<script>
  export default {
    setup () {

      return {

      };
    }
  }
</script>

<style>

</style>
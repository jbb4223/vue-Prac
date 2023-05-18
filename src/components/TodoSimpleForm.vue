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
  import {ref} from "vue";

  export default {
    setup (props, context) {
      const todo = ref('');
      const hasError = ref(false);

      const onSubmit = (e) => { // eslint-disable-line no-unused-vars
        // submit후 페이지 리로딩 막기
        // e.preventDefault();

        if(todo.value === '') {
          hasError.value = true;
        } else {
          // 이벤트명, 오브젝트
          context.emit('add-todo', {
            id: Date.now(),
            subject: todo.value,
            completed: false,
          });
          hasError.value = false;
          todo.value = '';
        }
      };

      return {
        todo,
        hasError,
        onSubmit,
      };
    }
  }
</script>

<style>

</style>
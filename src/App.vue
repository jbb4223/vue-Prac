<template>
  <div class="container">
    <h2>To-Do List</h2>
    <form @submit.prevent="onSubmit" class="d-flex">
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
    </form>
    <div
        v-for="todo in todos"
        :key="todo.id"
        class="card mt-2">
      <div class="card-body p-2">
        {{ todo.subject }}
      </div>
    </div>
  </div>
</template>

<script>
  import { ref } from 'vue'; // eslint-disable-line no-unused-vars

  export default {
    setup() {
      const todo = ref('');
      const todos = ref([
        {id: 1, subject: '휴대폰 사기'},
        {id: 2, subject: '장보기'},
      ]);

      const onSubmit = (e) => { // eslint-disable-line no-unused-vars
        // submit후 페이지 리로딩 막기
        // e.preventDefault();

        todos.value.push({
          id: Date.now(),
          subject: todo.value,
        });
      };

      return {
        todo,
        todos,
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

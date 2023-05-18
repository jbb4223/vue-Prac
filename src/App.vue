<template>
  <div class="container">
    <h2>To-Do List</h2>
    <todo-simple-form />
    <div v-if="!todos.length">
      추가된 Todo가 없습니다
    </div>
    <div
        v-for="(todo, index) in todos"
        :key="todo.id"
        class="card mt-2">
      <div class="card-body p-2 d-flex align-items-center">
        <div class="form-check flex-grow-1">
          <input class="form-check-input" type="checkbox" v-model="todo.completed">
          <label class="form-check-label" :class="{ todo: todo.completed }"
          >
            {{ todo.subject }}
          </label>
        </div>
        <div>
          <button class="btn btn-danger btn-sm" @click="deleteTodo(index)">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref } from 'vue'; // eslint-disable-line no-unused-vars
  import TodoSimpleForm from "./components/TodoSimpleForm"; // eslint-disable-line no-unused-vars

  export default {
    components: {
      // eslint-disable-next-line vue/no-unused-components
      TodoSimpleForm
    },
    setup() {
      const toggle = ref(false);
      const todo = ref('');
      const todos = ref([]);
      const hasError = ref(false);
      const todoStyle = {
        textDecoration: 'line-through',
        color: 'grey'
      };

      const onSubmit = (e) => { // eslint-disable-line no-unused-vars
        // submit후 페이지 리로딩 막기
        // e.preventDefault();

        if(todo.value === '') {
          hasError.value = true;
        } else {
          todos.value.push({
            id: Date.now(),
            subject: todo.value,
            completed: false,
          });
          hasError.value = false;
          todo.value = '';
        }
      };

      const onToggle = () => {
        toggle.value = !toggle.value;
      };

      const deleteTodo = (index) => {
        todos.value.splice(index, 1);
      };

      return {
        toggle,
        todo,
        todos,
        hasError,
        todoStyle,
        onSubmit,
        onToggle,
        deleteTodo,
      };
    }
  }
</script>

<style>
  .todo {
    color: grey;
    text-decoration: line-through;
  }

</style>

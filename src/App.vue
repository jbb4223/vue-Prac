<template>
  <div class="container">
    <h2>To-Do List</h2>
    <todo-simple-form @add-todo="addTodo" />
    <div v-if="!todos.length">
      추가된 Todo가 없습니다.
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

      const todos = ref([]);

      const addTodo = (todo) => {
        todos.value.push(todo);
      };

      const todoStyle = {
        textDecoration: 'line-through',
        color: 'grey'
      };



      const onToggle = () => {
        toggle.value = !toggle.value;
      };

      const deleteTodo = (index) => {
        todos.value.splice(index, 1);
      };

      return {
        toggle,
        todos,
        todoStyle,
        addTodo,
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

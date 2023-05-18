<template>
  <div class="container">
    <h2>To-Do List</h2>

    <input
        class="form-control"
        type="text"
        v-model="searchText"
        placeholder="search"
    >
    <hr />
    <todo-simple-form @add-todo="addTodo" />

    <div v-if="!filteredTodos.length">
      There is nothing to display
    </div>

    <TodoList :todos="filteredTodos" @toggle-todo="toggleTodo" @delete-todo="deleteTodo"/>
  </div>
</template>

<script>
  import { ref, computed } from 'vue'; // eslint-disable-line no-unused-vars
  import TodoSimpleForm from "./components/TodoSimpleForm"; // eslint-disable-line no-unused-vars
  import TodoList from "./components/TodoList"; // eslint-disable-line no-unused-vars

  export default {
    components: {
      // eslint-disable-next-line vue/no-unused-components
      TodoSimpleForm,
      TodoList,
    },
    setup() {
      const toggle = ref(false);

      const todos = ref([]);

      const addTodo = (todo) => {
        todos.value.push(todo);
      };

      const toggleTodo = (index) => { // eslint-disable-line no-unused-vars
        todos.value[index].completed = !todos.value[index].completed;
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

      const searchText = ref('');

      const filteredTodos = computed(() => {
        if (searchText.value) {
          return todos.value.filter(todo => {
            return todo.subject.includes(searchText.value);
          });
        }

        return todos.value;
      });

      return {
        toggle,
        todos,
        toggleTodo,
        todoStyle,
        addTodo,
        onToggle,
        deleteTodo,
        searchText,
        filteredTodos,
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

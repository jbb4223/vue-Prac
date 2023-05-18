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
    <div style="color: red">{{ error }}</div>

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
  import axios from 'axios'; // eslint-disable-line no-unused-vars

  export default {
    components: {
      // eslint-disable-next-line vue/no-unused-components
      TodoSimpleForm,
      TodoList,
    },
    setup() {
      const toggle = ref(false);

      const todos = ref([]);

      const error = ref('');

      const getTodos = async () => {
        try {
          const res = await axios.get('http://localhost:3000/todos');
          todos.value = res.data;
        } catch (err) {
          console.log(err);
        }
      };

      getTodos();

      const addTodo =  async (todo) => {
        // 데이터베이스 todo를 저장
        error.value = '';
        console.log('start');
        try {
          const res = await axios.post('http://localhost:3000/todos', {
            subject: todo.subject,
            completed: todo.completed,
            // eslint-disable-next-line no-unused-vars
          });
          todos.value.push(res.data);
        } catch (error) {
          error.value = 'Something went wrong.'
        }
        console.log('hello');
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
        error,
        getTodos,
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

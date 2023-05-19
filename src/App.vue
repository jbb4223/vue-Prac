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

    <hr/>

    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#">Previous</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">1</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">2</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">3</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav>
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

      const totalPage = ref(0);
      const limit = 5;
      const page = ref(1);

      const getTodos = async () => {
        try {
          const res = await axios.get(`http://localhost:3000/todos?_page=${page.value}&_limit=${limit}`);
          totalPage.value = res.headers['x-total-count'];
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

      const toggleTodo = async (index) => { // eslint-disable-line no-unused-vars
        error.value = '';
        const id = todos.value[index].id;
        try {
          await axios.patch('http://localhost:3000/todos/' + id, {
            completed: !todos.value[index].completed
          });

          todos.value[index].completed = !todos.value[index].completed;
        } catch (err) {
          console.log(err);
          error.value = 'Something went wrong';
        }
      };

      const onToggle = () => {
        toggle.value = !toggle.value;
      };

      const deleteTodo = async (index) => {
        error.value = '';
        const id = todos.value[index].id;
        try {
          await axios.delete('http://localhost:3000/todos/'+ id);

          todos.value.splice(index, 1);
        } catch (err) {
          console.log(err);
          error.value = 'Something went wrong';
        }
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

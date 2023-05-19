<template>
  <router-view />
  <div class="container">
    <h2>To-Do List</h2>

    <input
        class="form-control"
        type="text"
        v-model="searchText"
        placeholder="search"
        @keyup.enter="searchTodo"
    >
    <hr />
    <todo-simple-form @add-todo="addTodo" />
    <div style="color: red">{{ error }}</div>

    <div v-if="!todos.length">
      There is nothing to display
    </div>

    <TodoList :todos="todos" @toggle-todo="toggleTodo" @delete-todo="deleteTodo"/>

    <hr/>

    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" v-if="currentPage !== 1">
          <a style="cursor: pointer" class="page-link" @click="getTodos(currentPage - 1)">Previous</a>
        </li>
        <li class="page-item"
            :class="currentPage === page ? 'active' : ''"
            v-for="page in numberOfPages"
            :key="page"
        >
          <a style="cursor: pointer" class="page-link" @click="getTodos(page)">{{page}}</a>
        </li>
        <li class="page-item" v-if="currentPage !== numberOfPages">
          <a style="cursor: pointer" class="page-link" @click="getTodos(currentPage + 1)">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import {ref, computed, watch} from 'vue'; // eslint-disable-line no-unused-vars
import TodoSimpleForm from "@/components/TodoSimpleForm"; // eslint-disable-line no-unused-vars
import TodoList from "@/components/TodoList"; // eslint-disable-line no-unused-vars
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

    const numberOfTodos = ref(0);
    let limit = 5;
    const currentPage = ref(1);
    const searchText = ref('');
    // todos개수에 따라 페이지 개수 계산
    const numberOfPages = computed(() => {
      return Math.ceil(numberOfTodos.value / limit);
    });

    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page;
      try {
        const res = await axios.get(`http://localhost:3000/todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`);
        numberOfTodos.value = res.headers['x-total-count'];
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
        await axios.post('http://localhost:3000/todos', {
          subject: todo.subject,
          completed: todo.completed,
          // eslint-disable-next-line no-unused-vars
        });
        getTodos(1);
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

        getTodos(1);
      } catch (err) {
        console.log(err);
        error.value = 'Something went wrong';
      }
    };

    let timeout = null;

    const searchTodo = () => {
      clearTimeout(timeout);
      getTodos(1);
    };

    watch(searchText, () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        getTodos(1);
      }, 2000);
    });
    // const filteredTodos = computed(() => {
    //   if (searchText.value) {
    //     return todos.value.filter(todo => {
    //       return todo.subject.includes(searchText.value);
    //     });
    //   }
    //
    //   return todos.value;
    // });

    return {
      toggle,
      todos,
      error,
      numberOfPages,
      currentPage,
      getTodos,
      toggleTodo,
      addTodo,
      onToggle,
      deleteTodo,
      searchTodo,
      searchText,
      // filteredTodos,
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

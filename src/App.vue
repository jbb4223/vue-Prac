<template>
  <div class="container">
    <h4>count: {{ count }}</h4>
    <h4>double count computed: {{ doubleCountComputed }}</h4>
    <h4>double count method: {{ doubleCountMethod() }}</h4>
    <button @click="count++">Add One</button>
    <h2>To-Do List</h2>

    <todo-simple-form @add-todo="addTodo" />

    <div v-if="!todos.length">
      추가된 Todo가 없습니다.
    </div>

    <TodoList :todos="todos" @toggle-todo="toggleTodo" @delete-todo="deleteTodo"/>
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

      const count = ref(1);

      const doubleCountComputed = computed(() => {
        console.log('computed');
        return count.value * 2;
      });

      const doubleCountMethod = () => {
        console.log('method');
        return count.value * 2;
      };

      return {
        toggle,
        todos,
        toggleTodo,
        todoStyle,
        addTodo,
        onToggle,
        deleteTodo,
        count,
        doubleCountComputed,
        doubleCountMethod,
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

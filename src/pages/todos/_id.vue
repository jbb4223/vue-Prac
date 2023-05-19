<template>
  <h1>To-Do Page</h1>
  <div v-if="loading"></div>
  <form
      v-else
      @submit.prevent="onSave"
  >
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label>Subject</label>
          <input
              type="text"
              class="form-control"
              v-model="todo.subject"
          >
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label>Status</label>
          <div>
            <button type="button"
                    class="btn"
                    :class="todo.completed ? 'btn-success' : 'btn-danger'"
                    @click="toggleTodoStatus"
            >
              {{ todo.completed ? 'Completed' : 'Incomplete'}}
            </button>
          </div>
        </div>
      </div>
    </div>

    <button
        type="submit"
        class="btn btn-primary m-1"
        :disabled="!todoUpdated"
    >
      Save
    </button>
    <button
        class="btn btn-outline-dark m-1"
        @click="moveToTodoListPage"
    >
      Cancel
    </button>
  </form>
</template>

<script>
import {computed, ref} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import _ from 'lodash';

export default {
  setup () {
    const route = useRoute();
    const router = useRouter();
    const todo = ref(null);
    const originalTodo = ref(null);
    const loading = ref(true);
    const todoId = route.params.id;


    const getTodo = async () => {
      const res = await axios.get(`http://localhost:3000/todos/${todoId}`);

      todo.value = { ...res.data };
      originalTodo.value = { ...res.data };
      loading.value = false;
    };

    const todoUpdated = computed(() => {
      return !_.isEqual(todo.value, originalTodo.value);
    });

    const toggleTodoStatus = () => {
      todo.value.completed = !todo.value.completed;
    };

    const moveToTodoListPage = () => {
      router.push({
        name: 'Todos'
      });
    };

    const onSave = async () => {
      if(todoUpdated.value) {
        const res = await axios.put(`http://localhost:3000/todos/${todoId}`, {
          subject: todo.value.subject,
          completed: todo.value.completed
        });

        originalTodo.value = {...res.data};

        if(res.status === 200) {
          router.push({
            name: 'Todos'
          });
        }
      } else {
        alert('변경후 저장해주세요.');
      }

    };

    getTodo();
    console.log(route.params.id);



    return {
      todo,
      loading,
      toggleTodoStatus,
      moveToTodoListPage,
      onSave,
      todoUpdated,
    };
  }
}
</script>

<style scoped>

</style>
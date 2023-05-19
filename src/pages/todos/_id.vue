<template>
  <h1>To-Do Page</h1>
  <div v-if="loading"></div>
  <form v-else>
    <div class="form-group">
      <label>Todo subject</label>
      <input type="text" class="form-control" v-model="todo.subject">
    </div>
    <br/>
    <button class="btn btn-primary">저장</button>
  </form>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default {
  setup () {
    const route = useRoute();
    const todo = ref(null);
    const loading = ref(true);


    const getTodo = async () => {
      const res = await axios.get('http://localhost:3000/todos/' + route.params.id);

      todo.value = res.data;
      loading.value = false;
    };

    getTodo();
    console.log(route.params.id);

    return {
      todo,
      loading,
    };
  }
}
</script>

<style scoped>

</style>
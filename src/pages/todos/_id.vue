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
  <Toast v-if="showToast"
         :message="toastMsessage"
         :type="toastAlertType"
  />
  <div id="Kossie">corder</div> 
</template>

<script>
import { computed, ref, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import _ from 'lodash';
import Toast from '@/components/Toast.vue';

export default {
  components : {
    Toast
  },
  setup () {
    const route = useRoute();
    const router = useRouter();
    const todo = ref(null);
    const originalTodo = ref(null);
    const loading = ref(true);
    const showToast = ref(false);
    const toastMsessage = ref('');
    const toastAlertType = ref('');
    const timeOut = ref(null);
    const todoId = route.params.id;

    // DOM에 Mount가 되었을 때 실행
    // timeout이 걸려있을때 시간을 기다리는도안 다른페이지로 이동하여 unMounted가 작동할때 clearTimeout처리를 해줌
    onUnmounted(() => {
      console.log('unmounted');
      clearTimeout(timeOut.value);
    });

    const getTodo = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/todos/${todoId}`);

        todo.value = { ...res.data };
        originalTodo.value = { ...res.data };

        loading.value = false;
      } catch (error) {
        console.log(error);
        triggerToast('Something went wrong','danger');
      }

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

    const triggerToast = (message, type = 'success') => {
      toastMsessage.value = message;
      toastAlertType.value = type;
      showToast.value = true;
      // 메모리 누수관리를 위해 필요
      timeOut.value = setTimeout( () => {
        console.log('hello');
        toastMsessage.value = '';
        toastAlertType.value = '';
        showToast.value = false;
      }, 3000);
    };

    const onSave = async () => {
      try {
        const res = await axios.put(`http://localhost:3000/todos/${todoId}`, {
          subject: todo.value.subject,
          completed: todo.value.completed
        });

        originalTodo.value = {...res.data};
        triggerToast('Successfully Saved!');
      } catch (error) {
        triggerToast('Something went wrong', 'danger');
      }


    };

    getTodo();



    return {
      todo,
      loading,
      showToast,
      toastMsessage,
      toggleTodoStatus,
      moveToTodoListPage,
      onSave,
      todoUpdated,
      toastAlertType,
    };
  }
}
</script>

<style scoped>

</style>
<template>
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
      <div v-if="editing" class="col-6">
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
      <div class="col-12 mb-2">
        <div class="form-group">
          <label>Body</label>
          <textarea v-model="todo.body" class="form-control" id="" cols="30" rows="10"></textarea>
        </div>
      </div>
    </div>

    <button
        type="submit"
        class="btn btn-primary m-1"
        :disabled="!todoUpdated"
    >
      {{editing ? 'Update' : 'Create'}}
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
</template>

<script>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import _ from 'lodash';
import Toast from '@/components/Toast.vue';
import { useToast } from "@/composables/toast";

export default {
  components : {
    Toast
  },
  props: {
    editing: {
      type: Boolean,
      default: false,
    }
  },
  setup (props) {
    const route = useRoute();
    const router = useRouter();
    const todo = ref({
      subject: '',
      completed: false,
      body: '',
    });
    const originalTodo = ref(null);
    const loading = ref(false);

    const todoId = route.params.id;

    const {
      toastMsessage,
      toastAlertType,
      showToast,
      triggerToast,
    } = useToast();

    const getTodo = async () => {
      loading.value = true;
      try {
        const res = await axios.get(`http://localhost:3000/todos/${todoId}`);

        todo.value = { ...res.data };
        originalTodo.value = { ...res.data };

        loading.value = false;
      } catch (error) {
        loading.value = false;
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

    const onSave = async () => {
      try {
        let res;
        const data = {
          subject: todo.value.subject,
          completed: todo.value.completed,
          body: todo.value.body,
        }
        if (props.editing) {
          res = await axios.put(`http://localhost:3000/todos/${todoId}`, data);
          originalTodo.value = {...res.data};
        } else {
          res = await axios.post(`http://localhost:3000/todos`, data);
          todo.value.subject = '';
          todo.value.body = '';
        }
        const message = 'Successfully ' + (props.editing ? 'Updated!' : 'Created!');
        triggerToast(message);
      } catch (error) {
        triggerToast('Something went wrong', 'danger');
      }


    };

    if(props.editing) {
      getTodo();
    }



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
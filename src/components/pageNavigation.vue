<template>
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
</template>

<script>
  export default {
    props: {
      numberOfPages: Number,
      currentPage: Number,
    },
    emit: [
      'current-page',
    ],
    setup (props, { emit }) {

      const getTodos = async (page) => {
        emit('current-page', page);
      };

      return  {
        getTodos,
      }
    }
  }
</script>

<style scoped>

</style>
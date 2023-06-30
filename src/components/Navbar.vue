<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand m-2" :to="{name: 'Home'}">
      JinBoung
    </router-link>

    <ul class="navbar-nav m-2">
      <li class="nav-item active">
        <router-link class="nav-link" :to="{ name: 'Todos' }">
          Todos
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>

</script>

<style scoped>

</style>
<template>
  <header class="header">
    <router-link class="header__logo" to="/">Test task</router-link>
    <slot></slot>
  </header>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: center;
  padding: 0.2em 0.5em;
  background-color: lightskyblue;
}
.header__logo {
  font-size: 2rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
}
.header__logo:hover {
  color: lightcyan;
}
</style>

<template>
  <div>
    <div class="wrapper">
      <Header />
      <router-view />
    </div>
    <MessageBox />
  </div>
</template>

<script>
import Header from "@/components/Header";
import MessageBox from "@/components/MessageBox.vue";

export default {
  components: {
    Header,
    MessageBox
  }
};
</script>

<style>
:root {
  box-sizing: border-box;
  font-family: Verdana, sans-serif;
}
*,
*::before,
*::after {
  box-sizing: inherit;
}
body {
  margin: 0.5em 0;
}
h1 {
  margin: 0.3em 0;
  font-size: 1.5rem;
}
.wrapper {
  max-width: 1200px;
  min-height: 98vh;
  margin: 0 auto;
  background-color: #eee;
  padding: 5px;
}
</style>

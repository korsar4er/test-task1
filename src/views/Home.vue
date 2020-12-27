<template>
  <div>
    <h1>Главная</h1>
    <div class="home__nav">
      <HistoryMenu />
    </div>
    <PostColumns />
  </div>
</template>

<script>
import HistoryMenu from "@/components/HistoryMenu.vue";
import PostColumns from "@/components/PostColumns.vue";

export default {
  name: "Home",
  components: { HistoryMenu, PostColumns }
};
</script>

<style scoped>
.home__nav {
  padding: 5px;
  text-align: center;
  margin-top: 5px;
}
</style>

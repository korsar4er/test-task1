<template>
  <div class="history-menu">
    <button @click="onClickButton()">История</button>
    <button @click="onClickButton('+')">История добавлений</button>
    <button @click="onClickButton('-')">История удалений</button>
  </div>
</template>

<script>
export default {
  name: "HistoryMenu",
  methods: {
    onClickButton(actionType) {
      let route = { name: "History" };
      if (actionType) route = { ...route, params: { actionType } };
      this.$router.push(route);
    }
  }
};
</script>

<style scoped>
.history-menu {
  align-self: flex-end;
}
.history-menu > * + * {
  margin-left: 5px;
}
</style>

<template>
  <div class="history">
    <h1>История событий</h1>
    <HistoryTable />
  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable.vue";

export default {
  name: "History",
  components: { HistoryTable }
};
</script>

<style scoped>
.history {
  padding: 5px;
}
</style>

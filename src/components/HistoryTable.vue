<template>
  <div>
    <table class="history-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Id</th>
          <th>Name</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in events" :key="event.id">
          <td>{{ new Date(event.date).toLocaleString() }}</td>
          <td>{{ event.itemId }}</td>
          <td>{{ event.itemName }}</td>
          <td>{{ event.actionType }}</td>
        </tr>
      </tbody>
    </table>
    <div class="history-table__message" v-if="!events.length">
      No data found
    </div>
  </div>
</template>

<script>
export default {
  name: "HistoryTable",
  computed: {
    events() {
      const actionType = this.$route.params.actionType;
      const history = this.$store.getters.history;
      if (actionType) return history.filter(h => h.actionType === actionType);
      return history;
    }
  }
};
</script>

<style scoped>
.history-table {
  padding: 5px;
}
.history-table {
  width: 100%;
  margin: 10px 0;
  border-collapse: collapse;
}
.history-table th,
.history-table td {
  border-bottom: gray 1px solid;
  vertical-align: top;
}
.history-table td:nth-child(2),
.history-table td:last-child {
  width: 10%;
  text-align: center;
}
.history-table__message {
  text-align: center;
  padding: 5px;
}
</style>

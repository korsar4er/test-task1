<template>
  <div v-if="text" class="message-box">
    <p>
      {{ text }}
    </p>
    <button @click="onClickOk">OK</button>
  </div>
</template>

<script>
export default {
  name: "MessageBox",
  computed: {
    text() {
      return this.$store.getters.messageBoxText;
    }
  },
  methods: {
    onClickOk() {
      this.$store.commit("setMessageBoxText", "");
    }
  }
};
</script>

<style>
.message-box {
  font-size: 1.2rem;
  position: fixed;
  bottom: 0;
  left: 50%;
  background-color: lightgray;
  text-align: center;
  padding: 0.5em 50px;
  width: 500px;
  margin-left: -250px;
}
</style>

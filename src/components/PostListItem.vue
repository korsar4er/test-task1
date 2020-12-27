<template>
  <div class="item__container">
    <div class="item">
      <div>
        <span>{{ item.name }}</span>
        <span v-if="item.matchCount && actionType === '+'">
          ({{ item.matchCount }})</span
        >
      </div>
      <div class="item__actions">
        <button @click="showComments = !showComments">...</button>
        <button
          @click="onClickMove({ id: item.id, name: item.name, actionType })"
        >
          {{ actionType }}
        </button>
      </div>
    </div>
    <transition name="fade">
      <ul v-show="showComments" class="item__comments">
        <li v-for="comment in item.comments" :key="comment.id">
          <span>{{ comment.name }}</span>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  name: "PostListItem",
  props: {
    actionType: {
      type: String,
      required: true,
      validator: value => ["+", "-"].includes(value)
    },
    item: Object,
    onClickMove: Function
  },
  data() {
    return {
      showComments: false
    };
  }
};
</script>

<style scoped>
.item__container {
  border: gray 1px solid;
  border-radius: 2px;
}
.item {
  display: flex;
  justify-content: space-between;
  background-color: lightskyblue;
  padding: 2px;
}
.item__actions > button {
  width: 1.8em;
  height: 1.7em;
  align-self: center;
  padding: 0 0.2em;
}
.item__actions {
  display: flex;
}
.item__actions > * + * {
  margin-left: 2px;
}
.item__comments {
  margin: 0;
  padding: 0;
  list-style: none;
}
.item__comments li {
  padding: 0 2px;
}
.item__comments > * + * {
  border-top: gray 1px solid;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

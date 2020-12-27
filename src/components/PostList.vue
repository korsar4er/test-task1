<template>
  <ul class="list">
    <transition-group name="list">
      <li v-for="item in postItems" :key="item.id">
        <PostListItem
          :item="item"
          :actionType="actionType"
          :onClickMove="onClickMove"
        />
      </li>
    </transition-group>
  </ul>
</template>

<script>
import PostListItem from "@/components/PostListItem.vue";

export default {
  name: "PostList",
  components: { PostListItem },
  props: {
    postItems: Array,
    actionType: {
      type: String,
      required: true,
      validator: value => ["+", "-"].includes(value)
    },
    onClickMove: Function
  }
};
</script>

<style scoped>
.list {
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: start;
}
.list li + li {
  margin-top: 2px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>

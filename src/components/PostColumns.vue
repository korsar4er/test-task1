<template>
  <div class="columns__container">
    <Spinner v-if="loading" />
    <div v-else class="columns">
      <div class="columns__search">
        <input
          v-model="searchString"
          @input="onChangeSearchString"
          type="search"
          placeholder="type to search"
        />
      </div>
      <div class="columns__left">
        <PostList
          actionType="+"
          :onClickMove="moveItem"
          :postItems="searchedPosts"
        />
      </div>
      <div class="columns__right">
        <PostList
          actionType="-"
          :onClickMove="moveItem"
          :postItems="selectedPosts"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PostList from "@/components/PostList.vue";
import Spinner from "@/components/Spinner.vue";

export default {
  name: "PostColumns",
  components: { PostList, Spinner },
  data() {
    return {
      searchString: "",
      loading: true
    };
  },
  computed: {
    searchedPosts() {
      return this.$store.getters.searchedPosts;
    },
    selectedPosts() {
      return this.$store.getters.selectedPosts;
    }
  },
  methods: {
    onChangeSearchString() {
      this.$store.dispatch("searchPosts", this.searchString);
    },
    moveItem({ id, name, actionType }) {
      this.$store.dispatch("movePost", { id, actionType });
      this.$store.dispatch("addHistory", {
        itemId: id,
        itemName: name,
        actionType
      });
    }
  },
  mounted() {
    this.$store
      .dispatch("fetchAllPosts")
      .then(() => this.$store.dispatch("searchPosts"))
      .then(() => (this.loading = false));
    this.$store.dispatch("clearSelectedPosts");
  }
};
</script>

<style scoped>
.columns__container {
  text-align: center;
}
.columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr;
  column-gap: 5px;
}
.columns__search {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  padding: 5px;
}
.columns__search > input {
  width: 100%;
}
.columns__left {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
}
.columns__right {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
}
</style>

import Vue from "vue";
import Vuex from "vuex";

import { get as apiGet } from "../utils/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    messageBoxText: "",
    allPosts: [],
    searchedPosts: [],
    selectedPosts: [],
    history: []
  },
  mutations: {
    setAllPosts: (state, payload) => {
      state.allPosts = payload;
    },
    setSearchedPosts: (state, payload) => {
      state.searchedPosts = payload;
    },
    setSelectedPosts: (state, payload) => {
      state.selectedPosts = payload;
    },
    setHistory: (state, payload) => {
      state.history = payload;
    },
    setMessageBoxText: (state, payload) => {
      state.messageBoxText = payload;
    }
  },
  actions: {
    fetchAllPosts: async ({ commit }) => {
      try {
        const [rawPosts, rawComments] = await Promise.all([
          apiGet("posts"),
          apiGet("comments")
        ]);
        const result = rawPosts.map(({ id, title: name }) => {
          const comments = rawComments
            .filter(rc => rc.postId === id)
            .map(({ id, name }) => ({ id, name }));
          const allNameString =
            name + "\n" + comments.map(c => c.name).join("\n");
          return { id, name, comments, allNameString };
        });
        commit("setAllPosts", result);
      } catch (err) {
        commit("setMessageBoxText", `fetchAllPosts error: ${err.message}`);
      }
    },

    searchPosts: async ({ commit, getters }, searchString) => {
      if (!searchString) {
        commit("setSearchedPosts", [...getters.allPosts]);
      } else {
        searchString = searchString
          .split("")
          .map(s => ("\\.^$(){}[]*+?".includes(s) ? `\\${s}` : s))
          .join("");
        let posts = [];
        try {
          const regexp = RegExp(searchString, "g");
          posts = getters.allPosts
            .map(p => {
              const matchCount = [...p.allNameString.matchAll(regexp)].length;
              return { ...p, matchCount };
            })
            .filter(p => p.matchCount > 0)
            .sort((a, b) => b.matchCount - a.matchCount);
        } catch (err) {
          commit("setMessageBoxText", `searchPosts error: ${err.message}`);
        }
        commit("setSearchedPosts", posts);
      }
    },
    clearSelectedPosts: ({ commit }) => {
      commit("setSelectedPosts", []);
    },
    movePost: ({ commit, getters }, { id, actionType }) => {
      let arrayFrom = [...getters.searchedPosts];
      let arrayTo = [...getters.selectedPosts];
      let mutationFrom = "setSearchedPosts";
      let mutationTo = "setSelectedPosts";

      if (actionType === "-") {
        [arrayFrom, arrayTo] = [arrayTo, arrayFrom];
        [mutationFrom, mutationTo] = [mutationTo, mutationFrom];
      }
      const item = arrayFrom.find(p => p.id === id);
      const itemIndex = arrayFrom.indexOf(item);

      if (arrayTo.find(a => a.id === id)) {
        commit("setMessageBoxText", `Item "${item.name}" already moved`);
      } else {
        arrayTo.push(item);
        commit(mutationTo, arrayTo);
      }
      arrayFrom.splice(itemIndex, 1);
      commit(mutationFrom, arrayFrom);
    },
    addHistory: ({ commit, getters }, { itemId, itemName, actionType }) => {
      const history = [...getters.history];
      history.push({
        itemId,
        itemName,
        actionType,
        date: Date.now(),
        id: history.length + 1
      });
      commit("setHistory", history);
    }
  },
  modules: {},
  getters: {
    allPosts: state => {
      return state.allPosts;
    },
    selectedPosts: state => {
      return state.selectedPosts;
    },
    searchedPosts: state => {
      return state.searchedPosts;
    },
    history: state => {
      return state.history;
    },
    messageBoxText: state => {
      return state.messageBoxText;
    }
  }
});

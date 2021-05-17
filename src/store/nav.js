import Vue from "vue";

export default () => ({
  state: {
    modal: "",
    modalData: {},
    contextMenu: "",
    contextMenuData: {},
    chat: false,
    homeView: "home",
    profileView: "profile",
    homeViewData: {}
  },

  getters: {},

  mutations: {
    SET_MODAL(state, { id, data }) {
      state.modal = id;
      state.modalData = data;
    },

    SET_CONTEXT_MENU(state, { id, data }) {
      state.contextMenu = id;
      state.contextMenuData = data;
    },

    SET_CHAT(state, payload) {
      state.chat = payload;
    },

    SET_HOME_VIEW(state, payload) {
      if (typeof payload === "string") {
        state.homeView = payload;
        state.homeViewData = {};
      } else {
        state.homeViewData = payload.data;
        state.homeView = payload.id;
      }
    },

    SET_PROFILE_VIEW(state, payload) {
      state.profileView = payload;
    }
  },

  actions: {
    showModal({ commit }, { id, data = {} }) {
      commit("SET_MODAL", { id, data });
    },

    hideModal({ commit }) {
      commit("SET_MODAL", "", {});
    },

    toggleChat({ state, commit }) {
      commit("SET_CHAT", !state.chat);
    }
  },

  namespaced: true
});

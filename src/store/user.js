import API from "@/api";

export default ({ socket }) => {
  const state = {
    isVerifyingToken: true,
    userProfile: {},
    userAccount: {
      email: "",
      receiveNotifications: false,
      salt: ""
    },
    token: ""
  };

  const getters = {
    isLoggedIn(state) {
      return !!state.token;
    }
  };

  const mutations = {
    SET_IS_VERIFYING_TOKEN(state, value) {
      state.isVerifyingToken = value;
    },

    LOG_IN(state, info) {
      state.userProfile = info.userProfile;
      state.userAccount = info.userAccount;
      state.token = info.token;
      localStorage.setItem("token", info.token);
    }
  };

  const actions = {
    async signUp({ commit }, body) {
      const res = await API.user.signUp(body);

      if (!res.ok) {
        return res;
      }

      commit("LOG_IN", res.data);
      return res;
    },

    async verifyToken({ commit }) {
      const res = await API.user.verifyUserToken();

      if (!res.ok) return;

      commit("LOG_IN", res.data);
      commit("SET_IS_VERIFYING_TOKEN", false);
    }
  };

  return {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
  };
};

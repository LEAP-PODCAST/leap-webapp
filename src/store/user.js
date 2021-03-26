import API from "@/api";

export default ({ socket }) => {
  const state = {
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
      console.log(res.data);
      return res;
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

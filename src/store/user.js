import API from "@/api";

// Unique device id used for decoding user info server-side
const getDeviceId = () => {
  const deviceId =
    localStorage.getItem("device-id") ||
    new Array(16)
      .fill()
      .map(() =>
        String.fromCharCode(Math.floor(Math.random() * (126 - 48 + 1) + 48))
      )
      .join("");

  localStorage.setItem("device-id", deviceId);
  return deviceId;
};

export default ({ socket }) => {
  const state = {
    isVerifyingToken: true,
    userProfile: {},
    userAccount: {
      email: "",
      receiveNotifications: false,
      salt: ""
    },
    token: "",
    deviceId: getDeviceId()
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
    },

    ADD_PODCAST(state, podcast) {
      state.userProfile.podcasts.push(podcast);
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

      if (res.ok) {
        commit("LOG_IN", res.data);
      } else {
        localStorage.removeItem("token");
      }

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

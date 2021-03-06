const API_URL = process.env.VUE_APP_API_URL || window.location.origin;

const http = {
  get(path, options = {}) {
    return fetch(`${API_URL}/api${path}`, {
      ...options,
      body: JSON.stringify(options.body),
      headers: {
        "Content-type": "application/json",
        authorization: localStorage.getItem("token") || "",
        "socket-id": window.socket.id,
        "user-key": window.userKey,
        "device-id": localStorage.getItem("device-id") || "",
        ...(options.headers || {})
      }
    })
      .then(async res => {
        const { data, error } = await res.json();

        return {
          ok: res.ok,
          data,
          error
        };
      })
      .catch(console.error);
  },

  post(path, options = {}) {
    return http.get(path, {
      method: "POST",
      ...options
    });
  },

  put(path, options = {}) {
    return http.get(path, {
      method: "PUT",
      ...options
    });
  },

  delete(path, options = {}) {
    return http.get(path, {
      method: "DELETE",
      ...options
    });
  }
};

export default {
  room: {
    join(body) {
      return http.post("/room/join", { body });
    },

    requestToJoinAsGuest() {
      return http.post("/room/requestToJoinAsGuest", {});
    },

    changeUserRole(body) {
      return http.put("/room/changeUserRole", { body });
    }
  },
  general: {
    emailList(body) {
      return http.post("/general/emailList", { body });
    }
  },

  transport: {
    create(body) {
      return http.post("/transport/create", { body });
    },

    connect(body) {
      return http.post("/transport/connect", { body });
    },

    consume(body) {
      return http.post("/transport/consume", { body });
    },

    produce(body) {
      return http.post("/transport/produce", { body });
    },

    produced(body) {
      return http.post("/transport/produced", { body });
    }
  },

  consumer: {
    pause(body) {
      return http.post("/consumer/pause", { body });
    },

    close(body) {
      return http.post("/consumer/close", { body });
    }
  },

  producer: {
    pause(body) {
      return http.post("/producer/pause", { body });
    },

    close(body) {
      return http.post("/producer/close", { body });
    }
  },

  stream: {
    webcam(body) {
      return http.post("/stream/webcam", { body });
    },

    mic(body) {
      return http.post("/stream/mic", { body });
    }
  },

  mic: {
    mute(body) {
      return http.post("/mic/mute", { body });
    }
  },

  chat: {
    message(body) {
      return http.post("/chat/message", { body });
    },

    username(body) {
      return http.post("/chat/username", { body });
    }
  },

  user: {
    signUp(body) {
      return http.post("/user/signUp", { body });
    },

    logIn(body) {
      return http.post("/user/logIn", { body });
    },

    verifyUserToken() {
      return http.post("/user/verifyUserToken");
    }
  },

  podcast: {
    create(body) {
      return http.post("/podcast/create", { body });
    },

    createScheduledEpisode(body) {
      return http.post("/podcast/createScheduledEpisode", { body });
    },

    getAllScheduledEpisodes() {
      return http.get("/podcast/getAllScheduledEpisodes");
    }
  },

  profiles: {
    search(username) {
      return http.get(`/profiles/search?username=${username}`);
    }
  },

  episode: {
    start(body) {
      return http.post("/episode/start", { body });
    },

    watch(body) {
      return http.post("/episode/watch", { body });
    },

    authenticate() {
      return http.post("/episode/authenticate");
    },

    end(body) {
      return http.put("/episode/end", { body });
    }
  }
};

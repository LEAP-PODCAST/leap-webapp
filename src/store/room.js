import Vue from "vue";
import { Device } from "mediasoup-client";

import API from "@/api.js";
import WebRTC from "@/webrtc.js";

export default ({ socket }) => {
  const state = {
    roomId: null,
    username: null,

    device: null,
    sendTransport: null,
    recvTransport: null,

    activeProduceHandshakeType: "",

    consumers: {},
    streams: {
      webcam: [],
      mic: []
    },

    producers: {
      webcam: null,
      mic: null
    },

    localStreams: {
      webcam: null,
      mic: null
    }
  };

  const getters = {};

  const mutations = {
    SET_ROOM_ID(state, roomId) {
      state.roomId = roomId;
    },

    SET_USERNAME(state, username) {
      state.username = username;
    },

    SET_DEVICE(state, options) {
      state.device = new Device();
      state.device.load(options);
    },

    CLOSE_DEVICE(state) {
      state.device = null;
    },

    SET_ACTIVE_PRODUCE_HANDSHAKE_TYPE(state, type) {
      state.activeProduceHandshakeType = type;
    },

    SET_STREAMS(state, streams) {
      state.streams.webcam = streams.webcam;
      state.streams.mic = streams.mic;
    },

    ADD_STREAM(state, { type, stream }) {
      state.streams[type].push(stream);
    },

    REMOVE_STREAM(state, { type, stream }) {
      const streams = state.streams[type];
      streams.splice(streams.indexOf(stream), 1);
    },

    SET_RECV_TRANSPORT(state, transport) {
      state.recvTransport = transport;
    },

    CLOSE_RECV_TRANSPORT(state) {
      if (!state.recvTransport) return;
      state.recvTransport.close();
      state.recvTransport = null;
    },

    SET_SEND_TRANSPORT(state, transport) {
      state.sendTransport = transport;
    },

    CLOSE_SEND_TRANSPORT(state) {
      if (!state.sendTransport) return;
      state.sendTransport.close();
      state.sendTransport = null;
    },

    ADD_CONSUMER(state, { producerId, consumer }) {
      Vue.set(state.consumers, producerId, consumer);
    },

    CLOSE_CONSUMER(state, producerId) {
      state.consumers[producerId].close();
      Vue.delete(state.consumers, producerId);
    },

    SET_PRODUCER(state, { type, producer }) {
      state.producers[type] = producer;
    },

    CLOSE_PRODUCER(state, type) {
      const producer = state.producers[type];
      if (!producer) return;
      const producerId = producer.id;

      // Close local transport
      producer.close();
      state.producers[type] = null;

      // Unsubscribe from socket events
      socket.off(`producer/close/${producerId}`);
    },

    SET_LOCAL_STREAM(state, { type, stream }) {
      state.localStreams[type] = stream;
    },

    CLOSE_LOCAL_STREAM(state, type) {
      // Stop all tracks belonging to localStream
      if (!state.localStreams[type]) return;
      state.localStreams[type].getTracks(t => t.stop());
      state.localStreams[type] = null;
    }
  };

  const actions = {
    async watchEpisode(
      { commit, dispatch },
      { podcastUrlName, episodeUrlName }
    ) {
      let res = await API.episode.watch({ podcastUrlName, episodeUrlName });

      if (!res.ok) {
        console.error(res.error);
        return;
      }

      commit("SET_ROOM_ID", `episode/${episodeUrlName}`);
      dispatch("onJoinRoom", res);
    },

    async join({ commit, dispatch }, { roomId, username }) {
      let res = await API.room.join({ roomId, username });

      if (!res.ok) {
        console.error(res.error);
        return;
      }

      commit("SET_ROOM_ID", roomId);
      dispatch("onJoinRoom", res);
    },

    async onJoinRoom({ state, commit, dispatch }, res) {
      const { roomId } = state;

      socket.on("stream/webcam", async stream => {
        await dispatch("consumeWebcam", stream);
        commit("ADD_STREAM", { type: "webcam", stream });
      });

      socket.on("stream/mic", async stream => {
        await dispatch("consumeMic", stream);
        commit("ADD_STREAM", { type: "mic", stream });
      });

      const { routerRtpCapabilities, streams, room, key } = res.data;
      window.userKey = key;

      commit("SET_DEVICE", { routerRtpCapabilities });

      // Create a receive transport
      res = await API.transport.create({
        type: "recv",
        roomId
      });

      if (!res.ok) {
        console.error(res.error);
        return;
      }

      const recvTransport = await state.device.createRecvTransport(
        res.data.transportOptions
      );

      recvTransport.on(
        "connect",
        async ({ dtlsParameters }, callback, errback) => {
          // Connect the receive transport
          res = await API.transport.connect({
            type: "recv",
            transportOptions: {
              transportId: recvTransport.id,
              dtlsParameters
            }
          });

          if (!res.ok) {
            console.error(res.error);
            // TODO figure out how to better handle errback, how it works
            errback();
            return;
          }

          callback();
        }
      );

      commit("SET_RECV_TRANSPORT", recvTransport);

      // Create a send transport
      res = await API.transport.create({
        type: "send",
        roomId
      });

      if (!res.ok) {
        console.error(res.error);
        return;
      }

      const sendTransport = await state.device.createSendTransport(
        res.data.transportOptions
      );

      sendTransport.on(
        "connect",
        async ({ dtlsParameters }, callback, errback) => {
          // Connect the receive transport
          res = await API.transport.connect({
            type: "send",
            transportOptions: {
              transportId: sendTransport.id,
              dtlsParameters
            }
          });

          if (!res.ok) {
            console.error(res.error);
            // TODO figure out how to better handle errback, how it works
            errback();
            return;
          }

          callback();
        }
      );

      // Define the handshake process that occurs on producing stream
      sendTransport.on("produce", async (params, callback, errback) => {
        res = await API.transport.produce({
          producerOptions: {
            transportId: sendTransport.id,
            kind: params.kind,
            rtpParameters: params.rtpParameters
          },
          type: state.activeProduceHandshakeType,
          roomId: state.roomId
        });

        if (!res.ok) {
          console.error(res.error);
          errback();
          commit("SET_ACTIVE_PRODUCE_HANDSHAKE_TYPE", "");
          return;
        }

        callback(res.data);

        if (state.activeProduceHandshakeType === "audio") {
          return;
        }

        res = await API.transport.produced({
          type: state.activeProduceHandshakeType,
          roomId: state.roomId
        });

        if (!res.ok) {
          console.error(res.error);
          errback();
          commit("SET_ACTIVE_PRODUCE_HANDSHAKE_TYPE", "");
          return;
        }
      });

      commit("SET_SEND_TRANSPORT", sendTransport);

      for (let i = 0; i < streams.webcam.length; i++) {
        await dispatch("consumeWebcam", streams.webcam[i]);
      }

      for (let i = 0; i < streams.mic.length; i++) {
        await dispatch("consumeMic", streams.mic[i]);
      }

      commit("SET_STREAMS", streams);
      dispatch("chat/join", { room }, { root: true });

      // TODO check if is logged in
      const res2 = await API.episode.authenticate();

      return true;
    },
    // METHOD END

    async consume({ commit, state }, producerId) {
      let res = await API.transport.consume({
        consumerOptions: {
          producerId,
          rtpCapabilities: state.device.rtpCapabilities
        }
      });

      if (!res.ok) {
        console.error(res.error);
        return;
      }

      const consumer = await state.recvTransport.consume(
        res.data.consumerOptions
      );

      // TODO error handeling
      await API.consumer.pause({ consumerId: consumer.id, state: "resume" });

      commit("ADD_CONSUMER", { producerId, consumer });
    },

    async stopConsume({ state, commit }, producerId) {
      // Close server-side consumer
      const consumer = state.consumers[producerId];

      if (!consumer) return;

      const { ok, error } = await API.consumer.close({
        consumerId: consumer.id
      });

      if (!ok) {
        console.error(error);
        return;
      }

      commit("CLOSE_CONSUMER", producerId);
    },

    async toggleConsume({ state, dispatch }, producerId) {
      const isConsumer = !!state.consumers[producerId];
      if (isConsumer) {
        await dispatch("stopConsume", producerId);
      } else {
        await dispatch("consume", producerId);
      }
    },

    async consumeWebcam({ commit, dispatch }, stream) {
      const { producerId } = stream;

      // Consume the stream
      await dispatch("consume", producerId);

      // Subscribe to stream close event
      socket.on(`producer/close/${producerId}`, () => {
        dispatch("stopConsume", producerId);
        commit("REMOVE_STREAM", { type: "webcam", stream });
        socket.off(`producer/close/${producerId}`);
      });
    },

    async consumeMic({ commit, dispatch }, stream) {
      const { producerId } = stream;

      // Consume the stream
      await dispatch("consume", producerId);

      // Subscribe to stream close event
      socket.on(`producer/close/${producerId}`, () => {
        dispatch("stopConsume", producerId);
        commit("REMOVE_STREAM", { type: "mic", stream });
        socket.off(`producer/close/${producerId}`);
      });
    },

    async produce({ state }, track) {
      const producer = await state.sendTransport.produce({
        track,
        codecOptions: {
          videoGoogleMaxBitrate: 4000
        }
      });

      return producer;
    },

    async produceWebcam({ commit, dispatch }) {
      const { ok, error, stream } = await WebRTC.getUserMedia({
        video: { maxWidth: "1280", maxHeight: "720" }
      });

      if (!ok) {
        console.error(error);
        return;
      }

      const videoTrack = stream.getVideoTracks()[0];
      // If client clicks Stop Sharing button or ends stream via browser APIs
      videoTrack.onended = () => dispatch("stopProduceWebcam");

      commit("SET_ACTIVE_PRODUCE_HANDSHAKE_TYPE", "webcam");
      const producer = await dispatch("produce", videoTrack);

      commit("SET_PRODUCER", { type: "webcam", producer });
      commit("SET_LOCAL_STREAM", { type: "webcam", stream });
      commit("SET_ACTIVE_PRODUCE_HANDSHAKE_TYPE", "");
    },

    async stopProduceWebcam({ commit }) {
      const { ok, error } = await API.producer.close({
        producerId: state.producers.webcam.id
      });

      if (!ok) {
        console.error(error);
        return;
      }

      commit("CLOSE_PRODUCER", "webcam");
      commit("CLOSE_LOCAL_STREAM", "webcam");
    },

    async produceMic({ commit, dispatch }) {
      const { ok, error, stream } = await WebRTC.getUserMedia({
        // TODO add settings for choosing mic to use (this uses default)
        audio: true
      });

      if (!ok) {
        console.error(error);
        return;
      }

      const audioTrack = stream.getAudioTracks()[0];
      // If client clicks Stop Sharing button or ends stream via browser APIs
      audioTrack.onended = () => dispatch("stopProduceMic");

      commit("SET_ACTIVE_PRODUCE_HANDSHAKE_TYPE", "mic");
      const producer = await dispatch("produce", audioTrack);

      commit("SET_PRODUCER", { type: "mic", producer });
      commit("SET_LOCAL_STREAM", { type: "mic", stream });
      commit("SET_ACTIVE_PRODUCE_HANDSHAKE_TYPE", "");
    },

    async stopProduceMic({ state, commit }) {
      const { ok, error } = await API.producer.close({
        producerId: state.producers.mic.id
      });

      if (!ok) {
        console.error(error);
        return;
      }

      commit("CLOSE_PRODUCER", "mic");
      commit("CLOSE_LOCAL_STREAM", "mic");
    },

    async changeUsername({ state, commit }, { username }) {
      const { ok, error } = await API.chat.username({
        roomId: state.roomId,
        username
      });

      if (!ok) {
        console.error(error);
        return false;
      }

      commit("SET_USERNAME", username);

      return true;
    },

    leave({ commit }) {
      socket.emit("room/leave");

      commit("SET_ROOM_ID", null);
      commit("SET_USERNAME", null);

      // TODO unsubscribe from corresponding socket events
      commit("SET_STREAMS", {
        webcam: null,
        mic: null
      });

      // Close all consumers
      for (const producerId in state.consumers) {
        commit("CLOSE_CONSUMER", producerId);
      }

      // Close all producers
      for (const type in state.producers) {
        commit("CLOSE_PRODUCER", type);
      }

      // Close transports and device
      commit("CLOSE_RECV_TRANSPORT");
      commit("CLOSE_SEND_TRANSPORT");
      commit("CLOSE_DEVICE");

      // End all local streams
      for (const type in state.localStreams) {
        commit("CLOSE_LOCAL_STREAM", type);
      }

      socket.off("stream/webcam");
      socket.off("stream/mic");
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

export default {
  registerCoaches(state, payload) {
    state.coaches.push(payload);
  },
  setCoaches(state, payload) {
    state.coaches = payload;
  },
  fetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  },
};

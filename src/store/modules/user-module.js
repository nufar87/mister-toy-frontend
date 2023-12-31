import { userService } from '@/services/user-service.js';

export default {
  state: {
    loggedinUser: null,
  },
  getters: {
    getUser(state) {
      return state.loggedinUser;
    },
  },
  mutations: {
    setUser(state, { user }) {
      state.loggedinUser = user;
    },
  },
  actions: {
    async login({ commit }, { cred }) {
      try {
        const user = await userService.login(cred);
        commit({ type: 'setUser', user });
      } catch (err) {
        console.error(err);
      }
    },
    async signup({ commit }, { cred }) {
      try {
        const user = await userService.signup(cred);
        commit({ type: 'setUser', user });
      } catch (err) {
        console.error(err);
      }
    },
    async logout({ commit }) {
      try {
        await userService.logout();
        commit({ type: 'setUser', user: null });
      } catch (err) {
        console.error(err);
      }
    },
  },
};

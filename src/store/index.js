import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
  state:{
    title: "I'm Kirito",
    username: "Edward",
    friends: [],
    friend: null
  },
  mutations:{
    addFriend ( state ){
      state.friends = [state.friend, ...state.friends];
    }
  },
  actions: {
    addFriendAction( context ){
      context.commit('addFriend');
    }
  },
  getters: {
    title: state => state.title,
    username: state => state.username
  },


})

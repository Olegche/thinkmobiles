import Vue from 'vue'
import Vuex from 'vuex'
import {
  v4 as uuidv4
} from 'uuid';


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    usersListData: [{
        _id: '1',
        firstName: 'Jo',
        lastName: 'Cow',
        email: 'email@jo',
        phoneNumber: '777',
        events: []
      },
      {
        _id: '2',
        firstName: 'Steven',
        lastName: 'Bear',
        email: 'email@steven',
        phoneNumber: '778',
        events: []
      },
      {
        _id: '3',
        firstName: 'Dan',
        lastName: 'Goat',
        email: 'email@dan',
        phoneNumber: '889',
        events: []
      },
    ],

  },
  mutations: {


    addEventToUser(state, {
      userId,
      event
    }) {
      const user = state.usersListData.find(user => user._id === userId)
      if (user) {
        user.events.push({
          _id: uuidv4(),
          ...event
        })
      }
    },

    setUsersListData(state, data) {
      state.usersListData = [...data]
    }






  },
  actions: {

    loadData({
      commit
    }) {
      fetch('http://localhost:9000/users')
        .then((res) => res.json())
        .then((resData) => {
          console.log('load data resdata ok');
          if (resData) {
            commit("setUsersListData", resData)
          }
        })
        .catch((err) => {
          console.log(`Error fetching data: ${err}`);
        })
    },


    addNewUser({
      dispatch
    }, userData) {

      fetch('http://localhost:9000/users/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData),
        })
        .then((res) => res.json())
        .then((resData) => {
          if (resData) dispatch('loadData')
          else throw new Error("Fetch failed!");
        })
        .catch((err) => {
          console.log(`Error adding new user: ${err}`);
        })
    },


    updateUser({
      dispatch
    }, userData) {

      fetch('http://localhost:9000/users/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData),
        })
        .then((res) => res.json())
        .then((resData) => {
          console.log(`resdata  $$$ ${resData}`);
          if (resData) dispatch('loadData')
          else throw new Error("Fetch failed!");
        })
        .catch((err) => {
          console.log(`Error updating user: ${err}`);
        })
    },

   
  addEventToUser({ dispatch }, { userId, eventData }) {
  const url = `http://localhost:9000/users/${userId}/events`;

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(eventData)
  })
  .then((res) => res.json())
  .then((resData) => {
    if (resData.message === "Event added to user") dispatch('loadData');
    else throw new Error("Fetch failed!");
  })
  .catch((err) => {
    console.log(`Error adding event to user: ${err}`);
  });
}


  },
  getters: {

    getUsersListData: (state) => state.usersListData,

    getUserById: (state) => (id) => {
      return state.usersListData.find((item) => item._id == id)
    },

    getUserEvents: (state) => (userId) => {
      const user = state.usersListData.find(user => user._id === userId)
      if (user) {
        return user.events
      } else {
        return []
      }
    }
  }
})


export default store

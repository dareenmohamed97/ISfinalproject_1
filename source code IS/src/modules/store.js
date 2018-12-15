import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const LOGIN = 'LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_ERROR = 'LOGIN_ERROR'
const LOGOUT = 'LOGOUT';

const store = new Vuex.Store({
  state: {
    token: sessionStorage.getItem('token') || '',
    name: sessionStorage.getItem('name') || '',
    type: sessionStorage.getItem('type') || '',
    status: ''
  },
  mutations: {
    [LOGIN](state) {
      state.status = 'loading';
    },
    [LOGIN_SUCCESS](state, {token, name, type}) {
      state.status = 'success';
      state.token = token;
      state.name = name;
      state.type = type;
    },
    [LOGOUT](state) {
      state.status = 'logged out';
      state.token = '';
      state.name = '';
      state.type = '';
    },
    [LOGIN_ERROR](state, err) {
      state.status = 'error';
    }
  },
  actions: {
    [LOGIN]: ({commit, dispatch}, creds) => {
      commit(LOGIN); // show spinner
      let axiosUrl = '';
      switch (creds.type) {
        case 'lecturer': axiosUrl = '/lecturer/loginLecturer'; break;
        case 'teacher': axiosUrl = '/teacher/loginTeacher'; break;
        case 'student': axiosUrl = '/student/loginStudent'; break;
      }
      return new Promise((resolve, reject) => {
        axios.post(axiosUrl, creds)
          .then(response => {
            if (response.status === 200) {
              let token = response.data.data.token;
              let name = response.data.data.name;
              let type = response.data.data.type;
              sessionStorage.setItem('token', token);
              sessionStorage.setItem('name', name);
              sessionStorage.setItem('type', type);
              commit(LOGIN_SUCCESS,
                {token, name, type});
              resolve();
            }
          })
          .catch(e => {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('name');
            sessionStorage.removeItem('type');
            reject(e);
          })
      })
    },
    [LOGOUT]: ({commit, dispatch}) => {
      return new Promise((resolve, reject) => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('type');
        commit(LOGOUT)
        resolve()
      })
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    getToken: state => state.token,
    getType: state => state.type,
    getName: state => state.name
  }
})

export default store

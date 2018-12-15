import axios from 'axios'

export default function setup () {
  axios.interceptors.request.use(function (config) {
    const token = sessionStorage.getItem('token')
    if (token) {
      config.headers.authorization = token
    }
    return config
  }, function (err) {
    return Promise.reject(err)
  })
}

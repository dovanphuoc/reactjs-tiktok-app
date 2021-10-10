import axios from 'axios'
const instance = axios.create({
  baseURL: 'https://tiktok.fullstack.edu.vn'
})

instance.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('token')
instance.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    return Promise.reject(error)
  }
)
export default instance

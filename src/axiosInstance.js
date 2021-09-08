import axios from 'axios'
const instance = axios.create({
    baseURL: 'https://tiktok.f8team.dev',
});

instance.defaults.headers.common['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90aWt0b2suZjh0ZWFtLmRldlwvYXBpXC9hdXRoXC9yZWdpc3RlciIsImlhdCI6MTYzMDE0ODA3MSwiZXhwIjoxNjMyNzQwMDcxLCJuYmYiOjE2MzAxNDgwNzEsImp0aSI6InRsQk8zMHEzVlRkaUhIYzQiLCJzdWIiOjE2MiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.LAQN4Uw6H5tedJdo5EKZIo96qJJoekKnqBjMs4sZxKo'
instance.interceptors.response.use(function (response) {
    return response.data
}, function (error) {
    return Promise.reject(error)
});
export default instance
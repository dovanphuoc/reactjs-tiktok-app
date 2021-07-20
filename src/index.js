import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios'
import Modal from 'react-modal'
Modal.setAppElement('#root')
axios.defaults.baseURL = 'https://tiktok.f8team.dev'

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    return response.data
}, function (error) {
    return Promise.reject(error)
});

// Các bạn không dùng Token này, hãy tự lấy token của bạn và thay vào!
axios.defaults.headers.common['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90aWt0b2suZjh0ZWFtLmRldlwvYXBpXC9hdXRoXC9yZWdpc3RlciIsImlhdCI6MTYyNjY4Nzg2OSwiZXhwIjoxNjI5Mjc5ODY5LCJuYmYiOjE2MjY2ODc4NjksImp0aSI6IjJQSW8wcUZyMG5xdERqTVUiLCJzdWIiOjE0NCwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.TsZyP8oYIxJhQhHBklYwGAoJGjzm_VrBAJ-KzJ6PE5I'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

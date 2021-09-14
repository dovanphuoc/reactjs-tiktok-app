import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import Modal from 'react-modal'
import { Provider } from 'react-redux'
import store from './redux/store'
Modal.setAppElement('#root')

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <ToastContainer
      autoClose={1000}
      pauseOnFocusLoss={false}
      transition={Flip}
    />
  </React.StrictMode>
);

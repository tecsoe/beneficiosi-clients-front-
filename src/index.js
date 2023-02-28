import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'swiper/swiper-bundle.css';
import SwiperCore, { Navigation, Pagination, Zoom } from 'swiper';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './contexts/AuthContext';

import 'animate.css/animate.min.css';

SwiperCore.use([Navigation, Pagination, Zoom]);

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

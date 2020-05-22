import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './01-base/08-父子组件.js';
import 'antd/dist/antd.css';
import App from './App'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  // <React.StrictMode>
    <App />, // 组件首字母大写
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

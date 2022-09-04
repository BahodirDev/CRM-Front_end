import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css';
import { BrowserRouter as RR } from 'react-router-dom';
import {Provider} from 'react-redux'
import { createStore } from 'redux';
import reducer from './redux/reducer/reducer';
import { store } from './redux/stores';

// const store = createStore(reducer)


ReactDOM.createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
      <RR>
        <App />
      </RR>
    </Provider>
 
)
// https://icons8.com/icons/set/description
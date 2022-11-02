// import react from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter } from "react-router-dom";
// import { applyMiddleware, compose } from 'redux'
// import { thunk } from 'redux-thunk';

import reducer from './reducer';

const store = configureStore({ reducer: reducer });


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store} >
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>

);
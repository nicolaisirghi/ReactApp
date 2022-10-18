import store from "./redux/state";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

 let rerendererEntireTree = (state)=> {
    root.render(

        <React.StrictMode>
            <BrowserRouter>
                <App state={state}
                     dispatch = {store.dispatch.bind(store)} store={store} />
            </BrowserRouter>

        </React.StrictMode>
    );
}


rerendererEntireTree(store.getState());
 store.subscribe(rerendererEntireTree)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();




import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './routes/Login';
import Checkout from './routes/Checkout';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={App} />
            <Route path="/login" component={Login} />
            <Route path="/checkout" component={Checkout} />
        </Switch>
    </ BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
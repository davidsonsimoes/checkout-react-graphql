import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import LoginPage from './routes/LoginPage';
import CheckoutPage from './routes/CheckoutPage';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={App} />
            <Route path="/login" component={LoginPage} />
            <Route path="/checkout" component={CheckoutPage} />
        </Switch>
    </ BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
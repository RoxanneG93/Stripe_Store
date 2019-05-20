import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './index.css';
import App from './components/App';
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';
import Register from './components/Register';
import Checkout from './components/Checkout';
import Brews from './components/Brews';
import "gestalt/dist/gestalt.css";
import * as serviceWorker from './serviceWorker';


const Root = () => (
    <Router>
        <React.Fragment>
            <Navbar />
            <Switch>
                <Route component={App} exact path="/" />
                <Route component={SignIn} exact path="/signin" />
                <Route component={Register} exact path="/register" />
                <Route component={Checkout} exact path="/checkout" />
                <Route component={Brews} exact path="/:brandId" />
            </Switch>
        </React.Fragment>
    </Router>
)

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

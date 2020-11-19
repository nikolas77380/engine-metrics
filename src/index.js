import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/">
                    <App/>
                </Route>
                <Route path="*">
                    <NoMatch />
                </Route>
            </Switch>
        </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
function NoMatch() {
    return (
    <div>
        <h3>
            No match
        </h3>
    </div>
    );
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

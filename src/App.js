import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Dashboard from './containers/Dashboard';

import store from './store';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <Router>
            <div>
              <Switch>
                <Route path="/trade/:pair" component={Dashboard} />
                <Redirect from="/" to="/trade/USDEUR" />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;

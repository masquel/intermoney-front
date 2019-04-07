import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import web3 from './web3';

import Header from './components/Header';
import Footer from './components/Footer';

import Dashboard from './containers/Dashboard';

import store from './store';

import './App.css';

const Web3Provider = web3.Web3Provider;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Web3Provider>
          <div className="app">
            <Header />
            <Router>
              <div>
                <Switch>
                  <Route path="/trade/:pair" component={Dashboard} />
                  <Redirect from="/" to="/trade/USDEUR" />
                </Switch>
              </div>
            </Router>
            <Footer />
          </div>
        </Web3Provider>
      </Provider>
    );
  }
}

export default App;

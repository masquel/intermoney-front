import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Header from './components/Header';

import Dashboard from './containers/Dashboard';

import store from './store';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <Header />
          <Dashboard />
        </div>
      </Provider>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Header from './components/Header';
import Footer from './components/Footer';

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
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default App;

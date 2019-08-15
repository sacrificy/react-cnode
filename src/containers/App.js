import React from 'react'
import { Provider, connect } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom'
import store from '../store'; // 引入redux提供的store

import { actions as loginActions } from './Login/store';
import CommonLayout from '../layout/CommonLayout';


class App extends React.Component {

  componentDidMount() {
    this.initLoginStatus();
  }

  initLoginStatus() {
    const localToken = localStorage.getItem('token');
    if (!localToken) return;
    const { dispatch } = this.props;
    const localLoginStatus = JSON.parse(localStorage.getItem('status'));
    dispatch(loginActions.changeLoginInfo(localLoginStatus));
  }

  render() {
    return (
      <HashRouter>
        <Route path="/" component={CommonLayout} />
      </HashRouter>)
  }
}

const ConnectedApp = connect(null, null)(App);

const Wrapper = () => (
  <Provider store={store}>
    <ConnectedApp />
  </Provider>

);


export default Wrapper;
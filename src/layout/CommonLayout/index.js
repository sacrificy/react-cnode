import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Header from '../../components/Header';
import Login from '../../containers/Login';
import Home from '../../containers/Home';

class Index extends React.Component {

  render() {
    return (
      <div style={{ minHeight: "100vh",background: "#e1e1e1"}}>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          {/* <Route path="/topic/:id" exact component={Detail} /> */}
          <Route path="/login" exact component={Login} />
        </Switch>
      </div>
    )
  }
}

export default Index
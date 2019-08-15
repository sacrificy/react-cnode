import React from 'react'
import { Redirect } from 'react-router-dom';
import { Card, Input, Button } from 'antd'
import "./style.css"
import { connect } from 'react-redux';

import { actions } from './store';

class Login extends React.Component {
  state = {
    token: '',
  }

  componentDidMount() {
    const { loginByToken } = this.props;
    const token = localStorage.getItem('token');
    if (token) loginByToken(token);
  }

  render() {
    const { token } = this.state;
    const { loginByToken, isLogin } = this.props;
    if (isLogin) return <Redirect to="/" />;
    return (
      <div className="main">
        <Card title="关于" bordered={false} style={{ width:290,float:"right" }}>
          <div>这是给皮皮写的一个项目</div>
        </Card>
        <Card title="登录" bordered={false} style={{ width: 1095,float:"left" }}>
          <Input value={token} onChange={evt => this.setState({ token: evt.target.value })} placeholder="access-token" />
          <Button type="primary" onClick={() => loginByToken(token)} block style={{marginTop: "50px"}}>登录</Button>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = $state => ({
  isLogin: $state.login.isLogin
});

const mapDispatchToProps = dispatch => ({
  loginByToken: token => {
    dispatch(actions.loginWithToken(token));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
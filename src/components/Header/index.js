import React from 'react'
import { Link } from 'react-router-dom'
import logoImg from '../../assets/images/logo.svg'
import './style.css'
import 'antd/dist/antd.css'
import { connect } from 'react-redux';
import { Layout, Input, Icon } from 'antd'
import { actions as loginActions } from '../../containers/Login/store';

class Header extends React.Component {
  render() {
    const { isLogin, logout } = this.props;
    return (
      
      <Layout>
        <Layout.Header style={{ height: "50px", backgroundColor: "#444" }}>
          <Link className="header-logo" to="/">
            <img src={logoImg} alt="logo-cnode" />
          </Link>
          <div className="header-input">
            <Input style={{ maxHeight: "100%" }} prefix={<Icon type="search" />} />
          </div>
          <div className="header-right">
            {isLogin
              ? <input type="button" onClick={logout} className="header-item" value="清除登录数据" />
              : <Link className="header-item" to="/login">登录</Link>}
            <Link className="header-item" to="/">设置1</Link>
            <Link className="header-item" to="/">关于</Link>
            <Link className="header-item" to="/">API</Link>
            <Link className="header-item" to="/">新手入门</Link>
            <Link className="header-item" to="/">未读消息</Link>
            <Link className="header-item" to="/">首页</Link>
          </div>
        </Layout.Header>
      </Layout>
    )
  }
}

const mapDispatch = dispatch => ({
  logout() {
    localStorage.setItem('token', '');
    return dispatch(loginActions.logout());
  },
});

const mapState = $state => ({
  isLogin: $state.login.isLogin
});

export default connect(mapState, mapDispatch)(Header);
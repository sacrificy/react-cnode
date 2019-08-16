import {
  request as req,
} from '../../../utils';
import * as constants from './constants';

export const changeLoginInfo = info => ({
  type: constants.CHANGE_USER_INFO,
  payload: info,
});

export const getUserInfo = username => (dispatch) => {
  return req.get(`/user/${username}`).then(response => {
    const { data } = response
    dispatch(setUserInfo(data.data))
  })
}

export const setUserInfo = info => {
  return ({
    type: constants.SET_USER_INFO,
    userInfo: info,
  })
};

export const login = input =>({
  type: constants.LOGIN,
  input,
})

export const logout = () => ({
  type: constants.LOGOUT,
});

export const loginWithToken = token => (dispatch) => {

  return req.post('/accesstoken ', {
      accesstoken: token,
    }).then(response => {
      const {data} = response
      dispatch(getUserInfo(data.loginname))
      const {
        loginname,
        id,
        avatar_url,
      } = data;
      const loginStatus = {
        isLogin: true,
        user: {
          name: loginname,
          avatar: avatar_url,
          id,
        },
        token:token
      };
      localStorage.setItem('token', token);
  
      localStorage.setItem('status', JSON.stringify(loginStatus));
      // 增加本地登录缓存
      dispatch(changeLoginInfo(loginStatus));
    },error => {
      alert('error')
      dispatch(logout());
      localStorage.clear('token');
    })
};


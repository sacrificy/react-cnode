import {
  request as req,
} from '../../../utils';
import * as constants from './constants';

export const changeLoginInfo = info => ({
  type: constants.CHANGE_USER_INFO,
  payload: info,
});

export const logout = () => ({
  type: constants.LOGOUT,
});

export const loginWithToken = token => (dispatch) => {
  return req.post('/accesstoken ', {
      accesstoken: token,
    }).then(response => {
      const {data} = response
      const {
        loginname,
        id,
        avatar_url,
        score
      } = data;
      const loginStatus = {
        isLogin: true,
        user: {
          name: loginname,
          avatar: avatar_url,
          id,
          score
        },
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


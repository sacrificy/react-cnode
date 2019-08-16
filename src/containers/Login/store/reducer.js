import * as constants from './constants';

const defaultState = {
  token: '',
  isLogin: false,
  user: null,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_USER_INFO: {
      return {
        isLogin: action.payload.isLogin,
        user: { ...action.payload.user },
        token: action.payload.token,
      };
    }
    case constants.SET_USER_INFO: {
      let newState = JSON.parse(JSON.stringify(state))
      newState.user = action.userInfo
      return newState
    } 

    case constants.LOGOUT: {
      return {
        isLogin: null,
        user: {},
        token: '',
      }
    }
    case constants.LOGIN: {
      return {
        isLogin: null,
        user: {},
        token: action.input,
      }
    }
    default:
      break;
  }
  return state;
};

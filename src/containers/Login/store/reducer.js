import * as constants from './constants';

const defaultState = {
  isLogin: false,
  user: null,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_USER_INFO: {
      return {
        isLogin: action.payload.isLogin,
        user: { ...action.payload.user }
      };
    }
    case constants.LOGOUT: {
      return {
        isLogin: null,
        user: {}
      }
    }
    default:
      break;
  }
  return state;
};

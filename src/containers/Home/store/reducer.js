import * as constants from './constants'

const defaultState = {
    userInfo: null,
    data: null,
}

export default (state = defaultState, action) => {
    switch (action.type) {
      case constants.SET_USER_INFO: {
          let newState = JSON.parse(JSON.stringify(state))
          newState.userInfo = action.userInfo
          return newState
      }
      case constants.SET_TOPIC_LIST: {
        let newState = JSON.parse(JSON.stringify(state))
        newState.data = action.topics
        return newState
      }
      default:
          break
    }
    return state;
  };
  
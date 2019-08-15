import * as constants from './constants'

const defaultState = {
    userInfo: null,
    topicDetails: null,
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case constants.SET_USER_INFO: {
            let newState = JSON.parse(JSON.stringify(state))
            newState.userInfo = action.userInfo
            return newState
        }
      case constants.SET_TOPIC_DETAILS: {
          let newState = JSON.parse(JSON.stringify(state))
          newState.topicDetails = action.topicDetails
          return newState
      }
      default:
          break
    }
    return state;
  };
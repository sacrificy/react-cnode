import * as constants from './constants'

const defaultState = {
    authorInfo: null,
    topicDetails: null,
    isCollect: false,
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case constants.SET_USER_INFO: {
            let newState = JSON.parse(JSON.stringify(state))
            newState.authorInfo = action.authorInfo
            return newState
        }
      case constants.SET_TOPIC_DETAILS: {
          let newState = JSON.parse(JSON.stringify(state))
          newState.topicDetails = action.topicDetails
          return newState
      }
      case constants.SET_COLLECT: {
        let newState = JSON.parse(JSON.stringify(state))
        newState.isCollect = action.isCollect
        return newState
      }
      default:
          break
    }
    return state;
  };
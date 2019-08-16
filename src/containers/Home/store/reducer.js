import * as constants from './constants'

const defaultState = {
    data: null,
    curPage: 1,
    curTab: 'all'
}

export default (state = defaultState, action) => {
    switch (action.type) {
      
      case constants.SET_TOPIC_LIST: {
        let newState = JSON.parse(JSON.stringify(state))
        newState.data = action.topics
        return newState
      }
      case constants.CHANGE_CUR_TAB: {
        let newState = JSON.parse(JSON.stringify(state))
        newState.curTab = action.payload
        return newState
      }
      case constants.CHANGE_CUR_PAGE: {
        let newState = JSON.parse(JSON.stringify(state))
        newState.curPage = action.payload
        return newState
      }
      default:
          break
    }
    return state;
  };
  
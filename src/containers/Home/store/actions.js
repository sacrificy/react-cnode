import {
  request as req,
} from '../../../utils';
import * as constants from './constants';

export const setTopicList = info => {
  return {
    type: constants.SET_TOPIC_LIST,
    topics: info
  }
}

export const getTopicList = (page, tab, limit, mdrender) => dispatch => {
  return req.get('/topics', {
    params: {
      page: page,
      tab: tab,
      limit: limit,
      mdrender: mdrender
    }
  }).then(response => {
    const { data } = response
    return dispatch(setTopicList(data.data))
  })
}

export const changeCurPage = newPage => ({
  type: constants.CHANGE_CUR_PAGE,
  payload: newPage,
});
export const changeCurTab = tab => ({
  type: constants.CHANGE_CUR_TAB,
  payload: tab,
});


import {
    request as req,
  } from '../../../utils';
  import * as constants from './constants';
  
  export const setUserInfo = info => ({
    type: constants.SET_USER_INFO,
    userInfo: info,
  });

  export const getUserInfo =  username => (dispatch) => {
    return req.get(`/user/${username.name}`).then(response=>{
        const {data} = response
        dispatch(setUserInfo(data.data))
    })
  }
 
  export const setTopicList = info => {
      return {
        type: constants.SET_TOPIC_LIST,
        topics: info
    }
  }

  export const getTopicList = (page,tab,limit,mdrender) => dispatch =>{
      return req.get('/topics',{
          params:{
            page:page,
            tab:tab,
            limit:limit,
            mdrender:mdrender
          }
      }).then(response=>{
        const {data} = response
        return dispatch(setTopicList(data.data))
      })
  }
  
  
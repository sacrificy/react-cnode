import {
	request as req,
} from '../../../utils';
import * as constants from './constants';

export const setTopicDetails = info => ({
	type: constants.SET_TOPIC_DETAILS,
	topicDetails: info,
});

export const getTopicDetails = topicId => (dispatch) => {
	return req.get(`/topic/${topicId}`).then(response => {
		const { data } = response
		dispatch(setTopicDetails(data.data))
	})
}

export const setUserInfo = info => ({
	type: constants.SET_USER_INFO,
	authorInfo: info,
});

export const getUserInfo = username => (dispatch) => {
	return req.get(`/user/${username}`).then(response => {
		const { data } = response
		dispatch(setUserInfo(data.data))
	})
}

export const judgeCollect = (loginname,topicId) => (dispatch)=>{
	return req.get(`/topic_collect/${loginname}`).then(response => {
		const {data} = response
		const colList = data.data
		let isCollect = false
		colList.forEach(element => {
			if(element.id === topicId){
				isCollect = true
			} 
		});
		return dispatch(setCollect(isCollect))
	}) 
}

export const setCollect = isCollect => ({
	type: constants.SET_COLLECT,
	isCollect: isCollect
})

export const changeCollect = (token,topic,collect) => dispatch =>{
	if(collect){
		req.post(`/topic_collect/collect`,{
			accesstoken : token,
			topic_id : topic,
		}).then(()=>dispatch(setCollect(true)))
	}else {
		req.post(`/topic_collect/de_collect`,{
			accesstoken : token,
			topic_id : topic,
		}).then(()=>dispatch(setCollect(false)))
	}
}
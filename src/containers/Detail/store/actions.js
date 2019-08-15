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
	userInfo: info,
});

export const getUserInfo = username => (dispatch) => {
	return req.get(`/user/${username}`).then(response => {
		const { data } = response
		dispatch(setUserInfo(data.data))
	})
}

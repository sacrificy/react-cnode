import React from 'react'
import { Tabs, Card, Input, Button, List, Avatar, Icon } from 'antd'
import './index.css'
import {actions} from './store'
import {connect} from 'react-redux'
import UserPanel from '../../components/UserPanel'

let hasJudged = false

class Detail extends React.Component {

	componentDidMount(){
		const topicId = this.props.match.params.id
		this.props.getTopicDetails(topicId)
	}

	render() {
		const {data,author,user,token,isCollect,judgeCollect,getAuthorInfo,changeCollect} = this.props
		if (!author && data) getAuthorInfo(data.author.loginname)

		if (user && data && !hasJudged) {
			judgeCollect(user.name,data.id)
			hasJudged = true
		}

		const now = new Date().getTime()
		const CreateTime = ( now, create ) => {
			const differ = (now-create)/1000
			if(differ<60){
				return('刚刚')
			}else if(differ<3600){
				return(`发布于${parseInt(differ/60)}分钟前`)
			}else if(differ<86400){
				return(`发布于${parseInt(differ/60/60)}小时前`)
			}else if(differ<(86400*30)){
				return(`发布于${parseInt(differ/60/60/24)}天前`)
			}else if(differ<(86400*30*12)){
				return(`发布于${parseInt(differ/60/60/24/30)}个月前`)
			}else {
				return(`发布于${parseInt(differ/60/60/24/30/12)}年前`)
			}
		};
		return (
			<div>
				<UserPanel author={author} title={'作者'} />
				<Card className='left_card' bordered={false}>
					{
						data ? (
							<div>
								<span>
									{ data.top && <span style={{backgroundColor:'red'}}>{ '置顶'}</span> }
									<span style={{fontWeight:700,fontSize:22}}>{data.title}</span>
								</span> 
								<div style={{paddingBottom:20}}>
									<ul className='info_list'>
										<li>{CreateTime(now,new Date(data.create_at).getTime())}</li>
										<li>作者{data.author.loginname}</li>
										<li>{data.visit_count}次浏览</li>
									</ul>
									{(isCollect
										?<Button style={{float:"right"}} onClick={()=>changeCollect(token,data.id,false)}>取消收藏</Button>
										:<Button style={{float:"right"}} onClick={()=>changeCollect(token,data.id,true)}>收藏</Button>
									)}
									
								</div>
								<hr/>
								<div dangerouslySetInnerHTML={{__html: data.content}}>
								</div>
							</div>
						) : <Icon type="loading" />
					}
				</Card>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	isCollect: state.detail.isCollect,
	data: state.detail.topicDetails,
	author: state.detail.authorInfo,
	user: state.login.user,
	token: state.login.token
})

const mapDispatchToProps = dispatch => ({
	getTopicDetails: (topicId) => dispatch(actions.getTopicDetails(topicId)),
	getAuthorInfo: (userName) => dispatch(actions.getUserInfo(userName)),
	judgeCollect: (loginname,topicId) => dispatch(actions.judgeCollect(loginname,topicId)),
	changeCollect: (token, topicId, collect) => dispatch(actions.changeCollect(token,topicId,collect))
})
export default connect(mapStateToProps,mapDispatchToProps)(Detail) 
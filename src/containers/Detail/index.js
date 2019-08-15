import React from 'react'
import { Tabs, Card, Input, Button, List, Avatar, Icon } from 'antd'
import './index.css'
import {actions} from './store'
import {connect} from 'react-redux'

class Detail extends React.Component {

	componentDidMount(){
		const topicId = this.props.match.params.id
		this.props.getTopicDetails(topicId)
	}

	render() {
		const {data,user} = this.props
		if (!user && data) this.props.getUserInfo(data.author.loginname)
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
				<Card className='right_card' title="作者" bordered={false} style={{ width: 290, float: "right" }}>
					{
						user && (
							<div>
								<span style={{ marginRight: '5px' }}>
									<Avatar src={user.avatar_url} />
								</span>
								{user.githubUsername}
								<br />
								{'积分：' + user.score}
							</div>
						)
					}
				</Card>
				<Card className='left_card' bordered={false} style={{ width: 1095, float: "left" }}>
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
									<Button style={{float:"right"}}>收藏</Button>
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
	data: state.detail.topicDetails,
	user: state.detail.userInfo,
})

const mapDispatchToProps = dispatch => ({
	getTopicDetails: (topicId) => dispatch(actions.getTopicDetails(topicId)),
	getUserInfo: (userName) => dispatch(actions.getUserInfo(userName))
})
export default connect(mapStateToProps,mapDispatchToProps)(Detail) 
import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import 'antd/dist/antd.css'
import { Card, Avatar } from 'antd'

class UserPanel extends React.Component{

	render(){
		const {author, title} = this.props
		return (
			<Card className='right_card' title={title} bordered={false} style={{ width: 290, float: "right" }}>
				{
					author && (
						<div>
							<span style={{ marginRight: '5px' }}>
								<Avatar src={author.avatar_url} />
							</span>
							{author.loginname}
							<br />
							{'积分：' + author.score}
						</div>
					)
				}
			</Card>
		)
	}
}

export default UserPanel
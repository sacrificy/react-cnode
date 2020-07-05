import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import 'antd/dist/antd.css'
import { Avatar,Icon,List } from 'antd'

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 4 }} />
	asdasdasd
	askdasjdlakjsdlaksdjaalakjd
	啊实打实的咯技术的回家
	asdaskdjhaksjd
    {text}
  </span>
);

class TopicList extends React.Component {

	render() {
		const { data } = this.props
		return (
			<List
				itemLayout="horizontal"
				dataSource={data}
				renderItem={item => (
					<List.Item>
						<List.Item.Meta
							avatar={<Avatar src={item.author.avatar_url} />}
							title={<Link to={`/topic/${item.id}`}>{item.title}</Link>}
						/>
						<div>
							<IconText type="edit-o" text={item.reply_count} key="list-vertical-edit-o" />
							<IconText type="fire-o" text={item.visit_count} key="list-vertical-fire-o" />
						</div>
					</List.Item>
				)}
			/>
		)
	}
}

export default TopicList
import React from 'react'
import { Tabs, Card, Input, Button, List, Avatar, Icon } from 'antd'
import './index.css'
import {actions} from './store'
import {connect} from 'react-redux'

class Collect extends React.Component {

	render() {
    if (!userInfo && user) getUserInfo(user)
		return(
      <UserPanel author={userInfo} title={'个人信息'}/>
        <Card className='left_card' bordered={false}>
          {tabs.map(item => {
            return item.value === curTab ?
              <Tag color="#87d068" key={item.value} onClick={() => hendleClickTab(item.value)}>{item.label}</Tag> :
              <Tag color="green" key={item.value} onClick={() => hendleClickTab(item.value)}>{item.label}</Tag>
          })}
          {data ? <TopicList data={data} /> : <Icon type="loading" />}
          <Pagination defaultCurrent={1} current={curPage} total={250}
            onChange={
              (page) => {
                getTopicList(page, curTab, 15, false)
                changeCurPage(page)
              }}
          />
        </Card>
    )
	}
}

const mapStateToProps = state => ({
	user: state.login.user
})

const mapDispatchToProps = dispatch => ({
	// getUserInfo: dispatch( userName => )
})
export default connect(mapStateToProps,mapDispatchToProps)(Collect) 
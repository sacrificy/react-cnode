import React from 'react'
import { Card, List, Avatar, Icon, Tag, Pagination, Button } from 'antd'
import "./style.css"
import { connect } from 'react-redux';
import { getTopicList,changeCurPage,changeCurTab } from './store/actions';
import { getUserInfo } from '../Login/store/actions'
import UserPanel from '../../components/UserPanel'
import TopicList from '../../components/TopicList'

class Home extends React.Component {

  componentWillMount() {
    const { getTopicList } = this.props
    getTopicList(1, null, 15, false)
  }

  render() {
    const { home, login, getUserInfo, getTopicList, changeCurTab, changeCurPage } = this.props
    const { data, curPage, curTab } = home
    const { user } = login
    const tabs = [
      {
        label: '全部',
        value: 'all',
      },
      {
        label: '精华',
        value: 'good',
      },
      {
        label: '分享',
        value: 'share',
      },
      {
        label: '问答',
        value: 'ask',
      },
      {
        label: '招聘',
        value: 'job',
      }
    ]
    const hendleClickTab = (tag) => {
      changeCurTab(tag)
      getTopicList(1, tag, 15, false)
      changeCurPage(1)
    }
    // if (!user && userName) getUserInfo(userName)
    return (
      <div>
        <UserPanel author={user} title={'个人信息'}/>
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
      </div>
    )
  }
}

const mapStateToProps = state => ({
  home: state.home,
  login: state.login,
});

const mapDispatchToProps = dispatch => ({
  getTopicList: (page, tab, limit, mdrender) => {
    dispatch( getTopicList(page, tab, limit, mdrender));
  },
  getUserInfo: (userName) => {
    dispatch( getUserInfo(userName))
  },
  changeCurPage: (page) => {
    dispatch( changeCurPage(page))
  },
  changeCurTab: (tab) => {
    dispatch( changeCurTab(tab))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)
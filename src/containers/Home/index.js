import React from 'react'
import { Card, List, Avatar, Icon, Tag, Pagination, Button } from 'antd'
import "./style.css"
import { connect } from 'react-redux';
import { actions } from './store';
import { Link } from 'react-router-dom'
import UserPanel from '../../components/UserPanel'
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 4 }} />
    {text}
  </span>
);

class Home extends React.Component {

  componentWillMount() {
    const { getTopicList } = this.props
    getTopicList(1, null, 15, false)
  }

  render() {
    const { home, userName, getUserInfo, getTopicList, changeCurTab, changeCurPage } = this.props
    const { userInfo: user, data, curPage, curTab } = home
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
    if (!user && userName) getUserInfo(userName)
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
  userName: state.login.user,
});

const mapDispatchToProps = dispatch => ({
  getTopicList: (page, tab, limit, mdrender) => {
    dispatch(actions.getTopicList(page, tab, limit, mdrender));
  },
  getUserInfo: (userName) => {
    dispatch(actions.getUserInfo(userName))
  },
  changeCurPage: (page) => {
    dispatch(actions.changeCurPage(page))
  },
  changeCurTab: (tab) => {
    dispatch(actions.changeCurTab(tab))
  }
});


function TopicList(props) {
  const data = props.data
  return (<List
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
  />)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
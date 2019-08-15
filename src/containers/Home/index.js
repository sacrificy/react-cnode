import React from 'react'
import { Tabs, Card, Input, Button, List, Avatar, Icon } from 'antd'
import "./style.css"
import { connect } from 'react-redux';
import { actions } from './store';
import { Link, Router, Route } from 'react-router-dom'
const { TabPane } = Tabs
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 4 }} />
    {text}
  </span>
);

class Home extends React.Component {

  componentWillMount() {
    const { getTopicList } = this.props
    getTopicList(1, null, 50, false)
  }

  render() {
    const { user, userName, getUserInfo } = this.props
    const tabs = ['全部','精华','分享']
    if (!user && userName) getUserInfo(userName)
    return (
      <div className="main">
        <Card title="个人信息" bordered={false} style={{ width: 290, float: "right" }}>
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

        <Card bordered={false} style={{ width: 1095, float: "left" }}>
          <Tabs type="card">
            {tabs.map((item)=>{return(
              <TabPane tab={item} key={item}>
              {
                this.props.data ? (
                  <List
                    itemLayout="horizontal"
                    dataSource={this.props.data}
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
                ) : <Icon type="loading" />
              }

            </TabPane>
            )}
            )}
          </Tabs>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  allTopic: state.home.data,
  userName: state.login.user,
  user: state.home.userInfo
});

const mapDispatchToProps = dispatch => ({
  getTopicList: (page, tab, limit, mdrender) => {
    dispatch(actions.getTopicList(page, tab, limit, mdrender));
  },
  getUserInfo: (userName) => {
    dispatch(actions.getUserInfo(userName))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)
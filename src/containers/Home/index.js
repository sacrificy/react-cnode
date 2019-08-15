import React from 'react'
import { Tabs, Card, Input, Button, List, Avatar, Icon } from 'antd'
import "./style.css"
import { connect } from 'react-redux';
import { actions } from './store';
const { TabPane } = Tabs
const data = [
  {
    author: { loginname: "atian25", avatar_url: "https://avatars2.githubusercontent.com/u/227713?v=4&s=120" },
    create_at: "2019-04-24T03:36:12.582Z",
    title: "Node 12 值得关注的新特性",
    reply_count: 55,
    visit_count: 112187

  }
];

const user = {
  loginname: "alsotang",
  avatar_url: "https://avatars1.githubusercontent.com/u/1147375?v=4&s=120",
  score: 15565,
}

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 4 }} />
    {text}
  </span>
);

class Home extends React.Component {

  componentWillMount() {
    const { getTopicList, getUserInfo, userName } = this.props
    getTopicList(1, 'ask', 50, false)
  }

  render() {
    const { user, userName, getUserInfo } = this.props
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
            <TabPane tab="全部" key="1">
              {
                this.props.data ? (
                  <List
                    itemLayout="horizontal"
                    dataSource={this.props.data}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar src={item.author.avatar_url} />}
                          title={<a href="https://ant.design">{item.title}</a>}
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
            <TabPane tab="精华" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="分享" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.home.data,
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
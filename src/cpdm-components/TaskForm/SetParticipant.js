import React from 'react';
import {
  HomeOutlined,
  PlusOutlined,
  SaveOutlined,
  StopOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Card, Tree, Skeleton, Input, List, Tag, Row, Col, Tooltip, Radio } from 'antd';
import { uuid } from '@cpdm/util';
import style from './index.less';

class SetParticipantPanel extends React.Component {
  componentDidMount() {}

  renderScope = data =>
    data.map(item => {
      const props = { title: item.name, key: item.id, dataRef: item, icon: <HomeOutlined /> };
      if (item.sub && item.sub.length) {
        return <Tree.TreeNode {...props}>{this.renderScope(item.sub)}</Tree.TreeNode>;
      }
      return <Tree.TreeNode {...props} />;
    });

  render() {
    const { loading } = this.props;
    const scope = [
      { id: 0, name: `工作单位${uuid()}` },
      { id: 1, name: `工作单位${uuid()}` },
      {
        id: 2,
        name: `工作单位${uuid()}`,
        sub: [
          {
            id: 3,
            name: `工作单位${uuid()}`,
            sub: [
              {
                id: 3,
                name: `工作单位${uuid()}`,
                sub: [
                  {
                    id: 3,
                    name: `工作单位${uuid()}`,
                    sub: [
                      { id: 3, name: `工作单位${uuid()}` },
                      { id: 4, name: `工作单位${uuid()}` },
                      { id: 5, name: `工作单位${uuid()}` },
                    ],
                  },
                  { id: 4, name: `工作单位${uuid()}` },
                  { id: 5, name: `工作单位${uuid()}` },
                ],
              },
              { id: 4, name: `工作单位${uuid()}` },
              { id: 5, name: `工作单位${uuid()}` },
            ],
          },
          { id: 4, name: `工作单位${uuid()}` },
          { id: 5, name: `工作单位${uuid()}` },
        ],
      },
    ];
    const users = [
      { id: 1, name: '某用户, 某单位的, 协同接口用户' },
      { id: 2, name: '某用户, 某单位的' },
      { id: 5, name: '某用户, 某单位的' },
      { id: 3, name: '某用户, 某单位的, 签审代理人' },
      { id: 6, name: '某用户, 某单位的' },
      { id: 4, name: '某用户, 某单位的' },
      { id: 16, name: '某用户, 某单位的' },
      { id: 34, name: '某用户, 某单位的' },
      { id: 26, name: '某用户, 某单位的' },
      { id: 44, name: '某用户, 某单位的' },
      { id: 36, name: '某用户, 某单位的' },
      { id: 54, name: '某用户, 某单位的' },
    ];

    const roles = [
      { id: uuid(), name: '校对' },
      { id: uuid(), name: '审核' },
      { id: uuid(), name: '标审' },
      { id: uuid(), name: '工艺' },
      { id: uuid(), name: '会签' },
      { id: uuid(), name: '批准' },
    ];

    const members = [
      { id: uuid(), name: '某用户，某单位的' },
      { id: uuid(), name: '某用户，某单位的' },
      { id: uuid(), name: '某用户，某单位的' },
      { id: uuid(), name: '某用户，某单位的' },
      { id: uuid(), name: '某用户，某单位的' },
      { id: uuid(), name: '某用户，某单位的' },
      { id: uuid(), name: '某用户，某单位的' },
      { id: uuid(), name: '某用户，某单位的' },
    ];
    return (
      <Skeleton loading={loading}>
        <div className={style['set-participant-panel']}>
          <Card
            type="inner"
            bordered={false}
            title={<strong>设置参与者</strong>}
            extra={
              <div>
                <Radio.Group size="small">
                  <Radio.Button>本单位用户</Radio.Button>
                  <Radio.Button>协同单位用户</Radio.Button>
                </Radio.Group>
                <div className={style.search}>
                  <Input.Search size="small" placeholder="关键字" />
                </div>
                <Tooltip key="0" title="使用我的常用设置">
                  <a className={style.a}>
                    <TeamOutlined />
                  </a>
                </Tooltip>
                <Tooltip key="1" title="保存到我的常用设置">
                  <a className={style.a}>
                    <SaveOutlined />
                  </a>
                </Tooltip>
                <Tooltip key="2" title="重置">
                  <a className={style.a}>
                    <StopOutlined />
                  </a>
                </Tooltip>
              </div>
            }
          >
            <Row>
              <Col span={6}>
                <Card bordered={false} className={style.sider}>
                  <div className={style.overflow}>
                    <Tree showIcon>{this.renderScope(scope)}</Tree>
                  </div>
                </Card>
              </Col>
              <Col span={6}>
                <Card bordered={false} className={style.sider}>
                  <div className={style.overflow}>
                    <List
                      size="small"
                      dataSource={users}
                      renderItem={item => (
                        <List.Item key={item.id} className={style.userBox}>
                          <div className={style.user}>{item.name}</div>
                        </List.Item>
                      )}
                    />
                  </div>
                </Card>
              </Col>
              <Col span={12}>
                <Card bordered={false}>
                  <div className={style.overflow}>
                    <List
                      size="small"
                      dataSource={roles}
                      renderItem={item => (
                        <List.Item key={item.id} className={style.roleBox}>
                          <List.Item.Meta
                            avatar={
                              <div>
                                <PlusOutlined />
                              </div>
                            }
                            title={<span className={style.roleName}>{item.name}</span>}
                            description={members.map(m => (
                              <Tag closable color="blue" className={style.tag} key={m.id}>
                                {m.name}
                              </Tag>
                            ))}
                          />
                        </List.Item>
                      )}
                    />
                  </div>
                </Card>
              </Col>
            </Row>
          </Card>
        </div>
      </Skeleton>
    );
  }
}

export default SetParticipantPanel;

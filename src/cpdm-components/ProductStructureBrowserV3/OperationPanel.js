import React, { PureComponent } from 'react';
import { Space, Card, Button, Row, Col, Dropdown, Menu } from 'antd';
import { PoweroffOutlined, DownOutlined } from '@ant-design/icons';

export default class ProductStructureOperation extends PureComponent {
  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
            1st menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
            2nd menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
            3rd menu item
          </a>
        </Menu.Item>
        <Menu.Item danger>a danger item</Menu.Item>
      </Menu>
    );
    return (
      <>
        <Space>
          <Card
            className="noPaddingCard"
            title="编辑"
            size="small"
            type="inner"
            style={{ height: 100, minWidth: 180, maxWidth: 200 }}
          >
            <Row>
              <Col span={12}>
                <Button type="link" icon={<PoweroffOutlined />}>
                  插入现有的
                </Button>
              </Col>
              <Col span={12}>
                <Button type="link" icon={<PoweroffOutlined />}>
                  移除
                </Button>
              </Col>
              <Col span={12}>
                <Space>
                  <PoweroffOutlined />
                  <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                      插入新的 <DownOutlined />
                    </a>
                  </Dropdown>
                </Space>
              </Col>
              <Col span={12}>
                <Button type="link" icon={<PoweroffOutlined />}>
                  编辑
                </Button>
              </Col>
            </Row>
          </Card>
          <Card
            className="noPaddingCard"
            title="协同"
            size="small"
            type="inner"
            style={{ height: 100, minWidth: 180, maxWidth: 200 }}
          >
            <Row>
              <Col span={12}>
                <Button type="link" icon={<PoweroffOutlined />}>
                  插入新的
                </Button>
              </Col>
              <Col span={12}>
                <Button type="link" icon={<PoweroffOutlined />}>
                  插入新的
                </Button>
              </Col>
              <Col span={12}>
                <Button type="link" icon={<PoweroffOutlined />}>
                  插入新的
                </Button>
              </Col>
              <Col span={12}>
                <Button type="link" icon={<PoweroffOutlined />}>
                  插入新的
                </Button>
              </Col>
            </Row>
          </Card>
        </Space>
      </>
    );
  }
}

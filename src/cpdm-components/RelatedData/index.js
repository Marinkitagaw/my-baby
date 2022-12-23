import React, { PureComponent } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Table, Card, Radio, Button, Popconfirm } from 'antd';
import {
  versionObjectType,
  relatedDataNoVersionColumns,
  relatedDataVersionColumns,
} from '@/utils/PublicVariabale';
import tableStyles from '@/styles/table_list.less';
import styles from './index.less';

class RelatedDataTable extends PureComponent {
  constructor(props) {
    super(props);
    const { dataSource = [] } = this.props;
    this.state = {
      selectedRowKeys: [],
      selectedRows: [],
      cardType: {},
      initDataSource: dataSource.length && dataSource[0].data,
    };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps = nextProps => {
    const {
      cardType: { title },
    } = this.state;
    if (title) {
      const cardObject = nextProps.dataSource.find(item => item.title === title);
      this.setState({
        initDataSource: cardObject.data,
        cardType: cardObject,
      });
    } else {
      this.setState({
        initDataSource: nextProps.dataSource[0].data,
        cardType: nextProps.dataSource[0],
      });
    }
  };

  // get 加载数据类型
  handleChangeSalesType = e => {
    const { cardType } = this.state;
    const { callbackRelatedType } = this.props;
    this.setState(
      {
        cardType: e.target.value,
        initDataSource: e.target.value.data,
      },
      () => {
        callbackRelatedType(cardType);
      }
    );
  };

  handleRowSelectChange = selectedRowKeys => {
    this.setState({
      selectedRowKeys,
    });
  };

  // 移除相关数据
  handleDeleteData = () => {
    const { deleteRelated } = this.props;
    deleteRelated(this.state);
    this.setState({
      selectedRowKeys: [],
    });
  };

  handleAddData = () => {
    const { addRelated } = this.props;
    addRelated(this.state);
  };

  render() {
    const { dataSource = [], deleteLoading, dataLoading } = this.props;
    const { initDataSource = [], cardType, selectedRowKeys = [] } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
    };
    const getColumns = type => {
      if (!versionObjectType.includes(type)) {
        return relatedDataNoVersionColumns();
      }
      return relatedDataVersionColumns();
    };
    return (
      <div className={styles.cardTable}>
        <Card
          className={styles.salesCard}
          bordered={false}
          bodyStyle={{ padding: 24 }}
          title={dataSource.length === 1 ? dataSource[0].display : ''}
          extra={
            <div>
              <a
                style={{ display: initDataSource.length > 4 ? 'inline-block' : 'none' }}
                className={styles.info}
                onClick={this.handleAddData}
              >
                [插入]
              </a>
              <span
                className={styles.iconGroup}
                style={{ display: selectedRowKeys.length ? 'inline-block' : 'none', marginLeft: 4 }}
              >
                <Popconfirm
                  placement="bottomRight"
                  title="确定要移除选中数据吗?"
                  onConfirm={this.handleDeleteData}
                  okText="确定"
                  cancelText="取消"
                >
                  <a className={styles.error}>[移除]</a>
                </Popconfirm>
              </span>
              {dataSource.length > 1 ? (
                <div className={styles.salesTypeRadio}>
                  <Radio.Group value={cardType} onChange={this.handleChangeSalesType}>
                    {dataSource.map(item => (
                      <Radio.Button value={item} key={item.display}>
                        {item.display}
                      </Radio.Button>
                    ))}
                  </Radio.Group>
                </div>
              ) : (
                ''
              )}
            </div>
          }
          style={{ height: 380 }}
        >
          <Table
            className={tableStyles.tableEllipsis}
            style={{ display: dataSource.length === 0 ? 'none' : 'block' }}
            rowKey={record => record.linkId}
            size="middle"
            loading={dataLoading || deleteLoading}
            rowSelection={rowSelection}
            dataSource={initDataSource}
            columns={getColumns(dataSource[0].key)}
            pagination={false}
            scroll={{ y: 230 }}
          />
          <Button
            type="dashed"
            onClick={this.handleAddData}
            style={{
              width: '100%',
              marginTop: 8,
              display: initDataSource.length > 4 ? 'none' : 'block',
            }}
            icon={<PlusOutlined />}
          >
            添加
          </Button>
          <Button
            type="dashed"
            style={{
              width: '100%',
              marginTop: 8,
              height: 200,
              display: dataSource.length === 0 ? 'block' : 'none',
            }}
            icon={<PlusOutlined />}
            onClick={this.handleAddData}
          >
            添加
          </Button>
        </Card>
      </div>
    );
  }
}
export default RelatedDataTable;

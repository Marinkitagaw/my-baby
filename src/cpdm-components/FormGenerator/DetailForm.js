import React, { useEffect, useState, Fragment, useCallback } from 'react';
import { Spin, Space, Descriptions, Alert } from 'antd';
import getAttributeMeta from '@/form/utils/getAttributeMeta';
import getInitialValues from '@/form/utils/getInfoInitialValues';
import { doRegister } from '@/form/utils/fieldComponentRegister';
import calculate from '@/form/utils/calculateInfoJsonSchema';
import { Fieldset, LinkedStateTags } from '@cpdm/components';
import { Content } from '@cpdm/components';
import ReviewRecords from '@/pages/Cmis/Document/Info/ReviewRecords'; // 流程签审记录
import ResourceInfo from '@/pages/Cmis/Document/Info/ResourceInfo';
import { FolderPath } from '@/cpdm-components/InfoItem';
import styles from './detail.less';

function Detail(props) {
  const [schema, setSchema] = useState();
  const [contents, setContent] = useState([]);
  const [initialValue, setinitialValue] = useState({});

  const { data = {}, getAttrUrl, page } = props;
  const CustromAttributes = () => {
    if (!data) return <></>;
    const { customAttributes } = data;
    if (!customAttributes) return <></>;
    const attrNames = Object.keys(customAttributes);
    return (
      <div className={styles['detail-description-table']}>
        <Fieldset legend="部件属性" style={{ marginTop: 8 }}>
          <Descriptions
            className={page === 'infoPop' && styles.infoPopDesc}
            size="small"
            bordered
            column={{ sm: 2, xs: 1 }}
          >
            {attrNames.map(a => (
              <Descriptions.Item label={a}>{customAttributes[a] || ''}</Descriptions.Item>
            ))}
          </Descriptions>
        </Fieldset>
      </div>
    );
  };

  const recalculate = useCallback((jsonSchema, values) => {
    const keys = Object.keys(values);
    const newContents = [];
    keys.map(initKey => {
      if (values[initKey] && typeof values[initKey] !== 'string') {
        jsonSchema.map(item => {
          if (item.origin && item.origin.length) {
            const currentItem = item.origin.filter(attr => attr.id === initKey);
            Object.assign(item, {
              origin: item.origin.filter(attr => attr.id !== initKey),
            });
            if (currentItem.length) {
              newContents.push({
                groupName: currentItem[0].groupName,
                origin: currentItem[0],
              });
              setContent([...newContents]);
            }
          }
          return item;
        });
      }
      return '';
    });
  }, []);

  useEffect(() => {
    let unmount = false;
    // 注册自定义组件
    doRegister();
    (async () => {
      let value = {};
      let jsonSchema = [];
      // 根据数据类型获取属性信息
      const attributeMeta = await getAttributeMeta(getAttrUrl);
      // 根据属性获取属性信息默认值
      if (attributeMeta && attributeMeta.length && data.id) {
        value = await getInitialValues(attributeMeta, data);
        await setinitialValue(value);
      }
      // 计算完整json schema
      jsonSchema = attributeMeta && attributeMeta.length && calculate(attributeMeta);

      if (!unmount) {
        setSchema(jsonSchema);
        recalculate(jsonSchema, value);
      }
    })();

    return () => {
      unmount = true;
    };
  }, []);

  const renderContents = attrId => {
    let con = '';
    if (attrId === 'primaryContent') {
      if (initialValue.primaryContent)
        con = (
          <Content value={initialValue.primaryContent} disabled preview contentRole="PRIMARY" />
        );
      else con = <Alert message="暂无数据" />;
    }
    if (attrId === 'secondaryContents') {
      if (initialValue.secondaryContents && initialValue.secondaryContents.length)
        con = (
          <Content
            value={initialValue.secondaryContents}
            disabled
            preview
            contentRole="SECONDARY"
          />
        );
      else con = <Alert message="暂无数据" />;
    }
    if (attrId === 'printContent') {
      if (initialValue.printContent)
        con = <Content value={initialValue.printContent} disabled preview contentRole="PRINT" />;
      else con = <Alert message="暂无数据" />;
    }
    return con;
  };

  const renderValue = (attrIdentificate, initData) => {
    let value = initData[attrIdentificate];
    if (attrIdentificate === 'stateId') {
      const { lifecycleStates, lifecycleStateIdentifier } = initData;
      value = (
        <LinkedStateTags
          states={(lifecycleStates || []).map(s => ({
            key: s.identifier,
            title: s.name,
          }))}
          color="info"
          value={lifecycleStateIdentifier}
        />
      );
    }
    if (attrIdentificate === 'folderId') {
      value = <FolderPath repository={data.repository} folder={data.folder} />;
    }
    return value;
  };

  return (
    <Fragment>
      {schema ? (
        <>
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            {schema.map((item = {}) => {
              if (!item.origin || !item.origin.length || item.origin.length === 0) return null;
              return (
                <div className={styles['detail-description-table']}>
                  <Fieldset legend={item.groupName}>
                    <Descriptions
                      className={page === 'infoPop' && styles.infoPopDesc}
                      size="small"
                      bordered
                      column={{ sm: 2, xs: 1 }}
                    >
                      {item.origin.map(attr => {
                        return (
                          <Descriptions.Item
                            label={attr.displayIdentifier}
                            span={attr.id === 'stateId' && 2}
                          >
                            {typeof initialValue[attr.id] === 'string' &&
                              renderValue(attr.id, initialValue)}
                          </Descriptions.Item>
                        );
                      })}
                    </Descriptions>
                  </Fieldset>
                </div>
              );
            })}
            {(contents || []).map(item => {
              return <Fieldset legend={item.groupName}>{renderContents(item.origin.id)}</Fieldset>;
            })}
          </Space>
          {data.objectType === 'com.casic.cpdm.part.entity.DesignPart' && (
            <CustromAttributes data={data.customAttributes} />
          )}
          <Fieldset style={{ marginTop: 8 }} legend="签审记录">
            <ReviewRecords data={data} />
          </Fieldset>

          {data.objectType === 'com.casic.cpdm.part.entity.DesignPart' && (
            <div style={{ marginTop: 8 }} className={styles['detail-description-table']}>
              <Fieldset legend="物料编码">
                <ResourceInfo data={data} />
              </Fieldset>
            </div>
          )}
        </>
      ) : (
        <Spin spinning={!schema}>加载中...</Spin>
      )}
    </Fragment>
  );
}

export default Detail;

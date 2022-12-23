import React, { useEffect, useState, Fragment, useCallback } from 'react';
import { Spin } from 'antd';
import { SchemaForm, createFormActions } from '@formily/antd';
import { doRegister } from '@/form/utils/fieldComponentRegister';
import { SearchOutlined } from '@ant-design/icons';
import styles from './index.less';

const actions = createFormActions();

function Test(props) {
  const [schema, setSchema] = useState();

  const { attributeSet, onChange, actionButtons, filtersGrid, formValues } = props;

  const onSearch = useCallback(() => {
    actions.getFormState(state => {
      actions
        .validate()
        .catch()
        .then(() => {
          onChange(state.values);
          // formValues(state.values);
        });
    });
  }, [formValues, onChange]);

  const onReset = useCallback(() => {
    actions.reset();
    onChange({});
  }, [onChange]);

  const CalculateAttribute = useCallback(attrs => {
    const obj = {};
    attrs.map(item => {
      obj[item.id] = {
        key: item.id,
        name: item.id,
        title: item.displayIdentifier,
        'x-component': item.enumerable ? 'select' : item.componentType,
        enum:
          !!item.enumerable &&
          (item.enumerations || []).map(enu => ({
            label: enu.text || enu.display || enu.label,
            value: enu.value,
          })),
        'x-props': {
          itemClassName: styles.formilyComponent,
        },
        'x-component-props': {
          allowClear: true,
          key: item.id,
          ...item['x-component-props'],
        },
      };
      return false;
    });
    obj.buttonGroup = {
      key: 'buttonGroup',
      name: 'buttonGroup',
      'x-component': 'buttonGroup',
      'x-component-props': {
        buttons: [
          { title: '检索', type: 'primary', icon: <SearchOutlined />, handle: onSearch },
          { title: '重置', handle: onReset },
          ...actionButtons,
        ],
      },
    };
    return obj;
  }, []);

  useEffect(() => {
    let unmount = false;
    // 注册自定义组件
    doRegister();
    (async () => {
      // 根据数据类型获取属性信息
      const attributeMeta = [...attributeSet];

      // 计算完整json schema
      const jsonSchema = {
        type: 'object',
        properties: {
          basic: {
            key: 'basic',
            name: 'basic',
            type: 'object',
            'x-component': 'mega-layout',
            'x-component-props': {
              grid: 12,
              full: true,
              autoRow: true,
              responsive: filtersGrid || {
                lg: 6,
                m: 4,
                s: 2,
              },
            },
            properties: CalculateAttribute(attributeMeta),
          },
        },
      };

      if (!unmount) setSchema(jsonSchema || []);
    })();

    return () => {
      unmount = true;
    };
  }, [CalculateAttribute, attributeSet, filtersGrid]);

  return (
    <Fragment>
      {schema ? (
        <SchemaForm
          className={styles.listSchema}
          // wrapperCol={14}
          schema={schema}
          actions={actions}
        />
      ) : (
        <Spin spinning={!schema}>加载中...</Spin>
      )}
    </Fragment>
  );
}

export default Test;

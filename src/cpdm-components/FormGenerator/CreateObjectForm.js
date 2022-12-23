import { createEffects } from '@/form/effect';
import { doRegister } from '@/form/utils/fieldComponentRegister';
import { getCategoryJsonSchmea } from '@/services/common';
import { FormButtonGroup, Reset, SchemaForm, Submit } from '@formily/antd';
import { Spin } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { history } from 'umi';
import style from './index.less';

const jsonSchema = {
  type: 'object',
  properties: {
    基本属性: {
      key: '基本属性',
      type: 'object',
      'x-component': 'FieldsetLayout',
      'x-component-props': {
        title: '基本属性',
      },
      properties: {
        att_基本属性: {
          key: 'att_基本属性',
          type: 'object',
          name: 'att_基本属性',
          'x-component': 'mega-layout',
          'x-props': {
            style: { width: 600 },
          },
          'x-component-props': {
            labelAlign: 'left',
            grid: true,
            full: true,
            autoRow: true,
            responsive: {
              lg: 2,
              m: 2,
              s: 1,
            },
          },
          properties: {
            code: {
              key: 'code',
              name: '编号',
              title: '编号',
              'x-component': 'input',
            },
            name: {
              key: 'name',
              name: '名称',
              title: '名称',
              'x-component': 'input',
            },
          },
        },
      },
    },
    业务属性: {
      key: '业务属性',
      type: 'object',
      'x-component': 'FieldsetLayout',
      'x-component-props': {
        title: '业务属性',
      },
      properties: {
        att_业务属性: {
          key: 'att_业务属性',
          type: 'object',
          name: 'att_业务属性',
          'x-component': 'mega-layout',
          'x-component-props': {
            labelAlign: 'left',
            grid: true,
            full: true,
            autoRow: true,
            responsive: {
              lg: 2,
              m: 2,
              s: 1,
            },
          },
          properties: {
            secretLevel: {
              key: 'secretLevel',
              name: '密级',
              title: '密级',
              'x-component': 'input',
            },
            productLevel: {
              key: 'productLevel',
              name: '产品代号',
              title: '产品代号',
              'x-component': 'input',
            },
          },
        },
      },
    },
    分类属性: {
      key: '分类属性',
      type: 'object',
      'x-component': 'ClassificationAttrLayout',
      'x-component-props': {
        legend: '分类属性',
        categoryId: '626707437405261824',
      },
    },
  },
};

function Test(props) {
  const [schema, setSchema] = useState();

  const { params, onSubmit, children, hideSubmitButton, onCancel } = props;

  useEffect(() => {
    let unmount = false;
    // 注册自定义组件
    doRegister();
    (async () => {
      // 根据数据类型、页面类型获取表单
      const response = (await getCategoryJsonSchmea({ ...params, layout: 'create' })) || [];
      setSchema(jsonSchema);
      if (!response.error && !unmount) {
        setSchema(response);
      }
    })();

    return () => {
      unmount = true;
    };
  }, []);

  const onReset = () => {
    if (onCancel) {
      onCancel();
    } else {
      history.go(-1);
    }
  };

  return (
    <Fragment>
      {schema ? (
        <SchemaForm
          schema={schema}
          effects={createEffects()}
          onSubmit={value => onSubmit(value)}
          onReset={onReset}
          className={style.formilyArrayTable}
        >
          {!hideSubmitButton && (
            <FormButtonGroup offset={10}>
              <Submit>完成</Submit>
              <Reset>取消</Reset>
            </FormButtonGroup>
          )}
          {!!children && children}
        </SchemaForm>
      ) : (
        <Spin spinning={!schema}>加载中...</Spin>
      )}
    </Fragment>
  );
}

export default Test;

import { createEffects } from '@/form/effect';
import { getSchemaSnippet, SCREEN_TYPES } from '@/form/schemas';
import calculate from '@/form/utils/calculateJsonSchema';
import { doRegister } from '@/form/utils/fieldComponentRegister';
import getAttributeMeta from '@/form/utils/getAttributeMeta';
import getDefaultValues from '@/form/utils/getDefaultValues';
import { FormButtonGroup, Reset, SchemaForm, Submit } from '@formily/antd';
import { Spin } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { history } from 'umi';
import style from './index.less';

function Test(props) {
  const [schema, setSchema] = useState();
  const [defaultValue, setDefaultValue] = useState({});

  const {
    dataType,
    data = {},
    getAttrUrl,
    onSubmit,
    children,
    hideSubmitButton,
    onCancel,
    labelCol,
    wrapperCol,
    actions,
  } = props;
  const screenType = SCREEN_TYPES.CREATE;

  useEffect(() => {
    let unmount = false;
    // 注册自定义组件
    doRegister();
    (async () => {
      // 根据数据类型获取属性信息
      const attributeMeta = (await getAttributeMeta(getAttrUrl)) || [];
      // 根据属性获取属性信息默认值
      if (attributeMeta && attributeMeta.length) {
        const value = await getDefaultValues(attributeMeta, data);
        setDefaultValue(value);
      }
      // 根据数据类型和屏幕类型获取预定义好的schema片段
      const schemaSnippet = getSchemaSnippet(dataType, screenType);
      // 计算完整json schema
      const jsonSchema =
        attributeMeta && attributeMeta.length && calculate(attributeMeta, schemaSnippet);
      if (!unmount) setSchema(jsonSchema || []);
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
          labelCol={labelCol || 4}
          wrapperCol={wrapperCol || 12}
          defaultValue={defaultValue}
          schema={schema}
          actions={actions}
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

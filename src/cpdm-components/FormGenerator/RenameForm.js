import React, { useEffect, useState, Fragment } from 'react';
import { Spin } from 'antd';
import { SchemaForm, FormButtonGroup, Submit, Reset } from '@formily/antd';
import { SCREEN_TYPES, getSchemaSnippet } from '@/form/schemas';
import getAttributeMeta from '@/form/utils/getAttributeMeta';
import getDefaultValues from '@/form/utils/getDefaultValues';
import { createEffects } from '@/form/effect';
import { doRegister } from '@/form/utils/fieldComponentRegister';
import calculate from '@/form/utils/calculateJsonSchema';
import { history } from 'umi';
import style from './index.less';

function Test(props) {
  const [schema, setSchema] = useState();
  const [defaultValue, setDefaultValue] = useState({});

  const { dataType, data = {}, getAttrUrl, onSubmit, onCancel } = props;
  const screenType = SCREEN_TYPES.RENAME;

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

  return (
    <Fragment>
      {schema ? (
        <SchemaForm
          labelCol={5}
          wrapperCol={14}
          defaultValue={defaultValue}
          schema={schema}
          effects={createEffects()}
          onSubmit={value => onSubmit(value)}
          onReset={() => onCancel() || history.go(-1)}
          className={style.formilyArrayTable}
        >
          <FormButtonGroup offset={8}>
            <Submit>完成</Submit>
            <Reset>取消</Reset>
          </FormButtonGroup>
        </SchemaForm>
      ) : (
        <Spin spinning={!schema}>加载中...</Spin>
      )}
    </Fragment>
  );
}

export default Test;

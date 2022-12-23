import React, { useEffect, useState, Fragment } from 'react';
import { SchemaForm, FormButtonGroup, Submit, Reset } from '@formily/antd';
import { Spin } from 'antd';
import { SCREEN_TYPES, getSchemaSnippet } from '@/form/schemas';
import getAttributeMeta from '@/form/utils/getAttributeMeta';
import getEditInitialValues from '@/form/utils/getEditInitialValues';
import { editEffects } from '@/form/effect';
import { doRegister } from '@/form/utils/fieldComponentRegisterEdit';
import calculate from '@/form/utils/calculateJsonSchema';
import { history } from 'umi';
import style from './index.less';

function Test(props) {
  const [schema, setSchema] = useState();
  const [initialValues, setinitialValue] = useState({});

  const {
    dataType,
    data = {},
    getAttrUrl,
    onSubmit,
    labelCol,
    wrapperCol,
    actions,
    hideSubmitButton,
  } = props;
  const screenType = SCREEN_TYPES.UPDATE;
  useEffect(() => {
    let unmount = false;
    // 注册自定义组件
    doRegister();
    (async () => {
      // 根据数据类型获取属性信息
      const attributeMeta = await getAttributeMeta(getAttrUrl);
      // 根据属性获取属性信息默认值
      if (attributeMeta && attributeMeta.length && data.id) {
        const value = await getEditInitialValues(attributeMeta, data);
        setinitialValue(value);
      }
      // 根据数据类型和屏幕类型获取预定义好的schema片段
      const schemaSnippet = getSchemaSnippet(dataType, screenType);
      // 计算完整json schema
      const jsonSchema =
        attributeMeta && attributeMeta.length && calculate(attributeMeta, schemaSnippet);
      if (!unmount) setSchema(jsonSchema);
    })();

    return () => {
      unmount = true;
    };
  }, []);

  return (
    <Fragment>
      {schema ? (
        <SchemaForm
          labelCol={labelCol || 5}
          wrapperCol={wrapperCol || 14}
          initialValues={initialValues}
          schema={schema}
          actions={actions}
          effects={editEffects()}
          onSubmit={value => onSubmit(value)}
          onReset={() => history.go(-1)}
          className={style.formilyArrayTable}
        >
          {!hideSubmitButton && (
            <FormButtonGroup offset={10}>
              <Submit>完成</Submit>
              <Reset>取消</Reset>
            </FormButtonGroup>
          )}
        </SchemaForm>
      ) : (
        <Spin spinning={!schema}>加载中...</Spin>
      )}
    </Fragment>
  );
}

export default Test;

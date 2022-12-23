import { getCategoryClassificationSchmea } from '@/services/common';
import { Fieldset } from '@cpdm/components';
import { uuid } from '@cpdm/util';
import { SchemaForm } from '@formily/antd';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import ClassificationPanel from './ClassificationPanel';

const jsonSchema = {
  type: 'object',
  properties: {
    att_基本属性: {
      key: 'att_基本属性',
      type: 'object',
      name: 'att_基本属性',
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
};

const newJsonSchema = {
  type: 'object',
  properties: {
    att_基本属性: {
      key: 'att_基本属性',
      type: 'object',
      name: 'att_基本属性',
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
        secretLevel: {
          key: 'secretLevel',
          name: '密级',
          title: '密级',
          'x-component': 'SecretLevel',
        },
        productCode: {
          key: 'productCode',
          name: '产品',
          title: '产品',
          'x-component': 'repository',
        },
      },
    },
  },
};

export default ({ legend, categoryId }) => {
  const [visible, setVisible] = useState(false);
  const [schema, setSchema] = useState({});
  const [refreshKey, setRefreshKey] = useState();

  useEffect(() => {
    let unmount = false;
    (async () => {
      // 根据数据类型获取表单
      const response = (await getCategoryClassificationSchmea({ categoryId })) || [];
      setSchema(jsonSchema);
      if (!response.error && !unmount) {
        setSchema(response);
      }
    })();

    return () => {
      unmount = true;
    };
  }, [refreshKey]);

  return (
    <Fieldset
      legend={legend}
      extra={
        <Button onClick={() => setVisible(true)} size="small" type="primary">
          添加
        </Button>
      }
    >
      {/* <FormGenerator action="CREATE-OBJECT" {...reset} /> */}
      <SchemaForm schema={schema} />
      {visible && (
        <ClassificationPanel
          visible={visible}
          onCancel={() => setVisible(false)}
          categoryId={categoryId}
          onOk={() => {
            setRefreshKey(uuid());
            setVisible(false);
            setSchema(newJsonSchema);
          }}
        />
      )}
    </Fieldset>
  );
};

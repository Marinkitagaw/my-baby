/**
 * 通过属性元信息和schema片段合并计算完整json schema
 * @param {*} attributeMeta 属性元信息
 * @param {*} snippet  schema片段
 */

const renderProperties = (columns, isDetail) => {
  const obj = {};
  columns.map(item => {
    obj[item.id] = {
      type: item.type,
      title: item.displayIdentifier,
      id: item.id,
      key: item.id,
      'x-component': isDetail ? 'PreviewText' : item.componentType,
      readOnly: !!item.readOnly,
      required: !!item.required,
    };
    return false;
  });
  return obj;
};

const getChildren = (json, attributeMeta, isDetail) => {
  const keys = Object.keys(json);
  keys.forEach(key => {
    if (key.indexOf('_') !== -1 && key.indexOf('$') === -1) {
      const properties = {};
      key.split('_').forEach(function (item) {
        if (item) {
          const forcusAttr = attributeMeta.filter(attr => attr.id === item);
          const attrSnnipt = forcusAttr && forcusAttr.length && forcusAttr[0];
          let xComponentProps = {};
          let xComponent = '';
          let xProps = '';
          let x = {};
          if (json[key].properties && json[key].properties[item]) {
            x = json[key].properties[item];
          }
          if (
            json[key].properties &&
            json[key].properties[item] &&
            json[key].properties[item]['x-component-props'] &&
            Object.keys(json[key].properties[item]['x-component-props']).length > 0
          ) {
            xComponentProps = json[key].properties[item]['x-component-props'];
          }
          if (
            json[key].properties &&
            json[key].properties[item] &&
            json[key].properties[item]['x-component'] &&
            Object.keys(json[key].properties[item]['x-component']).length > 0
          ) {
            xComponent = json[key].properties[item]['x-component'];
          }
          if (
            json[key].properties &&
            json[key].properties[item] &&
            json[key].properties[item]['x-props']
          ) {
            xProps = json[key].properties[item]['x-props'];
          }

          properties[item] = {
            ...x,
            title: attrSnnipt.displayIdentifier,
            placeholder: !!isDetail && '',
            name: attrSnnipt.id,
            key: attrSnnipt.id,
            enum:
              !!attrSnnipt.enumerable &&
              (attrSnnipt.enumerations || []).map(enu => ({ label: enu.text, value: enu.value })),
            type: attrSnnipt.type,
            readOnly: !!attrSnnipt.readOnly,
            required: !isDetail && !!attrSnnipt.required,
            // eslint-disable-next-line no-nested-ternary
            'x-component': isDetail
              ? xComponent || 'PreviewValue'
              : attrSnnipt.enumerable
              ? attrSnnipt.selectionType
              : xComponent || attrSnnipt.componentType || 'input',
            'x-component-props': {
              ...xComponentProps,
              ...attrSnnipt.xcomponentProps,
            },
            'x-props': {
              ...xProps,
            },
            items: Array.isArray(attrSnnipt.columns) && {
              type: 'object',
              'x-component-props': {
                className: 'TableItems',
              },
              properties: renderProperties(attrSnnipt.columns, isDetail),
            },
          };
          if (isDetail) {
            properties[item]['x-props'] = {
              ...xProps,
              itemClassName: 'gridRow',
            };
          }
        }
      });
      // eslint-disable-next-line no-param-reassign
      json[key].properties = properties;
    }
    if (json[key].properties) {
      getChildren(json[key].properties, attributeMeta, isDetail);
    }
  });
  return json;
};

function calculate(attributeMeta, snippet, isDetail) {
  const json = getChildren(snippet.properties, attributeMeta, isDetail);
  return {
    type: 'object',
    properties: json,
  };
}

export default calculate;

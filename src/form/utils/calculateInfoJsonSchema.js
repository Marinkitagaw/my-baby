/**
 * 通过属性元信息和schema片段合并计算完整json schema
 * @param {*} attributeMeta 属性元信息
 * @param {*} snippet  schema片段
 */

const getChildren = attributeMeta => {
  const group = [];
  const data = [];
  attributeMeta.forEach(item => {
    if (item.id !== 'categoryIds') {
      if (group.includes(item.groupName)) {
        const current = data.filter((d = {}) => d.groupName === item.groupName);
        current[0].origin.push(item);
      } else {
        group.push(item.groupName);
        data.push({ groupName: item.groupName, origin: [{ ...item }] });
      }
    }
  });
  return data;
};

function calculate(attributeMeta) {
  const filterAttribute = attributeMeta.filter(item => item.id !== 'reviewRecords');
  const json = getChildren(
    filterAttribute.map(item => ({ ...item, groupName: item.groupName || '其他属性' })),
  );
  return json;
}

export default calculate;

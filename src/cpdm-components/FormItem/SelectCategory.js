import { useEffect, useCallback } from 'react';
import { connect } from 'umi';
import { Select } from 'antd';

const SelectCategory = ({ dispatch, objectType, enumeratedValues, onChange, ...reset }) => {
  const { categories = [] } = enumeratedValues;

  const getCategories = useCallback(() => {
    dispatch({
      type: 'common/getCategories',
      payload: { objectType },
    });
  }, [dispatch, objectType]);

  const handleChange = value => {
    if (value && onChange) {
      onChange(value);
    }
  };

  useEffect(() => {
    getCategories();
  }, [getCategories, objectType]);

  if (!objectType) return '';

  return (
    <Select onChange={handleChange} placeholder="请选择" {...reset}>
      {categories.map(t => (
        <Select.Option key={t.id || t.value}>{t.label}</Select.Option>
      ))}
    </Select>
  );
};

export default connect(({ loading, common }) => ({
  enumeratedValues: common.enumeratedValues,
  loading: loading.effects['common/getCategories'],
}))(SelectCategory);

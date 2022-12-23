import { createFormActions, FormPath, FormPathPattern } from '@formily/antd';

export const useLinkageUtils = () => {
  const { setFieldState } = createFormActions();

  const linkage = (key: string, defaultValue?: any) => (path: FormPathPattern, value?: any) => {
    return setFieldState(path, state => {
      FormPath.setIn(state, key, value !== undefined ? value : defaultValue);
    });
  };

  return {
    hide: linkage('visible', false),
    show: linkage('visible', true),
    visible: linkage('visible'),
    enum: linkage('props.enum', []),
    loading: linkage('loading', true),
    loaded: linkage('loading', false),
    value: linkage('value'),
    key: linkage('key', Math.random()),
    props: linkage('props.x-component-props'),
  };
};

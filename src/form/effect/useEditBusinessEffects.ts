import { FormEffectHooks, createFormActions } from '@formily/antd';

const { onFieldValueChange$ } = FormEffectHooks;

export const useEditBusinessEffects = () => {
  const { setFieldState } = createFormActions();
  onFieldValueChange$('secretLevel').subscribe(({ value }) => {
    setFieldState('confidentialityPeriod', state => {
      switch (value) {
        case '机密':
          state.value = 20;
          break;
        default:
          state.value = 0;
          break;
      }
    });
  });
  onFieldValueChange$('productLevel').subscribe(({ value }) => {
    setFieldState('structure', state => {
      state.visible = value === '零件';
    });
    setFieldState('soft', state => {
      state.visible = value === '软件';
    });
  });

  onFieldValueChange$('repositoryId').subscribe(({ value }) => {
    setFieldState('folderId', state => {
      state.props['x-component-props'] = {
        repositoryId: value,
        key: value,
      };
    });
  });
  onFieldValueChange$('repositoryId').subscribe(({ value }) => {
    setFieldState('experimentBatch', state => {
      state.props['x-component-props'] = {
        repositoryId: value,
        key: value,
        disabled: true,
      };
    });
  });

  onFieldValueChange$('categoryIds').subscribe(({ value }) => {
    setFieldState('code', state => {
      state.props['x-component-props'] = {
        categoryId: Array.isArray(value) && value.length && value[value.length - 1],
      };
    });
  });

  onFieldValueChange$('reviewConclusion').subscribe(({ value }) => {
    setFieldState('dealMethod', state => {
      state.required = value === 'B' || value === 'C';
      state.description = (value === 'B' || value === 'C') && '评审结论为B或者C时，该字段必填';
    });
  });
  onFieldValueChange$('isThreeQuestion').subscribe(({ value }) => {
    setFieldState('problemNature', state => {
      state.visible = value;
    });
  });
};

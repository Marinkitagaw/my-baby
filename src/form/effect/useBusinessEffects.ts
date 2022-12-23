import { FormEffectHooks, createFormActions } from '@formily/antd';
import { request } from '@cpdm/util';

const { onFieldValueChange$ } = FormEffectHooks;

const dictEntries = { ProductLevel: [] };

const ProductLevelEntries = async () => {
  const res = await request(`/plm/api/v2/admin/dict-entries?code=ProductLevel`);
  if (res.ProductLevel && Array.isArray(res.ProductLevel)) {
    Object.assign(dictEntries, {
      ProductLevel: res.ProductLevel,
    });
  }
};

export const useBusinessEffects = () => {
  ProductLevelEntries();
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

  onFieldValueChange$('productLevel').subscribe(async ({ value }) => {
    const { ProductLevel = [] } = dictEntries;
    const currentProductLevel = ProductLevel.filter(item => item.id === value);
    if (currentProductLevel.length) {
      setFieldState('structure', state => {
        state.visible = currentProductLevel[0].name === '零件';
      });
      setFieldState('soft', state => {
        state.visible = currentProductLevel[0].name === '软件';
      });
    }
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

  // onFieldValueChange$('primaryContent').subscribe(({ value = {} }) => {
  //   const fileName = value.name && value.name.substring(0, value.name.lastIndexOf('.'));
  //   setFieldState('name', state => {
  //     state.value = fileName;
  //   });
  //   setFieldState('code', state => {
  //     state.value = fileName;
  //   });
  //   setFieldState('productCode', state => {
  //     state.value = fileName;
  //   });
  // });
};

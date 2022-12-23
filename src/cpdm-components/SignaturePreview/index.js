import React, { PureComponent } from 'react';
import { connect } from 'umi';
import PublicSignTemplateList from './PublicSignTemplateList';

@connect(({ signTemplate, loading }) => ({
  signTemplate,
  signcatogory: signTemplate.signcatogory,
  signexample: signTemplate.signexample,
  loading: loading.effects['signTemplate/getSignTemplates'],
}))
class SignaturePreview extends PureComponent {
  componentWillMount() {
    const { objectId, objectType, categoryId } = this.props;
    this.setState(
      {
        objectId,
        objectType,
        categoryId,
      },
      () => {
        this.fetchTableList();
      },
    );
  }

  // 获取更改单关联的模板
  fetchTableList = () => {
    const { dispatch } = this.props;
    const { categoryId } = this.state;
    dispatch({
      type: 'signTemplate/getSignTemplateOfChange',
      payload: {
        categoryId,
      },
    });
  };

  // 获取模板实例
  fetchTemplateExample = () => {
    const { dispatch } = this.props;
    const { objectId, objectType } = this.state;
    let arr = [];
    if (objectType && objectType.search('.') !== -1) {
      arr = objectType.split('.');
    }
    const type = arr.length > 0 ? arr[arr.length - 1] : objectType;
    dispatch({
      type: 'signTemplate/getSignTemplateOfExample',
      payload: {
        objectId,
        objectType: type,
      },
    });
  };

  render() {
    const { signcatogory = [] } = this.props;
    const { objectId, objectType, categoryId } = this.state;
    return (
      <PublicSignTemplateList
        signcatogory={signcatogory}
        objectId={objectId}
        objectType={objectType}
        categoryId={categoryId}
        {...this.props}
      />
    );
  }
}

export default SignaturePreview;

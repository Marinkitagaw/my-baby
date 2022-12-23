import React, { Fragment } from 'react';
import { UserPicker } from 'cpdm-ui-components';

class SetOwnerPanel extends React.PureComponent {
  state = { userVisible: false };

  handleSetOwner = selected => {
    const { setOwner } = this.props;
    if (setOwner) {
      setOwner(selected);
      this.setState({ userVisible: false });
    }
  };

  render() {
    const { label, disabled } = this.props;
    const { userVisible } = this.state;
    const userSearch = {
      host: process.env.API_BASE_PATH,
      title: '设置所有者',
      selectionType: 'radio',
      hideExpert: true,
      onOk: this.handleSetOwner,
      onCancel: () => this.setState({ userVisible: false }),
      visible: userVisible,
    };

    return (
      <Fragment>
        <a disabled={disabled} onClick={() => this.setState({ userVisible: true })}>
          {label}
        </a>
        {userVisible && <UserPicker {...userSearch} />}
      </Fragment>
    );
  }
}

export default SetOwnerPanel;

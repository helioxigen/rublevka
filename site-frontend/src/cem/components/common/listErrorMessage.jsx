import React, { Component } from 'react';

import { formatListErrorMessage } from 'core/helpers/errors';

import s from 'cem/styles/components/header';

import UI from 'cem/components/ui';

class ListErrorMessage extends Component {
  render() {
    return (
      <UI.Heading notFound className={s.danger}>
        {formatListErrorMessage(this.props.errors)}
      </UI.Heading>
    );
  }
}

export default ListErrorMessage;

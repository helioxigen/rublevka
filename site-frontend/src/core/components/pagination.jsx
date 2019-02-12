import React, { Component, PropTypes } from 'react';

import UI from 'cem/components/ui';

export default class extends Component {
  static propTypes = {
    total: PropTypes.number,
    offset: PropTypes.number,
    limit: PropTypes.number,
    onUpdate: PropTypes.func.isRequired,
  };

  static defaultProps = {
    visiblePages: 3,
  };

  handlePageChanged(newPage) {
    const offset = newPage * this.props.limit;
    this.props.onUpdate(offset);
  }

  render() {
    const { total, offset, limit, visiblePages } = this.props;
    const currentPage = Math.max(Math.ceil(offset / limit));
    const totalPages = Math.max(Math.ceil(total / limit));

    return (
      <UI.Pager
        current={currentPage}
        total={totalPages}
        visiblePages={visiblePages}
        onPageChanged={::this.handlePageChanged}
      />
    );
  }
}

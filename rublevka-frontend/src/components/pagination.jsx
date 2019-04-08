import React, { Component, PropTypes } from 'react';

import UI from 'ui';

const { Pager } = UI;

export default class extends Component {
  static propTypes = {
    total: PropTypes.number,
    offset: PropTypes.number,
    limit: PropTypes.number,
    onUpdate: PropTypes.func.isRequired,
    resource: PropTypes.string.isRequired,
    updatePagination: PropTypes.func.isRequired,
  };

  static defaultProps = {
    visiblePages: 3,
  };

  constructor(props) {
    super(props);

    this.handlePageChanged = this.handlePageChanged.bind(this);
  }

  handlePageChanged(newPage) {
    const offset = newPage * this.props.limit;

    if (this.props.isScrollToTop) {
      window.scrollTo(0, 0);
    }

    if (this.props.resource && this.props.updatePagination) {
      this.props.updatePagination(this.props.resource, { offset });
    } else if (this.props.onUpdate) {
      this.props.onUpdate(offset);
    }
  }

  render() {
    const {
      total,
      offset,
      limit,
      visiblePages,
      dealType,
      baseUrl,
      loadMore,
    } = this.props;
    const currentPage = Math.max(Math.ceil(offset / limit));
    const totalPages = Math.max(Math.ceil(total / limit));

    return (
      <Pager
        loadMore={loadMore}
        current={currentPage}
        total={totalPages}
        visiblePages={visiblePages}
        onPageChanged={this.handlePageChanged}
        baseUrl={baseUrl}
        dealType={dealType}
      />
    );
  }
}

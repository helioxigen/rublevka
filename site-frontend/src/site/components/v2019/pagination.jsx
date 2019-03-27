import React, { Component } from 'react';
import styled from 'styled-components';

import UI from '../../ui/v2019';

const { Pager } = UI;

const Wrapper = styled.div`
  margin: 32px 0px;
`;

export default class extends Component {
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
      <Wrapper>
        <Pager
          loadMore={loadMore}
          current={currentPage}
          total={totalPages}
          visiblePages={visiblePages}
          onPageChanged={this.handlePageChanged}
          baseUrl={baseUrl}
          dealType={dealType}
        />
      </Wrapper>
    );
  }
}

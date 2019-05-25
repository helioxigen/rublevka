import React, { Component } from 'react';
import styled from 'styled-components';

import UI from '../../ui/v2019';
import { pushQuery } from '../../helpers';

const { Pager } = UI;

const Wrapper = styled.div`
  margin: 32px 0px;
`;

export default class Pagination extends Component {
  handlePageChanged = (newPage, withAppend = false) => {
    const { updatePagination, isScrollToTop, query, baseUrl } = this.props;

    if (isScrollToTop && !withAppend) {
      window.scrollTo(0, 0);
    } else {
      pushQuery(baseUrl, query, { page: newPage });
    }

    if (updatePagination) {
      this.props.updatePagination(newPage, withAppend);
    }
  };

  render() {
    const { total, offset, limit, dealType, baseUrl, query } = this.props;
    const currentPage = Math.floor(offset / limit) + 1;
    const totalPages = Math.ceil(total / limit);

    return (
      <Wrapper>
        <Pager
          current={currentPage}
          total={totalPages}
          onPageChanged={this.handlePageChanged}
          baseUrl={baseUrl}
          dealType={dealType}
          query={query}
        />
      </Wrapper>
    );
  }
}

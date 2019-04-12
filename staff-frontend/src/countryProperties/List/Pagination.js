import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { Pager } from '../../UI';

const Wrapper = styled.div`
  margin: 32px 0px;
`;

class Pagination extends Component {
  handlePageChanged = (newPage, withAppend = false) => {
    const { isScrollToTop, loadMore } = this.props;

    if (isScrollToTop && !withAppend) {
      window.scrollTo(0, 0);
    }

    // if (withAppend) {
    //   router.push(`${baseUrl}?page=${newPage}`);
    // }

    if (loadMore) {
      loadMore(newPage, withAppend);
    }
  };

  render() {
    const {
      total, offset, limit, dealType,
    } = this.props;
    const currentPage = Math.floor(offset / limit) + 1;
    const totalPages = Math.ceil(total / limit);

    return (
      <Wrapper>
        <Pager
          current={currentPage}
          total={totalPages}
          onPageChanged={this.handlePageChanged}
          dealType={dealType}
        />
      </Wrapper>
    );
  }
}

export default withRouter(Pagination);

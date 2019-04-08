import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import styled from 'styled-components';

import UI from '../../ui/v2019';

const { Pager } = UI;

const Wrapper = styled.div`
  margin: 32px 0px;
`;

export default class Pagination extends Component {
  static defaultProps = {
    visiblePages: 3,
  };

  handlePageChanged = (newPage, withAppend = false) => {
    const { baseUrl, updatePagination, isScrollToTop } = this.props;

    if (isScrollToTop && !withAppend) {
      window.scrollTo(0, 0);
    } else {
      browserHistory.push(`${baseUrl}?page=${newPage + 1} `);
    }

    if (updatePagination) {
      this.props.updatePagination(newPage, withAppend);
    }
  };

  render() {
    const {
      total,
      offset,
      limit,
      visiblePages,
      dealType,
      baseUrl,
    } = this.props;
    const currentPage = Math.max(Math.ceil(offset / limit));
    const totalPages = Math.max(Math.ceil(total / limit));

    return (
      <Wrapper>
        <Pager
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

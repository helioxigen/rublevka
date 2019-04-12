import React, { Component } from 'react';
import styled from 'styled-components';

import Page from './Page';
import LoadMore from './LoadMore';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Pagination = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PageSeparator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  font-size: 18px;

  color: #232323;
`;

export default class extends Component {
  handleFirstPage = () => {
    if (this.isPrevDisabled()) return;
    this.handlePageChanged(1);
  };

  handlePreviousPage = () => {
    if (this.isPrevDisabled()) return;

    this.handlePageChanged(this.props.current - 1);
  };

  handleNextPage = () => {
    if (this.isNextDisabled()) return;
    this.handlePageChanged(this.props.current + 1);
  };

  handleLastPage = () => {
    if (this.isNextDisabled()) return;
    this.handlePageChanged(this.props.total);
  };

  handlePageChanged = (el) => {
    const handler = this.props.onPageChanged;

    if (handler) handler(el);
  };

  isPrevDisabled = () => {
    const { current } = this.props;
    return current === 1;
  };

  isNextDisabled = () => {
    const { current, total } = this.props;
    return current === total;
  };

  handlePrevUrl() {
    const { current, baseUrl } = this.props;
    if (current === 2) {
      return baseUrl;
    }
    return `${baseUrl}?page=${current - 1}`;
  }

  visibleRange() {
    const { total, current } = this.props;

    if (total > 4) {
      if (current === total) {
        return [current - 2, current - 1];
      }
      if (current + 1 === total) {
        return [current - 1, current];
      }
      if (current > 2) {
        return [current - 1, current, current + 1];
      }

      return [2, 3];
    }
    if (total === 3) {
      return [2];
    }
    if (total === 4) {
      return [2, 3];
    }

    return [];
  }

  renderPages = visibleRange =>
    visibleRange.map((el) => {
      const isActive = this.props.current === el;

      return (
        <Page
          // to={`${this.props.baseUrl}?page=${el}`}
          key={el}
          isActive={isActive}
          onClick={() => this.handlePageChanged(el)}
        >
          {el}
        </Page>
      );
    });

  render() {
    const { current, total, onPageChanged } = this.props;

    return (
      <Wrapper>
        {current < total && (
          <LoadMore current={current} handlePageChanged={onPageChanged}>
            Загрузить ещё
          </LoadMore>
        )}

        <Pagination>
          <Page
            isArrow
            // to={this.handlePrevUrl()}
            rel="prev"
            key="prev-page"
            isDisabled={this.isPrevDisabled()}
            onClick={this.handlePreviousPage}
          />

          <Page
            // to={baseUrl}
            key="first-page"
            isActive={this.isPrevDisabled()}
            onClick={this.handleFirstPage}
          >
            1
          </Page>

          {current > 3 && total > 4 && <PageSeparator>...</PageSeparator>}

          {this.renderPages(this.visibleRange())}

          {total > 4 && total - current > 2 && (
            <PageSeparator>...</PageSeparator>
          )}

          {total !== 1 && (
            <Page
              // to={`${baseUrl}?page=${total}`}
              key="last-page"
              isActive={this.isNextDisabled()}
              onClick={this.handleLastPage}
            >
              {total}
            </Page>
          )}

          <Page
            isArrow
            // to={`${baseUrl}?page=${current + 1}`}
            rel="next"
            key="next-page"
            isDisabled={this.isNextDisabled()}
            onClick={this.handleNextPage}
          />
        </Pagination>
      </Wrapper>
    );
  }
}

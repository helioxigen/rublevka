/**
 * # Stateless Pager component
 *
 * ## Usage
 * ```
 * <Pager current={3}
 *    total={20}
 *    visiblePages={5}
 *    onPageChanged={this.handlePageChanged}
 *    titles={{
 *      first:   "First",
 *      prev:  "Prev",
 *      prevSet: "<<<",
 *      nextSet: ">>>",
 *      next:  "Next",
 *      last:  "Last"
 *    }} />
 * ```
 *
 * ## How it looks like
 * ```
 * First | Prev | ... | 6 | 7 | 8 | 9 | ... | Next | Last
 * ```
 *
 */

import React, { Component } from 'react';
import Page from './page';

import { Link } from 'react-router';

import styled from 'styled-components';

export const StLink = styled(Link)`
  display: block;
  width: fit-content;
  font-size: 1.6rem;
  font-weight: 400;
  border-radius: 50rem;
  color: #fff;
  background-color: ${p => p.theme.brandPrimary};
  border-color: ${p => p.theme.brandPrimary};
  text-decoration: none;
  padding: 0.8rem 2.5rem;
  margin: 0 auto 2rem;
  &:hover,
  &:active {
    background-color: ${p => p.theme.brandPrimaryHover};
    border-color: ${p => p.theme.brandPrimaryHover};
    color: #fff;
  }
  display: ${p => p.isDisabled && 'none'};
`;

/**
 * ## Constants
 */
const BASE_SHIFT = 0;
const TITLE_SHIFT = 1;
const TITLES = {
  first: 'First',
  prev: '‹',
  prevSet: '...',
  nextSet: '...',
  next: '›',
  last: 'Last',
};

function range(start, end) {
  const res = [];

  for (let i = start; i < end; i++) {
    res.push(i);
  }

  return res;
}

export default (styles = {}) =>
  class extends Component {
    constructor(props) {
      super(props);

      this.handlePreviousPage = this.handlePreviousPage.bind(this);
      this.handleFirstPage = this.handleFirstPage.bind(this);
      this.handleLastPage = this.handleLastPage.bind(this);
      this.handleNextPage = this.handleNextPage.bind(this);
    }

    handleFirstPage() {
      if (this.isPrevDisabled()) return;
      this.handlePageChanged(BASE_SHIFT);
    }

    handlePreviousPage() {
      if (this.isPrevDisabled()) return;

      if (this.props.current === 1) {
        this.handlePageChanged(BASE_SHIFT);
      } else {
        this.handlePageChanged(this.props.current - TITLE_SHIFT);
      }
    }

    handleNextPage() {
      if (this.isNextDisabled()) return;
      this.handlePageChanged(this.props.current + TITLE_SHIFT);
    }

    handleLastPage() {
      if (this.isNextDisabled()) return;
      this.handlePageChanged(this.props.total - TITLE_SHIFT);
    }

    handleMorePrevPages() {
      const blocks = this.calcBlocks();
      this.handlePageChanged(blocks.current * blocks.size - TITLE_SHIFT);
    }

    handleMoreNextPages() {
      const blocks = this.calcBlocks();
      this.handlePageChanged((blocks.current + TITLE_SHIFT) * blocks.size);
    }

    handlePageChanged(el) {
      const handler = this.props.onPageChanged;

      if (handler) handler(el);
    }

    calcBlocks() {
      const { total, visiblePages } = this.props;
      const current = this.props.current + TITLE_SHIFT;
      const blockSize = visiblePages;
      const blocks = Math.ceil(total / blockSize);
      const currentBlock = Math.ceil(current / blockSize) - TITLE_SHIFT;

      return {
        total: blocks,
        current: currentBlock,
        size: blockSize,
      };
    }

    isPrevDisabled() {
      return this.props.current <= BASE_SHIFT || this.props.current === 0;
    }

    isNextDisabled() {
      return (
        this.props.current >= this.props.total - TITLE_SHIFT ||
        this.props.current + 1 === this.props.total
      );
    }

    isPrevMoreHidden() {
      const blocks = this.calcBlocks();

      return blocks.total === TITLE_SHIFT || blocks.current === BASE_SHIFT;
    }

    isNextMoreHidden() {
      const blocks = this.calcBlocks();
      return (
        blocks.total === TITLE_SHIFT ||
        blocks.current === blocks.total - TITLE_SHIFT
      );
    }

    handlePrevUrl() {
      const { current, baseUrl } = this.props;
      if (current === 1) {
        return baseUrl;
      }
      return `${baseUrl}?page=${current}`;
    }

    visibleRange() {
      const blocks = this.calcBlocks();
      const start = blocks.current * blocks.size;
      const delta = this.props.total - start;
      const end = start + (delta > blocks.size ? blocks.size : delta);

      if (blocks.current === 0) {
        return [start + TITLE_SHIFT + 1, end + TITLE_SHIFT];
      }
      return [start + TITLE_SHIFT, end + TITLE_SHIFT];
    }

    getTitles(key) {
      const { titles = {} } = this.props;

      return titles[key] || TITLES[key];
    }

    renderPages([first, second]) {
      return range(first, second).map(el => {
        const current = el - TITLE_SHIFT;

        const onClick = this.handlePageChanged.bind(this, current);
        const isActive = this.props.current === current;

        return (
          <Page
            to={`${this.props.baseUrl}?page=${el}`}
            styles={styles}
            key={el}
            isActive={isActive}
            className={styles.btn}
            onClick={onClick}
          >
            {el}
          </Page>
        );
      });
    }

    render() {
      const titles = ::this.getTitles;
      const { current, total, visiblePages, baseUrl } = this.props;

      return (
        <nav className={styles.navigation}>
          {this.props.loadMore && (
            <StLink
              to={`${baseUrl}?page=${current + 2}`}
              rel="next"
              styles={styles}
              className={styles.loadMore}
              isDisabled={this.isNextDisabled()}
              onClick={this.handleNextPage}
            >
              Следующая страница
            </StLink>
          )}

          <Page
            to={this.handlePrevUrl()}
            rel="prev"
            styles={styles}
            className={styles.btnNav}
            key="prev-page"
            isDisabled={this.isPrevDisabled()}
            onClick={this.handlePreviousPage}
          >
            {titles('prev')}
          </Page>

          <Page
            to={baseUrl}
            styles={styles}
            className={styles.btn}
            key="first-page"
            isActive={this.isPrevDisabled()}
            onClick={this.handleFirstPage}
          >
            1
          </Page>

          {current > 2 && total > 4 && (
            <div styles={styles} className={styles.separator}>
              ...
            </div>
          )}

          {/* {visiblePages > 3 ||
            (current === total - 1 &&
              <Page
                styles={styles}
                className={styles.btn}
                key="prev-more"
                isHidden={this.isPrevMoreHidden()}
                onClick={this.handleMorePrevPages}
              >
                {titles('prevSet')}
              </Page>)} */}

          {this.renderPages(this.visibleRange())}

          {/* {visiblePages > 3 ||
            (current === 0 &&
              <Page
                styles={styles}
                className={styles.btn}
                key="next-more"
                isHidden={this.isNextMoreHidden()}
                onClick={this.handleMoreNextPages}
              >
                {titles('nextSet')}
              </Page>)} */}

          {current < total - visiblePages && (
            <span>
              <div styles={styles} className={styles.separator}>
                ...
              </div>
              <Page
                to={`${baseUrl}?page=${total}`}
                styles={styles}
                className={styles.btn}
                key="last-page"
                isDisabled={this.isNextDisabled()}
                onClick={this.handleLastPage}
              >
                {total}
              </Page>
            </span>
          )}

          <Page
            to={`${baseUrl}?page=${current + 2}`}
            rel="next"
            styles={styles}
            className={styles.btnNav}
            key="next-page"
            isDisabled={this.isNextDisabled()}
            onClick={this.handleNextPage}
          >
            {titles('next')}
          </Page>
        </nav>
      );
    }
  };

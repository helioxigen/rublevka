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
import { Link } from 'react-router';
import styled from 'styled-components';

import Page from './page';
import LoadMore from './LoadMore';
import { createQuery } from '../../../helpers';

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

const PageSeparator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  font-size: 18px;

  color: #232323;
`;

export default (styles = {}) =>
  class extends Component {
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

    handlePageChanged = el => {
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
        return this.getHref(baseUrl);
      }
      return this.getHref(current - 1);
    }

    visibleRange() {
      const { total, current } = this.props;

      if (total > 4) {
        if (current === total) {
          return [current - 2, current - 1];
        } else if (current + 1 === total) {
          return [current - 1, current];
        } else if (current > 2) {
          return [current - 1, current, current + 1];
        }

        return [2, 3];
      } else if (total === 1 || total === 2) {
        return [];
      } else if (total === 3) {
        return [2];
      } else if (total === 4) {
        return [2, 3];
      }
    }

    getHref = page => {
      const { query, baseUrl } = this.props;

      const params = createQuery(query, { page: page > 1 ? page : null });

      return `${baseUrl}${params}`;
    };

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
              to={this.handlePrevUrl()}
              rel="prev"
              styles={styles}
              className={styles.btnNav}
              key="prev-page"
              isDisabled={this.isPrevDisabled()}
              onClick={this.handlePreviousPage}
            />

            <Page
              to={this.getHref(1)}
              styles={styles}
              className={styles.btn}
              key="first-page"
              isActive={this.isPrevDisabled()}
              onClick={this.handleFirstPage}
            >
              1
            </Page>

            {current > 3 && total > 4 && <PageSeparator>...</PageSeparator>}

            {this.visibleRange().map(num => (
              <Page
                to={this.getHref(num)}
                styles={styles}
                key={num}
                isActive={this.props.current === num}
                className={styles.btn}
                onClick={() => this.handlePageChanged(num)}
              >
                {num}
              </Page>
            ))}

            {total > 4 && total - current > 2 && (
              <PageSeparator>...</PageSeparator>
            )}

            {total !== 1 && (
              <Page
                to={this.getHref(total)}
                styles={styles}
                className={styles.btn}
                key="last-page"
                isActive={this.isNextDisabled()}
                onClick={this.handleLastPage}
              >
                {total}
              </Page>
            )}

            <Page
              to={this.getHref(current + 1)}
              rel="next"
              styles={styles}
              className={styles.btnNav}
              key="next-page"
              isDisabled={this.isNextDisabled()}
              onClick={this.handleNextPage}
            />
          </Pagination>
        </Wrapper>
      );
    }
  };

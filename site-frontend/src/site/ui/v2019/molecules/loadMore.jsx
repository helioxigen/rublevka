import React, { Component } from 'react';
import styled from 'styled-components';

import media from '../../../styles/media';

const Button = styled.button`
  padding: 19px 24px;
  margin-top: 16px;
  background: #f44336;
  border: none;
  border-radius: 8px;

  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;

  ${media.xs`
    margin-top: 32px;
  `}

  ${media.md`
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
    border-radius: 12px;
    text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
  `}
`;

export default () => class extends Component {
    handlePageChanged = () => {
      const offset = this.props.offset + this.props.limit;

      if (this.props.isScrollToTop) {
        window.scrollTo(0, 0);
      }

      if (this.props.resource && this.props.updatePagination) {
        this.props.updatePagination(this.props.resource, { offset });
      }
    };

    render() {
      const { offset, limit, total } = this.props;

      if (offset + limit < total) {
        return (
          <Button
            kind={this.props.kind}
            size={this.props.size}
            onClick={this.handlePageChanged}
          >
            {this.props.children}
          </Button>
        );
      }

      return null;
    }
};

import React, { Component, PropTypes } from 'react';

export default (styles = {}, ui = {}) => {
  const { Button } = ui;

  return class extends Component {
    static propTypes = {
      resource: PropTypes.string.isRequired,
      updatePagination: PropTypes.func.isRequired,
      offset: PropTypes.number.isRequired,
      limit: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
      isScrollToTop: PropTypes.bool,
    };

    handlePageChanged() {
      const offset = this.props.offset + this.props.limit;

      if (this.props.isScrollToTop) {
        window.scrollTo(0, 0);
      }

      if (this.props.resource && this.props.updatePagination) {
        this.props.updatePagination(this.props.resource, { offset });
      }
    }

    render() {
      const { offset, limit, total } = this.props;

      if (offset + limit < total) {
        return (
          <Button
            kind={this.props.kind}
            size={this.props.size}
            onClick={::this.handlePageChanged}
            className={this.props.className}
          >
            {this.props.children}
          </Button>
        );
      }

      return null;
    }
  };
};

import React, { Component, PropTypes } from 'react';

import SellPropertyForm from './SellPropertyFormTisa';

import UI from 'site/ui';

import cn from 'classnames';
import s from 'site/styles/modal/request';
import sUtils from 'site/styles/utils';

import styled from 'styled-components';
import media from 'site/styles/media';

const Wrapper = styled.div`
  display: inline-block;
  width: 100%;
  vertical-align: top;
  ${media.sm`
    width: auto;
    vertical-align: baseline;
  `};
`;

const { Modal, Grid: { Row, Col } } = UI;

class SellPropertyModal extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);

    this.state = { isOpened: false };
  }

  toggle() {
    this.setState(prevState => ({
      isOpened: !prevState.isOpened,
    }));
  }

  close() {
    this.setState({
      isOpened: false,
    });
  }

  render() {
    const propertyCategory = 'country';

    return (
      <Wrapper>
        {React.cloneElement(this.props.children, { onClick: this.toggle })}

        <Modal
          className={s.modal}
          contentClassName={cn(s.modalContent, s.callbackModal)}
          size="sm"
          closePortal={this.close}
          isOpened={this.state.isOpened}
          onClose={this.close}
          closeOnEsc
          closeOnOutsideClick
        >
          <Row sm="center">
            <Col sm="10">
              <SellPropertyForm
                propertyCategory={propertyCategory}
                updateFilter={this.updateFilter}
                className={cn(sUtils.paddingTopXs5Sm3, sUtils.paddingBottom6)}
              />
            </Col>
          </Row>
        </Modal>
      </Wrapper>
    );
  }
}

export default SellPropertyModal;

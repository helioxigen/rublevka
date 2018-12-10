import React, { Component } from 'react';

import { cloudfront } from 'core/config/resources';
import global from 'window-or-global';

import UI from 'site/ui';
const {
  Modal, Carousel,
} = UI;

export default class extends Component {
  state = {
    isOpened: false,
  };

  toggleModal(isOpened) {
    this.setState({
      isOpened,
    });
  }

  render() {
    const { propertyId, images = [] } = this.props;

    const imageSet = images.map(image => ({
      id: propertyId,
      src: `${global.config.cloudfront || cloudfront}/${image.id}-${global.config.postfix}`,
    }));

    return !!imageSet.length ? (
      <div>
        {React.cloneElement(this.props.children, { ...this.props.children.props, onClick: () => this.toggleModal(true) })}
        <Modal closeOnEsc closeOnOutsideClick onClose={() => ::this.toggleModal(false)} isOpened={this.state.isOpened} closePortal={() => ::this.toggleModal(false)} hideCloseButton>
          <Carousel title="Планировки" images={imageSet} currentSlide={0} fullscreenOnly onClose={() => ::this.toggleModal(false)} />
        </Modal>
      </div>
    ) : null;
  }
}

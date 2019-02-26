import React, { Component } from 'react';

import { reduxForm } from 'redux-form';

import PropertyCardsList from './propertyCardsList';

import CountIndicator from 'cem/components/common/countIndicator';

import UI from 'cem/components/ui';

import s from 'cem/styles/modal/list';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

const {
  Modal,
  Button,
  Heading,
  Grid: { Row, Col },
} = UI;

const formSettings = {
  form: 'addPropertyModal',
  fields: ['properties'],
  destroyOnUnmount: true,
};

class ModalAddProperty extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);
    this.add = this.add.bind(this);

    this.state = { isOpened: false };
  }

  toggle = () => this.setState({ isOpened: !this.state.isOpened });
  close = () => this.setState({ isOpened: false });

  add() {
    const { field, values, initializeForm, onAdd } = this.props;
    const properties = values.properties.filter(
      item =>
        !field.find(fieldItem => fieldItem.propertyId === item.propertyId),
    );

    this.close();
    initializeForm({ properties: [] });
    onAdd(properties);
  }

  render() {
    const {
      fields,
      values,
      children,
      isNumberLimited,
      currentLimit,
      totalLimit,
    } = this.props;

    const currentPropertiesCount = values.properties
      ? values.properties.length
      : 0;

    return (
      <div className={s.modalContainer}>
        {React.cloneElement(children, { onClick: this.toggle })}

        <Modal
          size="lg"
          closePortal={this.close}
          isOpened={this.state.isOpened}
          onClose={this.close}
          closeOnEsc
          closeOnOutsideClick
        >
          <div className={s.container}>
            <Row>
              <Col xs="16">
                <Heading size="md">Добавить объект по ID</Heading>
              </Col>
              {isNumberLimited && (
                <Col xs="4">
                  <Heading size="md" className={sUtils.textRight}>
                    {totalLimit - currentLimit + currentPropertiesCount}/
                    {totalLimit}
                  </Heading>
                </Col>
              )}
            </Row>
            <Row className={sUtils.pushedTop3}>
              <Col xs="20">
                <PropertyCardsList
                  field={fields.properties}
                  isNumberLimited={isNumberLimited}
                  limit={currentLimit}
                />
              </Col>
            </Row>
          </div>
          <Button
            className={sButton.btnWide}
            kind="success"
            type="button"
            size="lg"
            block
            onClick={this.add}
            disabled={!currentPropertiesCount}
          >
            Добавить{' '}
            <CountIndicator
              count={currentPropertiesCount}
              declensionForms={['объект', 'объекта', 'объектов']}
            />
          </Button>
        </Modal>
      </div>
    );
  }
}

export default reduxForm(formSettings)(ModalAddProperty);

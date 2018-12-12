import React, { Component } from 'react';

import { reduxForm } from 'redux-form';

import PropertyCardsList from 'cem/containers/common/properties';

import CountIndicator from 'cem/components/common/countIndicator';

import UI from 'cem/components/ui';
const {
  Modal, Button, Heading,
  Grid: { Row, Col },
} = UI;

import s from 'cem/styles/modal/list';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

const formSettings = {
  form: `addPropertyModal`,
  fields: [`properties[]`],
};

class ModalAddProperty extends Component {
  state = {
    isOpened: false,
  }

  toggle = () => this.setState({ isOpened: !this.state.isOpened });
  close = () => this.setState({ isOpened: false });

  add() {
    const { field, values, destroyForm, onAdd } = this.props;
    const properties = values.properties.filter(id => !field.find(item => item.value === id));

    this.close();
    destroyForm();
    onAdd(properties);
  }

  render() {
    const { fields, values, children, propertyCategory } = this.props;

    return (
      <div className={s.modalContainer}>
        {React.cloneElement(children, { onClick: ::this.toggle })}

        <Modal size="lg" closePortal={::this.close} isOpened={this.state.isOpened} onClose={::this.close} closeOnEsc closeOnOutsideClick>
          <div className={s.container}>
            <Row>
              <Col xs="20">
                <Heading size="md">Добавить объект по ID</Heading>
              </Col>
            </Row>
            <Row className={sUtils.pushedTop3}>
              <Col xs="20">
                <PropertyCardsList field={fields.properties} propertyCategory={propertyCategory} />
              </Col>
            </Row>
          </div>
          <Button className={sButton.btnWide} kind="success" type="button" size="lg" block onClick={::this.add} disabled={!values.properties.length}>
            Добавить <CountIndicator count={values.properties.length} declensionForms={[`объект`, `объекта`, `объектов`]} />
          </Button>
        </Modal>
      </div>
    );
  }
}

export default reduxForm(formSettings)(ModalAddProperty);

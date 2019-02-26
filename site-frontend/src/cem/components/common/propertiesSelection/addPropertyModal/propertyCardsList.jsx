import React, { Component } from 'react';
import { API } from 'core/config/sources';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { pop } from 'cem/actions/toastr';

import FormField from 'cem/helpers/formField';
import Property from 'cem/components/common/property/listItem';

import UI from 'cem/components/ui';
const {
  Button,
  Grid: { Row, Col },
  Form: { Input },
} = UI;

import sUtils from 'cem/styles/utils';

class Properties extends Component {
  constructor(props) {
    super(props);

    this.addProperty = this.addProperty.bind(this);
    this.handlePropertyRemove = this.handlePropertyRemove.bind(this);

    this.state = { propertyId: undefined };
  }

  addProperty() {
    const { actions, field } = this.props;
    const { propertyId } = this.state;

    if (!isNaN(propertyId)) {
      API.get(`/v1/properties/${propertyId}`).then(
        ({ body }) => {
          if (field.value.find(({ propertyId: id }) => id === propertyId)) {
            actions.pop(
              'error',
              `Объект (ID: ${propertyId})`,
              'Такой объект уже есть в списке',
            );
          } else {
            field.onChange([
              ...field.value,
              { propertyId, propertyCategory: body.category },
            ]);
            this.setState({ propertyId: undefined });
          }
        },
        () =>
          actions.pop('error', `Объект (ID: ${propertyId})`, 'Не существует'),
      );
    }
  }

  handlePropertyRemove(propertyId) {
    const { field } = this.props;
    field.onChange(
      field.value.filter(({ propertyId: id }) => id !== propertyId),
    );
  }

  render() {
    const { field, isStatic, isNumberLimited, limit } = this.props;
    const isAddButtonDisabled =
      !this.state.propertyId || this.state.propertyId === '';
    const idField = {
      onChange: event => {
        const { value } = event.target;
        const prevValue = this.state.propertyId;

        if (!isNaN(value) && !!value.length) {
          this.setState({ propertyId: Number(value) });
        } else if (value === '') {
          this.setState({ propertyId: value });
        } else {
          this.setState({ propertyId: prevValue });
        }
      },
      value: this.state.propertyId,
    };

    const isLimitReached =
      isNumberLimited && !!field.value
        ? limit - field.value.length <= 0
        : false;

    return (
      <section className={sUtils.pushedBottom3}>
        {!isStatic && !isLimitReached && field && (
          <Row className={sUtils.pushedBottom1}>
            <Col xs="20" className={sUtils.flexContainer}>
              <FormField field={idField} label="ID" float>
                <Input block className={sUtils.fontSizeMd} />
              </FormField>
              <div className={sUtils.pushedTop2_4}>
                <Button
                  className={sUtils.pushedLeft1_5}
                  type="button"
                  kind="accent"
                  size="sm"
                  onClick={this.addProperty}
                  disabled={isAddButtonDisabled}
                >
                  Добавить
                </Button>
              </div>
            </Col>
          </Row>
        )}
        {!!field.value &&
          !!field.value.length &&
          field.value.map(({ propertyId, propertyCategory }, index) => (
            <Row key={index} className={sUtils.pushedBottom2}>
              <Col xs="20">
                <Property
                  isPreview
                  id={propertyId}
                  resourcePath={`/v1/properties/${propertyCategory}`}
                  isStatic={isStatic}
                  handleDelete={() => this.handlePropertyRemove(propertyId)}
                />
              </Col>
            </Row>
          ))}
      </section>
    );
  }
}

const mapDispatch = dispatch => ({
  actions: bindActionCreators({ pop }, dispatch),
});

export default connect(
  null,
  mapDispatch,
)(Properties);

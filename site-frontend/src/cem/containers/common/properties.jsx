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

import cn from 'classnames';
import sUtils from 'cem/styles/utils';

class Properties extends Component {
  state = {
    propertyId: undefined,
  }

  addProperty() {
    const { actions, propertyCategory } = this.props;
    const { propertyId } = this.state;
    const categories = {
      country: `загородной недвижимости`,
      city: `городской недвижимости`,
    };

    if (!isNaN(propertyId)) {
      API.get(`/v1/properties/${propertyId}`)
        .then(({ body }) => {
          if (body.category === propertyCategory) {
            if (!!this.props.field.find(({ value }) => value === propertyId)) {
              actions.pop(`error`, `Объект (ID: ${propertyId})`, `Такой объект уже есть в списке`);
            } else {
              this.props.field.addField(propertyId);
              this.setState({ propertyId: undefined });
            }
          } else {
            actions.pop(`error`, `Объект (ID: ${propertyId})`, `Не относится к ${categories[propertyCategory]}`);
          }
        }).catch(() => actions.pop(`error`, `Объект (ID: ${propertyId})`, `Не существует`));
    }
  }

  removeProperty(index) {
    this.props.field.removeField(index);
    this.props.toggle.onChange(Math.random());
  }

  render() {
    const { field, propertyIds, propertyCategory, isStatic } = this.props;
    const ids = field || propertyIds || [];
    const isAddButtonDisabled = !this.state.propertyId || this.state.propertyId === ``;
    const idField = {
      onChange: (evt) => {
        const { value } = evt.target;
        const prevValue = this.state.propertyId;

        if (!isNaN(value) && !!value.length) {
          this.setState({ propertyId: Number(value) });
        } else if (value === ``) {
          this.setState({ propertyId: value });
        } else {
          this.setState({ propertyId: prevValue });
        }
      },
      value: this.state.propertyId,
    };

    return (
      <section className={sUtils.pushedBottom3}>
        {!isStatic && field &&
          <Row className={sUtils.pushedBottom1}>
            <Col xs="20" className={sUtils.flexContainer}>
              <FormField field={idField} label="ID" float>
                <Input block className={sUtils.fontSizeMd} />
              </FormField>
              <div className={sUtils.pushedTop2_4}>
                <Button className={sUtils.pushedLeft1_5} type="button" kind="accent" size="sm" onClick={::this.addProperty} disabled={isAddButtonDisabled}>Добавить</Button>
              </div>
            </Col>
          </Row>
        }
        {!!ids.length && ids.map((id, index) =>
          <Row key={index} className={cn(sUtils.pushedBottom2)}>
            <Col xs="20">
              <Property isPreview id={id.value} resourcePath={`/v1/properties/${propertyCategory}`} isStatic={isStatic} handleDelete={() => ::this.removeProperty(index)} />
            </Col>
          </Row>
        )}
      </section>
    );
  }
}

const mapDispatch = (dispatch) => ({
  actions: bindActionCreators({ pop }, dispatch),
});

export default connect(null, mapDispatch)(Properties);

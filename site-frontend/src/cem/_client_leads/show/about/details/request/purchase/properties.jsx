import React, { Component } from 'react';
import { Link } from 'react-router';

import { cloudfront } from 'core/config/resources';

import ModalProperty from '../../../../modal/addProperty';
import { FormattedCurrency } from 'react-formatted';
import * as dict from 'cem/constants/properties/dictionaries';

import cn from 'classnames';
import UI from 'cem/components/ui';
const {
  Heading,
  Grid,
  Icon,
  Media,
  Button,
  ParamList,
  Grid: { Row, Col },
  Form: { Group },
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

const PropertyImage = ({ id }) => {
  const src = id
    ? `${cloudfront}/${id}-thumbnail-256`
    : require(`url-loader!cem/assets/placeholder`);

  return <UI.Image src={src} kind="circle" width="114" height="114" />;
};

const PropertyDescription = ({ data = {}, remove, isStatic }) => (
  <Grid.Container fluid>
    <Row className={sUtils.pushedBottom2}>
      <Col sm="3">
        <ParamList label="ID" big>
          <Link to={`/properties/${data.category}/${data.id}`}>{data.id}</Link>
        </ParamList>
      </Col>
      <Col sm="5">
        <ParamList label="Категория" big>
          {dict.categories[data.category]}
        </ParamList>
      </Col>
      <Col sm="5">
        <ParamList label="Тип" big>
          {dict.kinds[data.kind]}
        </ParamList>
      </Col>
      {!isStatic && (
        <Col sm="7">
          <Button type="button" kind="danger" onClick={remove}>
            удалить
          </Button>
        </Col>
      )}
    </Row>

    <Row>
      <Col sm="3">
        <ParamList
          label="Статус"
          big
          valueClassName={s[dict.states[data.state].style]}
        >
          {dict.states[data.state].title}
        </ParamList>
      </Col>
      {data.saleOffer && (
        <Col sm="5">
          <ParamList label="Продажа" big>
            <FormattedCurrency
              symbol={data.saleOffer.currency}
              value={data.saleOffer.price}
            />
          </ParamList>
        </Col>
      )}
      {data.rentOffer && (
        <Col sm="5">
          <ParamList label="Аренда" big>
            <FormattedCurrency
              symbol={data.rentOffer.currency}
              value={data.rentOffer.price}
            />
          </ParamList>
        </Col>
      )}
    </Row>
  </Grid.Container>
);

class About extends Component {
  componentWillMount() {
    const { requestDetails = {} } = this.props.data;

    const filter = {
      id: (requestDetails.objects || []).map(item => item.id),
    };

    this.props.actions.loadProperties({ filter });
  }

  addProperty(id) {
    this.props.actions.loadProperty(id).then(response => {
      const { category } = response.data;

      this.props.fields.requestDetails.objects.addField({
        id,
        klass: `${category}_property`,
      });
      this.props.fields.toggle.onChange(Math.random());
    });
  }

  removeProperty(index) {
    this.props.fields.requestDetails.objects.removeField(index);
    this.props.fields.toggle.onChange(Math.random());
  }

  renderProperty(id, index, isStatic) {
    const property = this.props.state.properties[id] || undefined;

    if (property) {
      const image = (property.data.images && property.data.images[0]) || {};

      return (
        <Col xs="20" key={index} className={cn(sUtils.pushedBottom3)}>
          <Media
            left={<PropertyImage id={image.id} />}
            body={
              <PropertyDescription
                data={property.data}
                remove={() => ::this.removeProperty(index)}
                isStatic={isStatic}
              />
            }
          />
        </Col>
      );
    } else {
      return null;
    }
  }

  render() {
    const { formKey, leadState, isUpdateAllowed, className } = this.props;

    const isStatic =
      (formKey !== `create` && !isUpdateAllowed) ||
      [`spam`, `rejected`, `processed`].indexOf(leadState) > -1;
    const isStateInProgress = leadState === `in_progress`;

    return (
      <div className={className}>
        <Group
          kind={!this.props.values.requestDetails.objects.length && `error`}
        >
          <Heading size="md">
            Объекты
            {!isStatic && (
              <ModalProperty
                submitBtn={
                  <Button
                    className={sButton.btnWide}
                    type="button"
                    kind="primary"
                    size="lg"
                    block
                  >
                    Добавить объект
                  </Button>
                }
                onClick={::this.addProperty}
              >
                <Button className={s.linkIcon} type="button">
                  <Icon className={s.icon} icon="modal" />
                </Button>
              </ModalProperty>
            )}
          </Heading>

          {isStateInProgress &&
            !this.props.values.requestDetails.objects.length && (
              <Heading notFound>Объекты не выбраны</Heading>
            )}
        </Group>
        <Row>
          {this.props.values.requestDetails.objects.map(({ id }, index) =>
            ::this.renderProperty(id, index, isStatic),
          )}
        </Row>
      </div>
    );
  }
}

export default About;

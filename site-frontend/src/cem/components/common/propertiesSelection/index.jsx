import React, { PropTypes, Component } from 'react';

import Property from 'cem/components/common/property/listItem';
import ModalAddProperty from './addPropertyModal';

import UI from 'cem/components/ui';
const {
  Button,
  Icon,
  Heading,
  Grid: { Row, Col },
  Form: { Group, Helper },
} = UI;

import cn from 'classnames';
import s from 'cem/styles/id/content';
import sButton from 'cem/styles/buttons';
import sUtils from 'cem/styles/utils';

class PropertiesSelectionList extends Component {
  static propTypes = {
    category: PropTypes.string.isRequired,
    idsField: PropTypes.object.isRequired,
    static: PropTypes.bool,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func,
  };

  static defaultProps = {
    limit: 0,
  };

  constructor(props) {
    super(props);

    this.handlePropertiesAddition = this.handlePropertiesAddition.bind(this);
    this.handlePropertyRemove = this.handlePropertyRemove.bind(this);
  }

  handlePropertiesAddition(items) {
    this.props.onAdd(items.map(({ propertyId }) => propertyId));
  }

  handlePropertyRemove(id) {
    this.props.onRemove(id);
  }

  render() {
    const { category, idsField, isStatic, limit, formKey, title } = this.props;

    const idsFieldValue = Array.isArray(idsField.value) ? idsField.value : [];

    const isNumberLimited = !!limit;
    const cardsLimit = limit - idsFieldValue.length;
    const isLimitReached = isNumberLimited ? cardsLimit <= 0 : false;

    return (
      <section className={sUtils.pushedBottom6}>
        <Row>
          <Col xs="20">
            <Heading size="md">
              {title}
              {formKey === 'create' ||
                (!isStatic && !isLimitReached && (
                  <ModalAddProperty
                    field={idsFieldValue.map(id => ({ propertyId: id }))}
                    onAdd={this.handlePropertiesAddition}
                    initialValues={{ properties: [] }}
                    isNumberLimited={isNumberLimited}
                    currentLimit={cardsLimit}
                    totalLimit={limit}
                  >
                    <Button
                      type="button"
                      className={sButton.btnRoundPlus}
                      block
                      size="lg"
                      onClick={() => this.toggle()}
                    >
                      <Icon className={s.icon} icon="modal" />
                    </Button>
                  </ModalAddProperty>
                ))}
              <Group kind={idsField.touched && !!idsField.error && 'error'}>
                {idsField.touched && idsField.error && (
                  <Helper>{idsField.error}</Helper>
                )}
              </Group>
            </Heading>
          </Col>
        </Row>
        <Row>
          <Col xs="20">
            {idsFieldValue.map(id => (
              <Property
                key={id}
                isPreview
                id={id}
                resourcePath={`/v1/properties/${category}`}
                handleDelete={() => this.handlePropertyRemove(id)}
                isStatic={isStatic}
              />
            ))}
            {!idsFieldValue.length && (
              <Heading
                notFound
                className={cn(sUtils.pushedBottom3, sUtils.pushedTop3)}
              >
                Нет объектов
              </Heading>
            )}
          </Col>
        </Row>
      </section>
    );
  }
}

export default PropertiesSelectionList;

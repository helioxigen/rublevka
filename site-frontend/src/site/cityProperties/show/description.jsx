import React, { Component, PropTypes } from 'react';
import { cloudfront } from 'core/config/resources';

import * as dict from 'site/constants/properties/city/dictionary';

import PopupCarousel from 'site/components/common/popupCarousel';

import UI from 'site/ui';
const {
  Button,
  Image,
  Grid: { Row, Col, Container },
} = UI;

import s from 'site/styles/property/description';

class Description extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  render() {
    const {
      data,
      data: { equipment, specification, information },
      // complex: { details: complexDetails = {} },
    } = this.props;

    const publicLayoutImages = data.layoutImages.filter(
      image => !!image.isPublic,
    );

    if (data) {
      return (
        <Row>
          <Container>
            <Row className={s.paddingBottom3}>
              <Col xs="12">
                <Row>
                  <Col md="8" className={s.pushedBottom3}>
                    <h3 className={s.title}>Квартира</h3>
                    <Row>
                      <Col sm="6">
                        {specification.totalArea && (
                          <dl className={s.list}>
                            <dt className={s.listTitle}>
                              Общая площадь:&nbsp;
                            </dt>
                            <dd className={s.listItem}>
                              {specification.totalArea} м²
                            </dd>
                          </dl>
                        )}
                        {specification.livingArea && (
                          <dl className={s.list}>
                            <dt className={s.listTitle}>
                              Жилая площадь:&nbsp;
                            </dt>
                            <dd className={s.listItem}>
                              {specification.livingArea} м²
                            </dd>
                          </dl>
                        )}
                        {specification.floor && (
                          <dl className={s.list}>
                            <dt className={s.listTitle}>
                              {data && data.kind === 'house'
                                ? 'Этажей'
                                : 'Этаж'}
                              :&nbsp;
                            </dt>
                            <dd className={s.listItem}>
                              {specification.floor}
                            </dd>
                          </dl>
                        )}
                        {specification.rooms && (
                          <dl className={s.list}>
                            <dt className={s.listTitle}>Комнат:&nbsp;</dt>
                            <dd className={s.listItem}>
                              {specification.rooms}
                            </dd>
                          </dl>
                        )}
                        {specification.ceilHeight && (
                          <dl className={s.list}>
                            <dt className={s.listTitle}>
                              Высота потолков:&nbsp;
                            </dt>
                            <dd className={s.listItem}>
                              {specification.ceilHeight} м
                            </dd>
                          </dl>
                        )}
                        {information.renovate && (
                          <dl className={s.list}>
                            <dt className={s.listTitle}>Ремонт:&nbsp;</dt>
                            <dd className={s.listItem}>
                              {dict.renovate[information.renovate]}
                            </dd>
                          </dl>
                        )}
                        {information.condition && (
                          <dl className={s.list}>
                            <dt className={s.listTitle}>Состояние:&nbsp;</dt>
                            <dd className={s.listItem}>
                              {dict.condition[information.condition]}
                            </dd>
                          </dl>
                        )}
                      </Col>
                      <Col sm="6">
                        {information.ventilation && (
                          <dl className={s.list}>
                            <dt className={s.listTitle}>Вентиляция:&nbsp;</dt>
                            <dd className={s.listItem}>
                              {dict.ventilation[information.ventilation]}
                            </dd>
                          </dl>
                        )}
                        {information.conditioning && (
                          <dl className={s.list}>
                            <dt className={s.listTitle}>
                              Кондиционирование:&nbsp;
                            </dt>
                            <dd className={s.listItem}>
                              {dict.conditioning[information.conditioning]}
                            </dd>
                          </dl>
                        )}

                        {specification.wcs && (
                          <dl className={s.list}>
                            <dt className={s.listTitle}>Санузел:&nbsp;</dt>
                            <dd className={s.listItem}>{specification.wcs}</dd>
                          </dl>
                        )}
                        {specification.balconies && (
                          <dl className={s.list}>
                            <dt className={s.listTitle}>Балкон:&nbsp;</dt>
                            <dd className={s.listItem}>
                              {specification.balconies}
                            </dd>
                          </dl>
                        )}
                        {specification.loggias && (
                          <dl className={s.list}>
                            <dt className={s.listTitle}>Лоджия:&nbsp;</dt>
                            <dd className={s.listItem}>
                              {specification.loggias}
                            </dd>
                          </dl>
                        )}
                        {information.furniture && (
                          <dl className={s.list}>
                            <dt className={s.listTitle}>Мебель:&nbsp;</dt>
                            <dd className={s.listItem}>
                              {dict.furniture[information.furniture]}
                            </dd>
                          </dl>
                        )}
                        {specification.layout && (
                          <dl className={s.list}>
                            <dt className={s.listTitle}>Планировка:&nbsp;</dt>
                            <dd className={s.listItem}>
                              {dict.layout[specification.layout]}
                            </dd>
                          </dl>
                        )}
                      </Col>
                    </Row>
                  </Col>
                  {!!publicLayoutImages.length && (
                    <Col md="4" className={s.pushedBottom3}>
                      <h3 className={s.title}>Планировка</h3>

                      {publicLayoutImages.map((item, i) => (
                        <PopupCarousel
                          propertyId={data.id}
                          images={publicLayoutImages}
                        >
                          <Button className={s.btn} size="md" block key={i}>
                            <Image
                              src={`${global.config.cloudfront || cloudfront}/${
                                item.id
                              }-thumbnail-512`}
                              key={i}
                              alt="Планировка"
                              responsive
                            />
                          </Button>
                        </PopupCarousel>
                      ))}
                    </Col>
                  )}
                </Row>
                <Row className={s.pushedBottom6}>
                  {!!equipment && !!equipment.length && (
                    <Col sm="6" md="4">
                      <h3 className={s.title}>Оснащение</h3>
                      <Row>
                        <Col xs="12">
                          <ul className={s.list}>
                            {equipment.map((item, index) => (
                              <li key={index} className={s.item}>
                                {dict.equipment[item]}
                              </li>
                            ))}
                          </ul>
                        </Col>
                      </Row>
                    </Col>
                  )}
                </Row>
              </Col>
            </Row>
          </Container>
        </Row>
      );
    }

    return null;
  }
}

export default Description;

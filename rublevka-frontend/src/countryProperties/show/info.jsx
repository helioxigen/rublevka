import React, { Component, PropTypes } from 'react';

import { dealTypes } from 'constants/properties/dictionaries';

import styled from 'styled-components';

import UI from 'ui';

import cn from 'classnames';
import s from 'styles/property/info.css';
import sUtils from 'styles/utils.css';
import st from 'styles/themes';

import CurrentDutyCard from 'currentDuty/card';
import ByPropertyModal from 'request/byPropertyModal';
import Price from './price';
import Breadcrumbs from './Breadcrumbs';

const {
  Icon,
  Button,
  Visibility,
  CountIndicator,
  Grid: { Row, Col, Container },
} = UI;

export const CallBtnWrapper = styled.div`
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  left: 1.5rem;
  z-index: 3;
`;

export const CallBtn = styled.div`
  position: relative;
  outline: none;
  text-decoration: none;
  display: inline-block;
  padding: 1.5rem;
  padding-bottom: 1.3rem;
  font-size: 1.6rem;
  line-height: 1;
  border-radius: 10rem;
  color: #fff;
  background-color: #00c853;
  border-color: #00c853;
`;

export const CallBtnLink = styled.a`
  height: 6rem;
  width: 6rem;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  opacity: 0;
`;

class PropertyInfo extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    dealType: PropTypes.string.isRequired,
    // delta: PropTypes.object,
  };

  state = {
    isOpened: false,
  };

  toggleModal(isOpened) {
    this.setState({
      isOpened,
    });
  }

  render() {
    const { data } = this.props;
    const dealType = dealTypes[this.props.dealType];
    const { location = {}, specification = {}, landDetails = {} } = data;

    const currentDate = new Date();
    const currentHour = currentDate.getUTCHours();
    const isWorkTime = currentHour > 7 && currentHour < 17;

    return (
      <section className={s.infoContainer}>
        <Container>
          <Row>
            <Col md="8" className={s.pipe}>
              <Breadcrumbs data={data} dealType={this.props.dealType} />

              <Visibility md="hidden" lg="hidden">
                <div className={sUtils.pushedTop1}>
                  <span className={s.labelXs}>ID {data && data.id}</span>
                </div>
              </Visibility>

              {location.routeName && (
                <p className={cn(s.titleLg, s.pushedTop1_9)}>
                  {location.routeName} ш.,&nbsp;{location.mkadDistance} км
                  <span className={cn(s.label, sUtils.pushedLeft2)}>
                    ID {data && data.id}
                  </span>
                </p>
              )}
              {!location.routeName && (
                <h2 className={cn(s.titleLg, s.pushedTop1_9)}>—</h2>
              )}

              {!!data[`${dealType}Offer`] && (
                <div className={s.pushedTopXs1_5Md2}>
                  <p className={s.titleMd}>
                    <Price
                      deal={data[`${dealType}Offer`]}
                      dealType={dealType}
                    />
                  </p>
                </div>
              )}

              <ul className={cn(s.list, s.pushedTop4_6)}>
                {!!specification.rooms && (
                  <li className={cn(st.property.listItem, sUtils.hideXs)}>
                    <Icon className={s.iconLg} icon="room" />
                    <span className={cn(s.displayInlineBlock, s.pushedTop1_2)}>
                      <CountIndicator
                        count={specification.rooms}
                        declensionForms={['комната', 'комнаты', 'комнат']}
                      />
                    </span>
                  </li>
                )}
                {!!specification.bedrooms && (
                  <li className={cn(st.property.listItem)}>
                    <Icon className={s.iconLg} icon="bed" />
                    <span className={cn(s.displayInlineBlock, s.pushedTop1_2)}>
                      <CountIndicator
                        count={specification.bedrooms}
                        declensionForms={['спальня', 'спальни', 'спален']}
                      />
                    </span>
                  </li>
                )}
                {!!specification.wcs && (
                  <li className={cn(st.property.listItem)}>
                    <Icon className={s.iconLg} icon="bath" />
                    <span className={cn(s.displayInlineBlock, s.pushedTop1_2)}>
                      <CountIndicator
                        count={specification.wcs}
                        declensionForms={['ванная', 'ванные', 'ванных']}
                      />
                    </span>
                  </li>
                )}
                {landDetails.area && (
                  <li className={st.property.listItem}>
                    <Icon className={s.iconLg} icon="triangle" />
                    <span className={cn(s.displayInlineBlock, s.pushedTop1_2)}>
                      {specification && !!specification.area && (
                        <span>
                          {Math.floor(specification.area)}&nbsp;м²&nbsp;/&nbsp;
                        </span>
                      )}
                      {Math.floor(landDetails.area)}&nbsp;сот
                    </span>
                  </li>
                )}
              </ul>
            </Col>

            <Col md="4" className={cn(s.pushedTopMd2_5, s.textRight)}>
              <div className={s.maxWidth29}>
                <Row sm="middle" className={s.extraPadding3_0}>
                  <Col sm="6" md="12">
                    <CurrentDutyCard propertyCategory="country" />
                  </Col>
                  <Col sm="6" md="12" className={s.pushedTopMd3_5}>
                    <div className={s.btnLgContainer}>
                      <Visibility xs="hidden" sm="hidden">
                        <ByPropertyModal
                          propertyCategory="country"
                          propertyId={data.id}
                        >
                          <Button
                            className={cn(s.btnLg, sUtils.borderRadius10)}
                            size="lg"
                            kind="success"
                          >
                            Забронировать просмотр
                          </Button>
                        </ByPropertyModal>
                      </Visibility>

                      <Visibility md="hidden" lg="hidden">
                        {!isWorkTime && (
                          <ByPropertyModal
                            propertyCategory="country"
                            propertyId={data.id}
                          >
                            <Button
                              className={cn(s.btnLg, sUtils.borderRadius10)}
                              size="lg"
                              kind="success"
                            >
                              Забронировать просмотр
                            </Button>
                          </ByPropertyModal>
                        )}

                        {isWorkTime && (
                          <CallBtnWrapper>
                            <CallBtn>
                              <Icon className={s.iconModal} icon="phone" />
                              <CallBtnLink
                                href={`tel:+${global.config.phones.country}`}
                                id="comagicDTPhoneNumber"
                              />
                            </CallBtn>
                          </CallBtnWrapper>
                        )}
                      </Visibility>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default PropertyInfo;

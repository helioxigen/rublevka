import React, { Component, PropTypes } from 'react';
// import { Link } from 'react-router';

import UI from 'site/ui';
const {
  Icon,
  Button,
  Visibility,
  CountIndicator,
  Grid: { Container, Col, Row },
} = UI;

import CurrentDutyCard from 'site/currentDuty/card';
import Price from './price';
import ByPropertyModal from 'site/request/byPropertyModal';

import cn from 'classnames';
import s from 'site/styles/property/info';
import st from 'site/styles/themes';
import sUtils from 'site/styles/utils';

import { dealTypes } from 'site/constants/properties/dictionaries';

class PropertyInfo extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    dealType: PropTypes.string.isRequired,
    delta: PropTypes.object,
  };

  // state = {
  //   isOpened: false,
  // };
  //
  // toggleModal(isOpened) {
  //   this.setState({
  //     isOpened,
  //   });
  // }

  render() {
    const { data } = this.props;
    const dealType = dealTypes[this.props.dealType];
    const { id, location = {}, specification = {} } = data;

    return (
      <Row>
        <section className={s.infoContainer}>
          <Container>
            <Row>
              <Col md="8" className={s.pipe}>
                <nav>
                  {location.subLocalityId && (
                    <Visibility xs="hidden" sm="hidden">
                      {/* TODO Implement path */}
                      {/* <Link to={`/gorodskaya/subLocalities/${location.subLocalityId}`} className={s.navItem}> */}
                      {location.subLocalityName}&nbsp;
                      <Icon className={s.iconXs} icon="arrow-down" />
                      {/* </Link> */}
                    </Visibility>
                  )}

                  {location.street && (
                    <Visibility xs="hidden" sm="hidden">
                      {/* TODO Implement path */}
                      {/* <Link to={`/gorodskaya/streets/${location.streetId}`} className={s.navItem}> */}
                      {location.street}&nbsp;
                      {/* </Link> */}
                    </Visibility>
                  )}
                </nav>

                <h2 className={cn(s.titleLg, s.pushedTop1_9)}>
                  <span>{location.street || ``}</span>
                  <span className={s.pushedRight2}>
                    {(location.house && `, ${location.house}`) || ``}
                  </span>
                  <span className={s.label}>ID {id}</span>
                </h2>

                <div className={s.pushedTopXs1_5Md2}>
                  <h3 className={s.titleMd}>
                    <Price
                      deal={data[`${dealType}Offer`]}
                      dealType={dealType}
                    />
                  </h3>
                </div>

                <ul className={cn(s.list, s.pushedTop4_6)}>
                  {data.specification && !!data.specification.rooms && (
                    <li className={st.property.listItem}>
                      <Icon className={s.iconLg} icon="room" />
                      <span
                        className={cn(s.displayInlineBlock, s.pushedTop1_2)}
                      >
                        <CountIndicator
                          count={data.specification.rooms}
                          declensionForms={[`комната`, `комнаты`, `комнат`]}
                        />
                      </span>
                    </li>
                  )}
                  {data.specification && !!data.specification.bedrooms && (
                    <li className={cn(st.property.listItem, sUtils.hideXs)}>
                      <Icon className={s.iconLg} icon="bed" />
                      <span
                        className={cn(s.displayInlineBlock, s.pushedTop1_2)}
                      >
                        <CountIndicator
                          count={data.specification.bedrooms}
                          declensionForms={[`спальня`, `спальни`, `спален`]}
                        />
                      </span>
                    </li>
                  )}
                  {data.specification && !!data.specification.floor && (
                    <li className={st.property.listItem}>
                      <Icon className={s.iconLg} icon="floor" />
                      <span
                        className={cn(s.displayInlineBlock, s.pushedTop1_2)}
                      >
                        {data.specification.floor}{' '}
                        {data && data.kind === `house` ? `этажей` : `этаж`}
                        {/* {complex.details && (
                          <span>/{complex.details.floors}</span>
                        )} */}
                      </span>
                    </li>
                  )}
                  {specification.totalArea && (
                    <li className={st.property.listItem}>
                      <Icon className={s.iconLg} icon="triangle" />
                      <span
                        className={cn(s.displayInlineBlock, s.pushedTop1_2)}
                      >
                        {specification.totalArea}&nbsp;м²
                      </span>
                    </li>
                  )}
                </ul>
              </Col>
              <Col md="4" className={cn(s.pushedTopMd2_5, s.textRight)}>
                <div className={s.maxWidth29}>
                  <Row sm="middle" className={s.extraPadding3_0}>
                    <Col sm="6" md="12">
                      <CurrentDutyCard
                        propertyCategory="city"
                        dontReplacePhoneNumber
                      />
                    </Col>
                    <Col sm="6" md="12" className={s.pushedTopMd3_5}>
                      <div className={s.btnLgContainer}>
                        <ByPropertyModal
                          propertyCategory="city"
                          propertyId={id}
                        >
                          <Button
                            className={cn(s.btnLg, sUtils.borderRadius10)}
                            size="lg"
                            kind="success"
                          >
                            Забронировать просмотр
                          </Button>
                        </ByPropertyModal>
                      </div>

                      {/* <div className={s.btnContainer}>
                        <Button className={s.btn}><Icon className={s.iconSmall} icon="heart" />В избранное</Button>
                        <Button className={cn(s.btn, sUtils.pushedLeft2)}><Icon className={s.iconSmall} icon="share" />Поделиться</Button>
                      </div> */}
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Row>
    );
  }
}

export default PropertyInfo;

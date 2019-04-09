import React, { Component, PropTypes } from 'react';

import global from 'window-or-global';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { FormattedNumber } from 'react-formatted';

// actions
import loadDuties from 'currentDuty/actions';
import { createClientLead } from 'request/actions';
import { setSharedRetargetingKey } from 'retargeting/actions';
import sendAnalytics from 'core/analytics/actions';

import { dealTypes } from 'constants/properties/dictionaries';

import ByPropertyModal from 'request/byPropertyModal';

import UI from 'ui';

import Price from './Price';

import {
  Section,
  InfoWrapper,
  InfoItemsWrapper,
  PriceBlock,
  InfoBlock,
  StPrice,
  OwnPrice,
  CallBtnWrapper,
  BookingBtn,
  CallBtn,
  CallBtnIcon,
  CallBtnLink,
  CounterNumber,
  CountIndicatorDesc,
  Unit,
} from './styled';

const {
  Visibility,
  CountIndicator,
  Grid: { Row, Col },
} = UI;

class PropertyInfo extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    dealType: PropTypes.string.isRequired,
    propertyCategory: PropTypes.string.isRequired,
  };

  render() {
    const { data } = this.props;
    const dealType = dealTypes[this.props.dealType];
    const { location = {}, specification = {}, landDetails = {} } = data;

    const currentDate = new Date();
    const currentHour = currentDate.getUTCHours();
    const isWorkTime = currentHour > 6 && currentHour < 17;

    return (
      <Section>
        <Row sm="center">
          <InfoWrapper>
            {!!data[`${dealType}Offer`] && (
              <PriceBlock>
                <StPrice>
                  <Price deal={data[`${dealType}Offer`]} dealType={dealType} />
                </StPrice>
                {/* <OwnPrice>Предложить свою цену</OwnPrice> */}
              </PriceBlock>
            )}

            <InfoItemsWrapper>
              {!!specification.bedrooms && (
                <InfoBlock>
                  <CounterNumber>{specification.bedrooms}</CounterNumber>

                  <CountIndicator
                    count={specification.bedrooms}
                    declensionForms={['cпальня', 'cпальни', 'cпален']}
                    numberHidden
                  />
                </InfoBlock>
              )}
              {landDetails.area && (
                <InfoBlock>
                  <CounterNumber>{Math.floor(landDetails.area)}</CounterNumber>
                  <CountIndicator
                    count={Math.floor(landDetails.area)}
                    declensionForms={['cотка', 'cотки', 'cоток']}
                    numberHidden
                  />
                </InfoBlock>
              )}
              {specification.area && (
                <InfoBlock>
                  <CounterNumber>
                    <FormattedNumber value={Math.floor(specification.area)} />
                  </CounterNumber>
                  <Unit>м²</Unit>
                  <CountIndicatorDesc>
                    <CountIndicator
                      count={Math.floor(specification.area)}
                      declensionForms={['кв. метр', 'кв. метра', 'кв. метров']}
                      numberHidden
                    />
                  </CountIndicatorDesc>
                </InfoBlock>
              )}
            </InfoItemsWrapper>
          </InfoWrapper>

          <Col md="4">
            <Row>
              <Col sm="6" md="12">
                <CallBtnWrapper>
                  <Visibility lg="hidden">
                    {!isWorkTime && (
                      <ByPropertyModal
                        propertyCategory="country"
                        propertyId={data.id}
                      >
                        <BookingBtn>Забронировать просмотр</BookingBtn>
                      </ByPropertyModal>
                    )}

                    {isWorkTime && (
                      <CallBtn>
                        <CallBtnIcon icon="phone" />
                        <CallBtnLink
                          href={`tel:+${global.config.phones.country}`}
                          id="comagicDTPhoneNumber"
                        />
                      </CallBtn>
                    )}
                  </Visibility>
                </CallBtnWrapper>
              </Col>
            </Row>
          </Col>
        </Row>
      </Section>
    );
  }
}

// redux connectors
const pickState = ({ currentDuty }) => ({
  state: {
    currentDuty,
  },
});

const pickActions = dispatch => {
  const actions = {
    loadDuties,
    createClientLead,
    setSharedRetargetingKey,
    sendAnalytics,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(
  pickState,
  pickActions,
)(PropertyInfo);

import React, { Component } from 'react';
import styled from 'styled-components';
import ReactSwipe from 'react-swipe';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Card from '../Card';
import media from '../../../styles/media';
import UI from '../../../ui';

import dotIcon from './img/dot.png';
import dotActiveIcon from './img/dot-active.png';

// actions
import loadProperties from '../../../core/countryProperties/actions/list/load';

// constants
import { resourceName } from '../../../core/countryProperties/constants/defaults';
import { dealTypes } from '../../../constants/properties/dictionaries';

const {
  Grid: { Row: BaseRow, Col },
  Visibility,
} = UI;

const Wrapper = styled.div`
  margin: 0 -5px;
  margin-top: 24px;
  padding-bottom: 21.5px;

  ${media.xs`
    margin: 0;
    margin-top: 40px;
    padding-bottom: 40px;
  `}

  ${media.md`
    margin-right: -5px;
    margin-left: -5px;
  `}
`;

const Title = styled.h3`
  margin: 0;
  line-height: 28px;
  font-size: 21px;
  text-align: center;
  margin-bottom: 8px;

  color: #000000;

  ${media.xs`
    margin-bottom: 16px;
    text-align: left;
  `}

  ${media.md`
    margin-bottom: 12px;
  `}
`;

const Carousel = styled(ReactSwipe)`
  width: calc(100% + 20px);
  margin: 0 -10px;

  ${media.xs`
    display: none;
  `}
`;

const MobileCard = styled.div`
  padding: 0 5px;
`;

const Row = styled(BaseRow)`
  flex-wrap: nowrap;
  overflow: scroll;

  ${media.md`
    flex-wrap: wrap;
    overflow: hidden;
    margin: 0 -15px;
  `}
`;

const DotsContainer = styled.div`
  margin-top: 5.5px;
  display: flex;
  justify-content: center;

  ${media.xs`
    display: none;
  `}
`;

const DotButton = styled.button`
  margin: 0;
  padding: 2.5px;
  border: none;
  background: none;
`;

const DotIcon = styled.img`
  width: 10px;
  height: 10px;
`;

class Similar extends Component {
  state = { currentSlide: 0 };

  componentWillMount() {
    this.load(this.props);

    if (typeof window !== 'undefined') window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.id) {
      this.load(nextProps);
    }
  }

  load(props) {
    const { actions, id } = props;
    const dealType = dealTypes[props.dealType];

    actions.loadProperties({}, this.group, { id, dealType });
  }

  group = 'similar';
  resource = `${resourceName}.${this.group}`;

  render() {
    const { currentSlide } = this.state;
    const { state, dealType } = this.props;

    const { ids = [] } = state.countryProperties[this.group] || {};

    const hasItems = !!ids.length;

    if (hasItems) {
      return (
        <Wrapper>
          <Title>Похожие объекты</Title>
          <Carousel
            // eslint-disable-next-line no-return-assign
            innerRef={el => (this.carousel = el)}
            swipeOptions={{
              callback: index => this.setState({ currentSlide: index }),
            }}
          >
            {ids.map(id => (
              <MobileCard key={id}>
                <Card dealType={dealType} id={id} />
              </MobileCard>
            ))}
          </Carousel>
          <Visibility xs="hidden" sm="block" md="block" lg="block">
            <Row>
              {ids.map(id => (
                <Col key={id} xs="8" sm="6" md="4">
                  <Card dealType={dealType} id={id} />
                </Col>
              ))}
            </Row>
          </Visibility>
          <DotsContainer>
            {ids.map((id, index) => (
              <DotButton
                key={`dot-${id}`}
                onClick={() => this.carousel.slide(index, 300)}
              >
                <DotIcon
                  alt={id}
                  src={index === currentSlide ? dotActiveIcon : dotIcon}
                />
              </DotButton>
            ))}
          </DotsContainer>
        </Wrapper>
      );
    }

    return <Wrapper />;
  }
}

const pickState = state => {
  const { countryProperties } = state;

  return {
    state: {
      countryProperties,
    },
  };
};

const pickActions = dispatch => {
  const actions = {
    loadProperties,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(
  pickState,
  pickActions,
)(Similar);

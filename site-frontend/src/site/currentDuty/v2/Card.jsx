import React, { Component, PropTypes } from 'react';
import global from 'window-or-global';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// actions
import loadDuties from 'site/currentDuty/actions';

import UI from 'site/ui';
import StaticMask from 'core/components/ui/staticMask';

import { cloudfront } from 'core/config/resources';

import styled from 'styled-components';
import media from 'site/styles/media';

const { RetinaImage, Image } = UI;

const Wrapper = styled.div`
  display: flex;
  flex-grow: 0 1 auto;
  align-items: center;
  margin: 0;
  text-align: left;
`;

const ImageWrapper = styled.div`
  display: inline-block;
  background: ${p => p.theme.brandWhite};
  border-radius: 10rem;
  order: 0;

  ${media.sm`
    order: 1;
    margin-right: 2rem;
  `};
`;

const Avatar = styled(RetinaImage)`
  vertical-align: middle;
  border-radius: 50%;
`;

const DescWrapper = styled.div`
  order: 2;
  padding: 0;
  padding-left: 2rem;

  ${media.sm`
    order: 2;
    padding: 0;
  `};
`;

const Title = styled.div`
  margin: 0;
  font-size: 2.2rem;
  font-weight: bold;

  ${media.md`
    font-size: 2rem;
  `};
`;

const Phone = styled.a`
  display: inline-block;
  margin: 0;
  margin-top: 1rem;
  font-size: 2.2rem;
  font-weight: 400;
  text-decoration: none;
  color: inherit;

  &:hover,
  &:focus {
    color: inherit;
    text-decoration: none;
  }

  ${media.md`
    font-size: 2rem;
  `};
`;

class Card extends Component {
  static propTypes = {
    propertyCategory: PropTypes.string.isRequired,
  };

  componentWillMount() {
    this.load(this.props);
  }

  load({ actions, propertyCategory }) {
    actions.loadDuties(propertyCategory);
  }

  render() {
    const { propertyCategory, state } = this.props;
    const data = state.currentDuty[propertyCategory] || {};

    const phoneNumberElId = this.props.dontReplacePhoneNumber ? undefined : 'comagicDTPhoneNumber';

    return (
      <Wrapper className={this.props.className}>
        <ImageWrapper>
          {!!data.photo && (
            <Avatar
              width={100}
              height={100}
              id={data.photo.id}
              src={`${global.config.cloudfront || cloudfront}/${data.photo.id}`}
              size={128}
            />
          )}
          {!data.photo &&
          global.location && (
            <Image
              src="https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/placeholder-photo.svg"
              kind="circle"
              width={100}
              height={100}
            />
          )}
        </ImageWrapper>

        <DescWrapper>
          <Title>
            {data.firstName} {data.lastName}
          </Title>
          <Phone href={`tel:+${global.config.phones[propertyCategory]}`} id={phoneNumberElId}>
            <StaticMask pattern="+1 (111) 111-11-11">
              {global.config.phones[propertyCategory]}
            </StaticMask>
          </Phone>
        </DescWrapper>
      </Wrapper>
    );
  }
}

const pickState = ({ currentDuty }) => ({
  state: { currentDuty },
});

const pickActions = (dispatch) => {
  const actions = {
    loadDuties,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(pickState, pickActions)(Card);

import React, { Component, PropTypes } from 'react';
import global from 'window-or-global';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// actions
import loadDuties from 'currentDuty/actions';

import UI from 'ui';
const { RetinaImage, Image } = UI;
import StaticMask from 'core/components/ui/staticMask';

import cn from 'classnames';
import s from 'styles/property/broker';

import { cloudfront } from 'core/config/resources';

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

    const phoneNumberElId = this.props.dontReplacePhoneNumber
      ? undefined
      : 'comagicDTPhoneNumber';

    return (
      <div className={cn(s.card, this.props.className)}>
        <div className={s.descriptionContainer}>
          <p className={s.title}>
            {data.firstName} {data.lastName}
          </p>
          <a
            className={s.phone}
            href={`tel:+${global.config.phones[propertyCategory]}`}
            id={phoneNumberElId}
          >
            <StaticMask pattern="+1 (111) 111-11-11">
              {global.config.phones[propertyCategory]}
            </StaticMask>
          </a>
        </div>

        <div className={s.imageContainer}>
          {!!data.photo && (
            <RetinaImage
              width={70}
              height={70}
              id={data.photo.id}
              src={`${global.config.cloudfront || cloudfront}/${data.photo.id}`}
              size={128}
              className={s.avatar}
            />
          )}
          {!data.photo && global.location && (
            <Image
              src="https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/placeholder-photo.svg"
              kind="circle"
              width={70}
              height={70}
            />
          )}
        </div>
      </div>
    );
  }
}

const pickState = ({ currentDuty }) => ({
  state: { currentDuty },
});

const pickActions = dispatch => {
  const actions = {
    loadDuties,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(
  pickState,
  pickActions,
)(Card);

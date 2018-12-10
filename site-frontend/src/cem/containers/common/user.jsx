import React, { Component } from 'react';

import { cloudfront } from 'core/config/resources';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import StaticMask from 'core/components/ui/staticMask';

import UI from 'cem/components/ui';
const { Image, Loading, Media, Heading } = UI;

import s from 'cem/styles/id/content';

import { loadUser } from 'cem/actions/users/id/load';

const UserPhoto = ({ id }) => (
  <Image
    src={
      id ? (
        `${cloudfront}/${id}-128`
      ) : (
        'https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/placeholder-photo.svg'
      )
    }
    kind="circle"
    width="94"
    height="94"
    title=""
    alt=""
  />
);

const UserDescription = props => (
  <div className={s.mediaContainer}>
    <h4 className={s.mediaTitleLg}>
      {props.firstName} {props.lastName}
    </h4>
    {props.workPhoneNumber && (
      <p className={s.mediaText}>
        <StaticMask pattern="+1 (111) 111-11-11">{props.workPhoneNumber}</StaticMask>
      </p>
    )}
    <p className={s.mediaText}>{props.email}</p>
  </div>
);

class User extends Component {
  componentWillMount() {
    const { actions, id } = this.props;

    actions.loadUser(id);
  }

  componentWillReceiveProps(nextProps) {
    const { actions, id } = this.props;

    if (nextProps.id !== id) {
      actions.loadUser(nextProps.id);
    }
  }

  render() {
    const { id, state, title = 'Пользователь', simple } = this.props;
    const { data, isFetching } = state.users[id] || {};

    return (
      <section>
        {!simple && <Heading size="md">{title}</Heading>}
        {!data && isFetching && <Loading />}
        {data &&
        !simple && (
          <Media
            left={<UserPhoto id={data.photo && data.photo.id} />}
            body={<UserDescription {...data} />}
          />
        )}
        {data &&
        simple && (
          <span>
            {data.firstName}&nbsp;{data.lastName}
          </span>
        )}
      </section>
    );
  }
}

const pickState = ({ users }) => ({
  state: { users },
});

const mapDispatch = dispatch => ({
  actions: bindActionCreators({ loadUser }, dispatch),
});

export default connect(pickState, mapDispatch)(User);

import React, { Component } from 'react';
import { Link } from 'react-router';

// redux
import { connect } from 'react-redux';
import { dispatch } from 'cem/store';

// actions
import loadUser from 'cem/_users/actions/load';

// ui
import UI from 'cem/components/ui';
const { Heading, Icon, Loading, Media, StaticMask } = UI;

// styles
import s from 'cem/styles/id/content';

// constants
import { cloudfront } from 'core/config/resources';

const Image = ({ id }) => {
  const src = id
    ? `${cloudfront}/${id}-128`
    : 'https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/placeholder-photo.svg';

  return <UI.Image src={src} kind="circle" width="64" height="64" />;
};

const Description = ({ firstName, lastName, workPhoneNumber, email }) =>
  (<div>
    <h4 className={s.mediaTitleLg}>
      {lastName || ''} {firstName || ''}
    </h4>
    <p className={s.mediaText}>
      <StaticMask pattern="+1 (111) 111-11-11">
        {workPhoneNumber}
      </StaticMask>
    </p>
    <p className={s.mediaText}>
      {email}
    </p>
  </div>);

class UserInlineCard extends Component {
  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const isUpdated = this.props.id !== nextProps.id;

    if (isUpdated) {
      this.load(nextProps);
    }
  }

  load({ id, user }) {
    if (id && !user.data) return dispatch(loadUser(id));
  }

  render() {
    const { user, headingSize = 'md', title = 'Ответственный' } = this.props;
    const { data = {}, isFetching } = user;
    const { photo = {} } = data;

    return (
      <div className={this.props.className}>
        <Heading size={headingSize}>
          {title}

          {data.id &&
            <Link className={s.linkIcon} to={`/staff/${data.id}`}>
              <Icon className={s.icon} icon="arrow" />
            </Link>}
        </Heading>

        {!data.id && isFetching && <Loading />}

        {data.id &&
          <Media
            left={<Image id={photo && photo.id} />}
            body={<Description id={data.id} {...data} />}
          />}
      </div>
    );
  }
}

const pickState = ({ _users }, { id }) => ({
  user: _users[id] || {},
});

export default connect(pickState)(UserInlineCard);

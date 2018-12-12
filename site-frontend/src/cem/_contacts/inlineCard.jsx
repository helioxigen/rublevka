import React, { Component } from 'react';
import { Link } from 'react-router';

// redux
import { connect } from 'react-redux';
import { dispatch } from 'cem/store';

// actions
import loadContact from 'cem/_contacts/actions/load';

// ui
import UI from 'cem/components/ui';
const { Heading, Icon, Loading, Media, StaticMask } = UI;

// styles
import s from 'cem/styles/id/content';

// constants
import { cloudfront } from 'core/config/resources';

const Image = ({ id }) => {
  const src = id
    ? `${cloudfront}/${id}-thumbnail-128`
    : 'https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/placeholder-photo.svg';

  return <UI.Image src={src} kind="circle" width="64" height="64" />;
};

const Description = ({ details = {} }) => (
  <div>
    <h4 className={s.mediaTitleLg}>
      {details.lastName} {details.firstName} {details.middleName}
    </h4>
    <p className={s.mediaText}>
      <StaticMask pattern="+1 (111) 111-11-11">{details.phoneNumber}</StaticMask>
    </p>
    <p className={s.mediaText}>{details.email}</p>
  </div>
);

class ContactInlineCard extends Component {
  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const isUpdated = this.props.id !== nextProps.id;

    if (isUpdated) {
      this.load(nextProps);
    }
  }

  load({ id }) {
    if (id) return dispatch(loadContact(id));
  }

  render() {
    const { contact, headingSize = 'md' } = this.props;
    const { data = {}, isFetching } = contact;
    const { photo = {} } = data;

    return (
      <div className={this.props.className}>
        <Heading size={headingSize}>
          Клиент
          {data.id && (
            <Link className={s.linkIcon} to={`/contacts/${data.id}`}>
              <Icon className={s.icon} icon="arrow" />
            </Link>
          )}
        </Heading>

        {!data.id && isFetching && <Loading />}

        {data.id && (
          <Media
            left={<Image id={photo && photo.id} />}
            body={<Description id={data.id} {...data} />}
          />
        )}
      </div>
    );
  }
}

const pickState = ({ _contacts }, { id }) => ({
  contact: _contacts[id] || {},
});

export default connect(pickState)(ContactInlineCard);

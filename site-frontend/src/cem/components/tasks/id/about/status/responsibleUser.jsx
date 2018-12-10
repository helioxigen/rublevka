import React, { Component } from 'react';

import { idResourcer } from 'core/decorators/fetcher';

import UI from 'cem/components/ui';
const { Image, Media } = UI;

import s from 'cem/styles/id/content';

const ResponsibleUserImage = ({ src }) =>
  (<Image
    src={
      src
        ? `${src}-64`
        : 'https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/placeholder-photo.svg'
    }
    kind="circle"
    width="64"
    height="64"
  />);

const ResponsibleUserDescription = props =>
  (<div>
    <h4 className={s.mediaTitleLg}>{`${props.firstName || ''} ${props.lastName || ''}`}</h4>
    <div>
      <a className={s.mediaText} href={`tel:${props.workPhoneNumber}`}>
        {props.workPhoneNumber}
      </a>
    </div>
    <div>
      <a className={s.mediaText} href={`mailto:${props.email}`}>
        {props.email}
      </a>
    </div>
  </div>);

class ResponsibleUser extends Component {
  render() {
    const { itemData } = this.props;

    return (
      <section>
        <Media
          left={<ResponsibleUserImage src={itemData.photo && itemData.photo.url} />}
          body={<ResponsibleUserDescription {...itemData} />}
        />
      </section>
    );
  }
}

export default idResourcer({
  id: 'users',
  linkedResourcesSchemes: [],
  apiPath: '/v1/users/staff',
})(ResponsibleUser);

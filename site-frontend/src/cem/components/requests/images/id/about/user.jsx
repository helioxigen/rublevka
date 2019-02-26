import React from 'react';

import UI from 'cem/components/ui';
const { Image, Media, Heading } = UI;

import s from 'cem/styles/id/content';

const ResponsibleUserPhoto = ({ src }) => (
  <Image
    src={
      src
        ? `${src}-128`
        : 'https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/placeholder-photo.svg'
    }
    kind="circle"
    width="94"
    height="94"
    title=""
    alt=""
  />
);

const ResponsibleUserDescription = props => (
  <div className={s.mediaContainer}>
    <h4 className={s.mediaTitleLg}>{`${props.firstName} ${props.lastName}`}</h4>
    <p className={s.mediaText}>{props.workPhoneNumber}</p>
    <p className={s.mediaText}>{props.email}</p>
  </div>
);

export default props => (
  <section>
    <Heading size="md">Заказчик</Heading>
    <Media
      left={<ResponsibleUserPhoto src={props.photo ? props.photo.url : null} />}
      body={<ResponsibleUserDescription {...props} />}
    />
  </section>
);

import React, { Component } from 'react';
// import { Link } from 'react-router';

import { idResourcer } from 'core/decorators/fetcher';

import UI from 'cem/components/ui';
const { Grid, Image, Media } = UI;

import s from 'cem/styles/id/content';

const ContactImage = ({ src }) => (
  <Image
    src={
      src
        ? `${src}-64`
        : 'https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/placeholder-photo.svg'
    }
    kind="circle"
    width="64"
    height="64"
  />
);

const ContactDescription = ({ details = {} }) => (
  <div>
    <h4 className={s.heading}>{`${details.firstName || ''} ${details.lastName ||
      ''}`}</h4>
    <div>
      <a className={s.mediaText} href={`tel:${details.phoneNumber}`}>
        {details.phoneNumber}
      </a>
    </div>
    <div>
      <a className={s.mediaText} href={`mailto:${details.email}`}>
        {details.email}
      </a>
    </div>
  </div>
);

class Contact extends Component {
  render() {
    const { /* id, */ itemData } = this.props;

    return (
      <section>
        {/* <Heading size="md">
          Клиент
          <Link className={s.linkIcon} to={`/contacts/${id}`}><Icon className={s.icon} icon="arrow" /></Link>
        </Heading> */}
        <Grid.Row>
          <Grid.Col xs="20">
            <Media
              left={
                <ContactImage
                  src={
                    itemData.details &&
                    itemData.details.photo &&
                    itemData.details.photo.url
                  }
                />
              }
              body={<ContactDescription {...itemData} />}
            />
          </Grid.Col>
        </Grid.Row>
      </section>
    );
  }
}

export default idResourcer({
  id: 'contacts',
  linkedResourcesSchemes: [],
})(Contact);

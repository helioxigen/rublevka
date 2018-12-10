import React, { Component } from 'react';
import { Link } from 'react-router';

import { connect } from 'react-redux';

import { cloudfront } from 'core/config/resources';

import cn from 'classnames';
import s from 'site/styles/landing/jqestate/selections';

import { nameToSlug } from 'core/helpers/nameToSlug';

function getImgUrl(data) {
  const { photo = {} } = data;
  if (photo.id) {
    return `url(${global.config.cloudfront || cloudfront}/${photo.id}-256)`;
  } else if (typeof window !== 'undefined') {
    return 'url(https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/placeholder.jpg)';
  }
}

class SelectionCard extends Component {
  render() {
    const { state, id } = this.props;
    const { selections = {} } = state;
    const selection = selections[id] || {};
    const { data = {} } = selection;

    const imgUrl = getImgUrl(data);

    return (
      <Link to={`/podborky/${nameToSlug(data.name)}_${id}`} className={s.card}>
        <div className={cn(s.layout, this.props.className)} style={{ backgroundImage: imgUrl }} />
        <div className={s.content}>
          <p className={s.title}>{data.name}</p>
          <p className={s.text}>{data.title}</p>
        </div>
      </Link>
    );
  }
}

// redux connectors
const pickState = (state) => {
  const { selections, filters, pagination, order } = state;

  return {
    state: {
      selections,
      filters,
      pagination,
      order,
    },
  };
};

export default connect(pickState)(SelectionCard);

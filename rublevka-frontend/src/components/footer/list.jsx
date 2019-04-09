import React, { Component } from 'react';
import { Link } from 'react-router';

import UI from 'ui';
const { Button, Visibility } = UI;

import { settlements, routesToSlug } from 'components/footer/constants';

import s from 'styles/components/footer';

import { nameToSlug } from 'core/helpers/nameToSlug';

class FooterList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowAll: false,
    };
  }

  toggle = () => {
    this.setState(prevState => ({ isShowAll: !prevState.isShowAll }));
  };

  render() {
    const { title, group } = this.props;
    const list = settlements[group] || {};

    const keys = Object.keys(list);
    const showedKeys = this.state.isShowAll ? keys : keys.slice(0, 10);

    const isLongList = keys.length > 10;

    return (
      <div className={s.navColumn}>
        <Link
          className={s.linkTitle}
          to={`/zagorodnaya/shosse/${routesToSlug[group]}/prodaja`}
        >
          {title}
        </Link>
        <hr className={s.divider} />

        {showedKeys.map(id => (
          <div key={id}>
            <Link
              className={s.link}
              to={`/zagorodnaya/kottedzhnye-poselki/${nameToSlug(
                list[id],
              )}_${id}`}
            >
              {list[id]}
            </Link>
          </div>
        ))}

        {isLongList && (
          <Visibility xs="hidden" sm="hidden">
            <Button onClick={this.toggle} className={s.loadBtn}>
              {this.state.isShowAll ? 'Скрыть' : 'Показать еще'}
            </Button>
          </Visibility>
        )}
      </div>
    );
  }
}

export default FooterList;

import React, { Component } from 'react';

import UI from 'ui';

import { settlements } from 'components/footer/constants';

import { nameToSlug } from 'core/helpers/nameToSlug';

import { StLink, LoadBtn } from './styled';

const { Visibility } = UI;

class FooterList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowAll: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      isShowAll: !prevState.isShowAll,
    }));
  }

  render() {
    const { group } = this.props;

    const list = settlements[group] || {};

    const keys = Object.keys(list);
    const showedKeys = this.state.isShowAll ? keys : keys.slice(0, 10);

    const isLongList = keys.length > 10;

    return (
      <div>
        {showedKeys.map(id => (
          <StLink
            to={`/zagorodnaya/kottedzhnye-poselki/${nameToSlug(
              list[id],
            )}_${id}`}
          >
            {list[id]}
          </StLink>
        ))}

        {isLongList && (
          <Visibility xs="hidden" sm="hidden">
            <LoadBtn onClick={this.toggle}>
              {this.state.isShowAll ? 'Скрыть' : 'Показать еще'}
            </LoadBtn>
          </Visibility>
        )}
      </div>
    );
  }
}

export default FooterList;

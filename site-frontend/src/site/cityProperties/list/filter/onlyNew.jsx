import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import UI from 'site/ui';
const {
   Checkbox,
 } = UI;

import s from 'site/styles/components/satellites/filter.css';
import sUtils from 'site/styles/utils';
import st from 'site/styles/themes';
const styles = {
  ...s,
  ...sUtils,
};

const cssOptions = {
  allowMultiple: true,
};

const key = 'recentlyUpdated';

class Kind extends Component {
  onUpdate() {
    const { selected = {} } = this.props;

    if (!selected[key]) {
      this.props.updateFilter(key, true);
    } else {
      this.props.removeFilter(key);
    }
  }

  render() {
    const theme = st.filterSatellites;
    const { selected = {} } = this.props;

    const isChecked = !!selected[key];

    return (
      <div styleName="checkboxContainer">
        <Checkbox controlClassName={theme.checkboxControl} checked={isChecked} handleChange={() => this.onUpdate()}>
          <span className={theme.checkboxLabel}>Только новые</span>
        </Checkbox>
      </div>
    );
  }
}

export default CSSModules(Kind, styles, cssOptions);

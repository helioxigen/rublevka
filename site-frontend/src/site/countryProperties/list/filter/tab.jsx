import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import UI from 'site/ui';
const { Button, Icon } = UI;

import cn from 'classnames';
import s from 'site/styles/components/satellites/filter.css';
import st from 'site/styles/themes';
const styles = { ...s };

const cssOptions = {
  allowMultiple: true,
};

class Tab extends Component {
  render() {
    const { layout, title, icon, onChange, active = false } = this.props;

    return (
      <Button block className={cn(st.filterSatellites.tab, !!active && st.filterSatellites.activeTab)} kind="primary" size="lg" type="button" onClick={() => onChange(layout)}>
        <span styleName="iconContainer">
          <Icon styleName={`${icon}`} icon={icon} />
        </span>
        {title}
      </Button>
    );
  }
}

export default CSSModules(Tab, styles, cssOptions);

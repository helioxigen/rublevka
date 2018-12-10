import React, { Component, PropTypes } from 'react';

import UI from 'site/ui';
const { Slider2 } = UI;

import s from 'site/styles/landing/satellites/filter';
import sSlider from 'site/styles/ui/slider';

const dictionaries = {
  sale: {
    min: 0,
    max: 30,
    step: 1,
    labelFormat: {
      prefix: `$`,
      postfix: ` млн`,
      onMaxValue: `30+`,
    },
  },
  rent: {
    min: 0,
    max: 50,
    step: 2.5,
    labelFormat: {
      prefix: `$`,
      postfix: ` тыс`,
      onMaxValue: `50+`,
    },
  },
};

class Price extends Component {
  static propTypes = {
    selected: PropTypes.object.isRequired,
    updateFilter: PropTypes.func.isRequired,
    onBeforeChange: PropTypes.func.isRequired,
    onAfterChange: PropTypes.func.isRequired,
    dealType: PropTypes.string.isRequired,
  }

  onUpdate(ref, value) {
    this.props.updateFilter(ref, value);
  }

  render() {
    const { selected = {}, onBeforeChange, onAfterChange } = this.props;
    const { dealType } = this.props;
    const key = dealType;

    const { min, max, step, labelFormat } = dictionaries[key];
    const value = selected[key] || {};

    return (
      <div className={s.sliderContainer}>
        <Slider2
          reference={key}

          className={sSlider.landing}
          barClassName={sSlider.landingBar}
          handleClassName={sSlider.landingHandle}
          handleTitleClassName={sSlider.landingHandleTitle}

          handleChange={::this.onUpdate}
          onBeforeChange={onBeforeChange}
          onAfterChange={onAfterChange}

          min={min}
          max={max}
          step={step}
          labelFormat={labelFormat}

          value={value}
        />
      </div>
    );
  }
}

export default Price;

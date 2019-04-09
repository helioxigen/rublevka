import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import SelectGroup from 'core/components/ui/select/selectGroup';

import UI from 'ui';
const {
  Grid: { Container, Row, Col },
} = UI;

import s from 'styles/components/satellites/filter.css';
import sSlider from 'styles/ui/slider.css';
import sUtils from 'styles/utils.css';
import st from 'styles/themes';

const styles = {
  ...s,
  ...sUtils,
  ...sSlider,
};

import { areas, landAreas } from 'constants/leads/options';

const cssOptions = {
  allowMultiple: true,
};

class Square extends Component {
  onUpdate(ref, value, key) {
    const { selected = {} } = this.props;
    const distance = selected[key] || {};
    const stateRef = ref === 'min' ? 'max' : 'min';

    const options = {
      [stateRef]: distance[stateRef],
      [ref]: value,
    };

    this.props.updateFilter(key, options);
  }

  render() {
    const { selected = {} } = this.props;
    const { area = {}, landArea = {} } = selected;

    return (
      <section>
        <div className={st.filterSatellites.desktopTitle}>Дом</div>
        <Container fluid styleName="contentContainer">
          <Row md="middle">
            <Col md="10">
              <div className={s.selectContainer}>
                <SelectGroup
                  options={areas}
                  selected={area}
                  onUpdate={(key, value) => this.onUpdate(key, value, 'area')}
                />
              </div>
            </Col>
          </Row>
        </Container>

        <div className={st.filterSatellites.desktopTitle}>Участок</div>
        <Container fluid styleName="contentContainer">
          <Row md="middle">
            <Col md="10">
              <div className={s.selectContainer}>
                <SelectGroup
                  options={landAreas}
                  selected={landArea}
                  onUpdate={(key, value) =>
                    this.onUpdate(key, value, 'landArea')
                  }
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default CSSModules(Square, styles, cssOptions);

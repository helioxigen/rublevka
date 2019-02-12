import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import SelectGroup from 'core/components/ui/select/selectGroup';

import UI from 'site/ui';
const {
  Grid: { Container, Row, Col },
} = UI;

import s from 'site/styles/components/satellites/filter.css';
import sSlider from 'site/styles/ui/slider.css';
import sUtils from 'site/styles/utils.css';
import st from 'site/styles/themes';

const styles = {
  ...s,
  ...sUtils,
  ...sSlider,
};

import { bedrooms, totalAreas, floors } from 'site/constants/leads/options';

const cssOptions = {
  allowMultiple: true,
};

class Parameters extends Component {
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
    const { rooms = {}, totalArea = {}, floor = {} } = selected;

    return (
      <section>
        <div className={st.filterSatellites.desktopTitle}>Комнат</div>
        <Container fluid styleName="contentContainer">
          <Row md="middle">
            <Col md="10">
              <div className={s.selectContainer}>
                <SelectGroup
                  options={bedrooms}
                  selected={rooms}
                  onUpdate={(key, value) => this.onUpdate(key, value, 'rooms')}
                />
              </div>
            </Col>
          </Row>
        </Container>

        <div className={st.filterSatellites.desktopTitle}>Площадь</div>
        <Container fluid styleName="contentContainer">
          <Row md="middle">
            <Col md="10">
              <div className={s.selectContainer}>
                <SelectGroup
                  options={totalAreas}
                  selected={totalArea}
                  onUpdate={(key, value) =>
                    this.onUpdate(key, value, 'totalArea')
                  }
                />
              </div>
            </Col>
          </Row>
        </Container>

        <div className={st.filterSatellites.desktopTitle}>Этаж</div>
        <Container fluid styleName="contentContainer">
          <Row md="middle">
            <Col md="10">
              <div className={s.selectContainer}>
                <SelectGroup
                  options={floors}
                  selected={floor}
                  onUpdate={(key, value) => this.onUpdate(key, value, 'floor')}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default CSSModules(Parameters, styles, cssOptions);

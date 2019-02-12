import React, { Component } from 'react';

import UI from 'site/ui';
const {
  Slider2,
  Form: { Group },
  Grid: { Row, Col, Container },
} = UI;

import RoomSelect from 'site/ui/roomSelect';

import cn from 'classnames';
import s from 'site/styles/complexes/filter';
import sUtils from 'site/styles/utils';
import sSlider from 'site/styles/ui/slider';

const dictionaries = {
  area: {
    min: 0,
    max: 2000,
    step: 200,
    labelFormat: {
      postfix: ` м²`,
      onMaxValue: `2000+`,
    },
  },
  sale: {
    min: 0,
    max: 20,
    step: 1,
    labelFormat: {
      prefix: `$`,
      postfix: ` млн`,
      onMaxValue: `20+`,
    },
  },
};

class Properties extends Component {
  onUpdate(ref, value) {
    this.props.updateFilter(ref, value);
  }

  render() {
    const { selected = {} } = this.props;

    return (
      <Container fluid className={s.resetContainerWidthSm}>
        <Row>
          <Col sm="6" md="12" className={s.dividerBottomMdRightSm}>
            <div className={s.apartmentContainer}>
              <Container className={s.resetContainerWidth}>
                <Row>
                  <Col xs="12">
                    <h3 className={s.title}>Квартиры</h3>
                  </Col>
                </Row>

                <Row>
                  <Col
                    md="4"
                    className={cn(
                      sUtils.positionRelative,
                      sUtils.pushedBottomXs3_5,
                      s.extraPadding,
                    )}
                  >
                    <Group>
                      <label className={s.label}>Стоимость</label>

                      <Slider2
                        reference="sale"
                        // className={st.slider.filter}
                        // barClassName={st.slider.filterBar}
                        handleClassName={cn(
                          sSlider.settlementsHandle,
                          sSlider.settlements,
                        )}
                        handleTitleClassName={sSlider.settlementsHandleTitle}
                        handleChange={::this.onUpdate}
                        min={dictionaries[`sale`].min}
                        max={dictionaries[`sale`].max}
                        step={dictionaries[`sale`].step}
                        labelFormat={dictionaries[`sale`].labelFormat}
                        value={selected[`sale`]}
                      />
                    </Group>
                  </Col>
                  <Col
                    md="4"
                    className={cn(
                      sUtils.positionRelative,
                      sUtils.pushedBottomXs3_5,
                      s.extraPadding,
                    )}
                  >
                    <Group>
                      <label className={s.label}>Площадь</label>

                      <Slider2
                        reference="area"
                        handleClassName={cn(
                          sSlider.settlementsHandle,
                          sSlider.settlements,
                        )}
                        handleTitleClassName={sSlider.settlementsHandleTitle}
                        handleChange={::this.onUpdate}
                        min={dictionaries[`area`].min}
                        max={dictionaries[`area`].max}
                        step={dictionaries[`area`].step}
                        labelFormat={dictionaries[`area`].labelFormat}
                        value={selected[`area`]}
                      />
                    </Group>
                  </Col>
                  <Col md="4" className={s.extraPadding}>
                    <div>
                      <label className={s.label}>Комнат</label>
                      <RoomSelect
                        className={cn(sUtils.fullWidth, sUtils.pushedTop_7)}
                        reference="rooms"
                        buttonClassName={s.btnGroup}
                        buttonActiveClassName={s.active}
                        lastButtonClassName={s.resetRightBorderRadius}
                        value={selected[`rooms`]}
                        onChange={::this.onUpdate}
                      />
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Properties;

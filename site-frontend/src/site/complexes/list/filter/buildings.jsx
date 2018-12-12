import React, { Component } from 'react';
import { filter } from 'core/config/constants';

import UI from 'site/ui';
const {
  CheckboxGroup, Checkbox,
  Form: { Group },
  Grid: { Row, Col, Container },
} = UI;

import cn from 'classnames';
import s from 'site/styles/complexes/filter';
import sUtils from 'site/styles/utils';

class Buildings extends Component {
  onUpdate(ref, value) {
    this.props.updateFilter(ref, value);
  }

  render() {
    const { selected = {} } = this.props;

    return (
      <Container fluid className={s.resetContainerWidthSm}>
        <Row>
          <Col sm="6" md="12">
            <div className={s.buildingContainer}>
              <Container className={s.resetContainerWidth}>
                <Row>
                  <Col xs="12">
                    <h3 className={s.title}>Здание</h3>
                  </Col>
                </Row>
                <Row>
                  <Col md="4" className={s.extraPadding}>
                    <Group>
                      <CheckboxGroup
                        labelClassName={cn(s.label, sUtils.pushedBottom1_5)}
                        checkboxClassName={s.checkbox}
                        controlClassName={s.checkboxControl}
                        handleChange={::this.onUpdate}
                        reference="constructionStage"
                        items={filter.constructionStage}
                        selected={selected[`constructionStage`]}
                      >
                        Стадия строительства
                      </CheckboxGroup>
                    </Group>
                  </Col>
                  <Col md="4" className={s.extraPadding}>
                    <Group>
                      <CheckboxGroup
                        labelClassName={cn(s.label, sUtils.pushedBottom1_5)}
                        checkboxClassName={s.checkbox}
                        controlClassName={s.checkboxControl}
                        handleChange={::this.onUpdate}
                        reference="constructionKind"
                        items={filter.constructionKind}
                        selected={selected[`constructionKind`]}
                      >
                        Материал дома
                      </CheckboxGroup>
                    </Group>
                  </Col>
                  <Col md="4" className={s.extraPadding}>
                    <Group>
                      <label className={cn(s.label, sUtils.pushedBottom1_5)}>Парковка</label>
                      <Checkbox
                        className={s.checkbox}
                        controlClassName={s.checkboxControl}
                        reference="parkings"
                        checked={!!selected[`parkings`]}
                        handleChange={::this.onUpdate}
                      >
                        паркинг
                      </Checkbox>
                      <Checkbox
                        className={s.checkbox}
                        controlClassName={s.checkboxControl}
                        reference="undergroundGarages"
                        checked={!!selected[`undergroundGarages`]}
                        handleChange={::this.onUpdate}
                      >
                        подземный гараж
                      </Checkbox>
                    </Group>
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

export default Buildings;

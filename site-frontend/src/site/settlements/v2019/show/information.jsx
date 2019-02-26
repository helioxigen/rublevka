import React, { Component } from 'react';

import { dictionary } from 'core/config/constants';

import UI from 'site/ui';
const {
  Loading,
  ParamList,
  Button,
  Grid: { Container, Row, Col },
} = UI;

import cn from 'classnames';
import s from 'site/styles/settlements/id/information';
import st from 'site/styles/themes';
import sUtils from 'site/styles/utils';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: 'common',
    };
  }

  toggle(currentTab) {
    this.setState({ currentTab });
  }

  render() {
    const { isFetching, data = {} } = this.props;
    const { details = {} } = data;
    const { internalInfrastructure = [], landState = [] } = details;

    const hasInfrastructure = internalInfrastructure.length > 0;

    const hasCommonDetails =
      details.area || details.foundationYear || !!landState.length;
    const hasEnergyDetails = details.gasSupply || details.powerSupply;
    const hasWaterDetails = details.waterSupply || details.sewers;

    const hasAnyDetails =
      hasCommonDetails || hasEnergyDetails || hasWaterDetails;

    return (
      <section>
        {(hasAnyDetails || hasInfrastructure) && (
          <Container fluid className={s.mainContainer}>
            <Row xs="center">
              <Col xs="12" className={s.divider}>
                {hasAnyDetails && (
                  <Button
                    className={cn(
                      st.settlement.tab,
                      this.state.currentTab === 'common' &&
                        st.settlement.tabActive,
                    )}
                    onClick={() => this.toggle('common')}
                  >
                    Общее
                  </Button>
                )}

                {hasInfrastructure && (
                  <Button
                    className={cn(
                      st.settlement.tab,
                      this.state.currentTab === 'infrastructure' &&
                        st.settlement.tabActive,
                    )}
                    onClick={() => this.toggle('infrastructure')}
                  >
                    Инфраструктура
                  </Button>
                )}
              </Col>

              <Col xs="12" sm="10">
                {isFetching && <Loading />}

                {!isFetching && this.state.currentTab === 'common' && (
                  <Container fluid>
                    <Row xs="center" className={s.infoContainer}>
                      {hasCommonDetails && (
                        <Col sm="6" md="4">
                          <div>
                            {details.area && (
                              <ParamList
                                label="Общая площадь:"
                                titleClassName={s.fontSizeMd}
                                itemClassName={s.fontSizeMd}
                              >
                                &nbsp;{Math.round(details.area * 100) / 100} Га
                              </ParamList>
                            )}
                            {details.foundationYear && (
                              <ParamList
                                label="Год постройки:"
                                titleClassName={s.fontSizeMd}
                                itemClassName={s.fontSizeMd}
                              >
                                &nbsp;{details.foundationYear}
                              </ParamList>
                            )}
                            {!!landState.length && (
                              <ParamList
                                label="Категория участков:"
                                titleClassName={s.fontSizeMd}
                                itemClassName={s.fontSizeMd}
                              >
                                {landState.map(item => (
                                  <span>
                                    &nbsp;{dictionary.landState[item]}
                                  </span>
                                ))}
                              </ParamList>
                            )}
                          </div>
                        </Col>
                      )}

                      {hasEnergyDetails && (
                        <Col sm="6" md="4" className={sUtils.pushedTopXs4}>
                          <div>
                            {details.gasSupply && (
                              <ParamList
                                label="Тип газа:"
                                titleClassName={s.fontSizeMd}
                                itemClassName={s.fontSizeMd}
                              >
                                &nbsp;{dictionary.gasSupply[details.gasSupply]}
                              </ParamList>
                            )}

                            {details.powerSupply && (
                              <ParamList
                                label="Электричество:"
                                titleClassName={s.fontSizeMd}
                                itemClassName={s.fontSizeMd}
                              >
                                &nbsp;{details.powerSupply} кВт
                              </ParamList>
                            )}
                          </div>
                        </Col>
                      )}

                      {hasWaterDetails && (
                        <Col sm="6" md="4" className={sUtils.pushedTopXs4}>
                          <div>
                            {details.waterSupply && (
                              <ParamList
                                label="Водоснабжение:"
                                titleClassName={s.fontSizeMd}
                                itemClassName={s.fontSizeMd}
                              >
                                &nbsp;
                                {dictionary.waterSupply[details.waterSupply]}
                              </ParamList>
                            )}

                            {details.sewers && (
                              <ParamList
                                label="Канализация:"
                                titleClassName={s.fontSizeMd}
                                itemClassName={s.fontSizeMd}
                              >
                                &nbsp;{dictionary.sewers[details.sewers]}
                              </ParamList>
                            )}
                          </div>
                        </Col>
                      )}
                    </Row>
                  </Container>
                )}

                {!isFetching && this.state.currentTab === 'infrastructure' && (
                  <Col xs="12" sm="12" className={sUtils.pushedTop3}>
                    <Container fluid>
                      <Row xs="center" className={s.infoContainer}>
                        {internalInfrastructure.map(item => (
                          <Col sm="6" md="4" className={s.item}>
                            <span className={s.fontSizeMd}>
                              {item[0].toUpperCase() +
                                item.slice(1, item.length)}
                            </span>
                          </Col>
                        ))}
                      </Row>
                    </Container>
                  </Col>
                )}
              </Col>
            </Row>
          </Container>
        )}
      </section>
    );
  }
}

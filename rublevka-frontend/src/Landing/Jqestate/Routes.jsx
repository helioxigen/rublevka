import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// actions
import * as FilterActions from 'core/actions/filters';
import * as PaginationActions from 'core/actions/pagination';

import { push } from 'react-router-redux';

import UI from 'ui';
const {
  Grid: { Row, Col, Container },
  Visibility,
  Button,
} = UI;

import s from 'styles/landing/jqestate/directions';
import sFilter from 'styles/landing/jqestate/list';
import sUtils from 'styles/utils';

import { dealTypes, kindsTranslit } from 'constants/properties/dictionaries';

class Routes extends Component {
  showProperties(e, filters) {
    e.preventDefault();
    const { dealType, kind, routeId } = filters;

    this.props.actions.updateFilter(
      `countryProperties.${dealTypes[dealType]}`,
      {
        routeIds: [routeId],
      },
    );

    this.props.actions.push(
      `/zagorodnaya/${dealType}/${kind ? kindsTranslit[kind] : ``}`,
    );
  }

  renderLayout(id) {
    const { stats = {} } = this.props.state;
    const { routes = {} } = stats;

    const route = routes[id] || {};
    const routeSale = route.sale || {};
    const routeRent = route.rent || {};

    return (
      <Container fluid className={s.content}>
        <Row xs="center">
          <Col xs="6" className={s.contentColumn}>
            <div className={s.itemsContainer}>
              <p
                className={s.filterTitle}
                onClick={e =>
                  this.showProperties(e, { routeId: id, dealType: `prodaja` })
                }
              >
                Купить
              </p>

              <Button
                className={sFilter.filterItem}
                onClick={e =>
                  this.showProperties(e, {
                    routeId: id,
                    dealType: `prodaja`,
                    kind: `house`,
                  })
                }
              >
                Дома{' '}
                <span className={sFilter.filterNumber}>{routeSale.house}</span>
              </Button>
              <Button
                className={sFilter.filterItem}
                onClick={e =>
                  this.showProperties(e, {
                    routeId: id,
                    dealType: `prodaja`,
                    kind: `land`,
                  })
                }
              >
                Участки{' '}
                <span className={sFilter.filterNumber}>{routeSale.land}</span>
              </Button>
              {routeSale.townhouse && (
                <Button
                  className={sFilter.filterItem}
                  onClick={e =>
                    this.showProperties(e, {
                      routeId: id,
                      dealType: `prodaja`,
                      kind: `townhouse`,
                    })
                  }
                >
                  Таунхаусы{' '}
                  <span className={sFilter.filterNumber}>
                    {routeSale.townhouse}
                  </span>
                </Button>
              )}
              {routeSale.flat && (
                <Button
                  className={sFilter.filterItem}
                  onClick={e =>
                    this.showProperties(e, {
                      routeId: id,
                      dealType: `prodaja`,
                      kind: `flat`,
                    })
                  }
                >
                  Квартиры{' '}
                  <span className={sFilter.filterNumber}>{routeSale.flat}</span>
                </Button>
              )}
            </div>
            <div
              className={s.backgroundColumn}
              onClick={e =>
                this.showProperties(e, { routeId: id, dealType: `prodaja` })
              }
            />
          </Col>

          <Col xs="6" className={s.contentColumn}>
            <div className={s.itemsContainer}>
              <p
                className={s.filterTitle}
                onClick={e =>
                  this.showProperties(e, { routeId: id, dealType: `arenda` })
                }
              >
                Снять
              </p>

              <Button
                className={sFilter.filterItem}
                onClick={e =>
                  this.showProperties(e, {
                    routeId: id,
                    dealType: `arenda`,
                    kind: `house`,
                  })
                }
              >
                Дома{' '}
                <span className={sFilter.filterNumber}>{routeRent.house}</span>
              </Button>
              {routeRent.townhouse && (
                <Button
                  className={sFilter.filterItem}
                  onClick={e =>
                    this.showProperties(e, {
                      routeId: id,
                      dealType: `arenda`,
                      kind: `townhouse`,
                    })
                  }
                >
                  Таунхаусы{' '}
                  <span className={sFilter.filterNumber}>
                    {routeRent.townhouse}
                  </span>
                </Button>
              )}
              {routeRent.flat && (
                <Button
                  className={sFilter.filterItem}
                  onClick={e =>
                    this.showProperties(e, {
                      routeId: id,
                      dealType: `arenda`,
                      kind: `flat`,
                    })
                  }
                >
                  Квартиры{' '}
                  <span className={sFilter.filterNumber}>{routeRent.flat}</span>
                </Button>
              )}
            </div>
            <div
              className={s.backgroundColumn}
              onClick={e =>
                this.showProperties(e, { routeId: id, dealType: `arenda` })
              }
            />
          </Col>
        </Row>
      </Container>
    );
  }

  render() {
    return (
      <section>
        <Visibility lg="hidden">
          <Container fluid>
            <Row sm="center" className={s.container}>
              <Col sm="12" className={sUtils.pushedBottom4_5}>
                <h2 className={s.heading}>Популярные направления</h2>
                <Visibility xs="hidden" sm="hidden">
                  <p className={s.text}>
                    Хорошая экология, развитая инфраструктура, прекрасные
                    ландшафты
                  </p>
                </Visibility>
              </Col>
              <Col xs="12" sm="6" md="5">
                <div
                  onClick={e =>
                    this.showProperties(e, {
                      routeId: 1178,
                      dealType: `prodaja`,
                    })
                  }
                  className={s.card}
                >
                  <div
                    className={s.layout}
                    style={{
                      backgroundImage: `url(https://s3.eu-central-1.amazonaws.com/dt-marketing/hero-images/rublevskoe.jpg)`,
                    }}
                  />
                  <h3 className={s.title}>Рублево-Успенское</h3>
                </div>
              </Col>
              <Col xs="12" sm="6" md="5">
                <div
                  onClick={e =>
                    this.showProperties(e, {
                      routeId: 1186,
                      dealType: `prodaja`,
                    })
                  }
                  className={s.card}
                >
                  <div
                    className={s.layout}
                    style={{
                      backgroundImage: `url(https://s3.eu-central-1.amazonaws.com/dt-marketing/hero-images/novorijskoe.jpg)`,
                    }}
                  />
                  <h3 className={s.title}>Новорижское</h3>
                </div>
              </Col>
              <Col xs="12" sm="6" md="5">
                <div
                  onClick={e =>
                    this.showProperties(e, {
                      routeId: 1192,
                      dealType: `prodaja`,
                    })
                  }
                  className={s.card}
                >
                  <div
                    className={s.layout}
                    style={{
                      backgroundImage: `url(https://s3.eu-central-1.amazonaws.com/dt-marketing/hero-images/ilinskoe.jpg)`,
                    }}
                  />
                  <h3 className={s.title}>Ильинское</h3>
                </div>
              </Col>
              <Col xs="12" sm="6" md="5">
                <div
                  onClick={e =>
                    this.showProperties(e, {
                      routeId: 1179,
                      dealType: `prodaja`,
                    })
                  }
                  className={s.card}
                >
                  <div
                    className={s.layout}
                    style={{
                      backgroundImage: `url(https://s3.eu-central-1.amazonaws.com/dt-marketing/hero-images/kievskoe.jpg)`,
                    }}
                  />
                  <h3 className={s.title}>Минское</h3>
                </div>
              </Col>
            </Row>
          </Container>
        </Visibility>

        <Visibility
          xs="hidden"
          sm="hidden"
          md="hidden"
          className={sUtils.fullWidth}
        >
          <Container fluid>
            <Row sm="center" className={s.container}>
              <Col sm="12" className={sUtils.pushedBottom4_5}>
                <h2 className={s.heading}>Популярные направления</h2>
                <Visibility xs="hidden" sm="hidden">
                  <p className={s.text}>
                    Хорошая экология, развитая инфраструктура, прекрасные
                    ландшафты
                  </p>
                </Visibility>
              </Col>
              <Col xs="12" sm="6" md="5">
                <div className={s.card}>
                  <div
                    className={s.layout}
                    style={{
                      backgroundImage: `url(https://s3.eu-central-1.amazonaws.com/dt-marketing/hero-images/rublevskoe.jpg)`,
                    }}
                  />
                  <h3 className={s.title}>Рублево-Успенское</h3>

                  {::this.renderLayout(1178)}
                </div>
              </Col>
              <Col xs="12" sm="6" md="5">
                <div className={s.card}>
                  <div
                    className={s.layout}
                    style={{
                      backgroundImage: `url(https://s3.eu-central-1.amazonaws.com/dt-marketing/hero-images/novorijskoe.jpg)`,
                    }}
                  />
                  <h3 className={s.title}>Новорижское</h3>

                  {::this.renderLayout(1186)}
                </div>
              </Col>
              <Col xs="12" sm="6" md="5">
                <div className={s.card}>
                  <div
                    className={s.layout}
                    style={{
                      backgroundImage: `url(https://s3.eu-central-1.amazonaws.com/dt-marketing/hero-images/ilinskoe.jpg)`,
                    }}
                  />
                  <h3 className={s.title}>Ильинское</h3>

                  {::this.renderLayout(1192)}
                </div>
              </Col>
              <Col xs="12" sm="6" md="5">
                <div className={s.card}>
                  <div
                    className={s.layout}
                    style={{
                      backgroundImage: `url(https://s3.eu-central-1.amazonaws.com/dt-marketing/hero-images/kievskoe.jpg)`,
                    }}
                  />
                  <h3 className={s.title}>Минское</h3>

                  {::this.renderLayout(1179)}
                </div>
              </Col>
            </Row>
          </Container>
        </Visibility>
      </section>
    );
  }
}

// redux connectors
const pickState = state => {
  const { stats } = state;

  return {
    state: {
      stats,
    },
  };
};

const pickActions = dispatch => {
  const actions = {
    push,
    ...FilterActions,
    ...PaginationActions,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(
  pickState,
  pickActions,
)(Routes);

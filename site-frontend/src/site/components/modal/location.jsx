import React, { Component } from 'react';

import UI from 'site/ui';
const {
  Grid,
  Form,
  Button,
  Modal,
  Icon,
  Checkbox,
  Text,
  Visibility,
  Grid: { Row, Col },
  Form: { Input },
  CountIndicator,
} = UI;

import cn from 'classnames';
import s from 'site/styles/modal/modal';
import sUtils from 'site/styles/utils';
import st from 'site/styles/themes';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItems: {
        subLocality: props.selectedItems.subLocality || [],
        residentialComplex: props.selectedItems.residentialComplex || [],
      },
      selectedTab: `subLocality`,
      isOpened: false,
    };
  }

  handleOpen() {
    const { selectedItems, search } = this.props;

    this.setState({ selectedItems, value: `` });
    search();
  }

  handleChange(category, value, toggle) {
    if (toggle) {
      this.setState({
        selectedItems: {
          subLocality:
            category === `subLocality`
              ? [...this.state.selectedItems.subLocality, value]
              : this.state.selectedItems.subLocality,

          residentialComplex:
            category === `residentialComplex`
              ? [...this.state.selectedItems.residentialComplex, value]
              : this.state.selectedItems.residentialComplex,
        },
      });
    } else {
      this.setState({
        selectedItems: {
          subLocality:
            category === `subLocality`
              ? this.state.selectedItems.subLocality.filter(
                  item => item.id !== value.id,
                )
              : this.state.selectedItems.subLocality,

          residentialComplex:
            category === `residentialComplex`
              ? this.state.selectedItems.residentialComplex.filter(
                  item => item.id !== value.id,
                )
              : this.state.selectedItems.residentialComplex,
        },
      });
    }
  }

  loadMoreResidentialComplexes() {
    const { value } = this.state;
    const { search, foundItems } = this.props;
    const { pagination } = foundItems.residentialComplex;
    const offset = pagination.offset + pagination.limit;
    const finalOffset =
      offset <= pagination.total - pagination.limit
        ? offset
        : pagination.total - pagination.limit;
    search(value, finalOffset);
  }

  clear(category) {
    this.setState({
      selectedItems: { ...this.state.selectedItems, [category]: [] },
    });
  }

  clearAll() {
    this.props.onUpdate({ residentialComplex: [], subLocality: [] });
  }

  updateFilter() {
    const { selectedItems } = this.state;

    this.props.onUpdate({
      subLocality: selectedItems.subLocality,
      residentialComplex: selectedItems.residentialComplex,
    });
    this.toggleModal(false);
  }

  isChecked(category, id) {
    const selectedCategory = this.state.selectedItems[category] || [];
    return !!selectedCategory.find(item => item.id === id);
  }

  searchLocations(event) {
    const { value } = event.target;
    const { search } = this.props;

    this.setState({ value });
    search(value);
  }

  toggleModal(isOpened) {
    this.setState({ isOpened });
  }

  countSubLocalityAB(letter) {
    const foundItems = this.props.foundItems || {};
    const subLocality = foundItems.subLocality || {};
    const items = subLocality.items || [];
    return items.filter(({ name }) => {
      const nameLower = (name[0] || ``).toLowerCase();
      return nameLower === letter;
    }).length;
  }

  render() {
    const { mobile, foundItems } = this.props;
    const { selectedTab, isOpened, selectedItems, value } = this.state;

    const alphabet = `абвгдежзийклмнопрстуфхцчшщэюя`;

    const totalFoundItems = Object.keys(foundItems).reduce(
      (result, key) => [...result, ...(foundItems[key].items || [])],
      [],
    );
    const totalSelectedItems = Object.keys(this.props.selectedItems).reduce(
      (result, key) => [...result, ...(this.props.selectedItems[key] || [])],
      [],
    );

    const count =
      foundItems.residentialComplex.pagination &&
      foundItems.residentialComplex.pagination.total -
        foundItems.residentialComplex.items.length;

    return (
      <div className={s.modal}>
        <Button
          className={cn(
            s.btnModal,
            !!totalSelectedItems.length && s.btnModalActive,
          )}
          block
          size="md"
          onClick={() => ::this.toggleModal(true)}
        >
          {(!!totalSelectedItems.length &&
            totalSelectedItems
              .slice(0, 4)
              .map(item => item.name)
              .join(`, `)) ||
            `Район, ЖК`}

          {!totalSelectedItems.length && (
            <Visibility xs="hidden" sm="hidden">
              <Icon className={s.iconDots} icon="dots" />
            </Visibility>
          )}

          {!totalSelectedItems.length && (
            <Visibility md="hidden" lg="hidden">
              <Icon className={s.iconArrow} icon="arrow-down" />
            </Visibility>
          )}
        </Button>

        {!!totalSelectedItems.length && (
          <Button className={s.btnReset} onClick={::this.clearAll}>
            <Icon className={s.iconReset} icon="times" />
          </Button>
        )}

        <Modal
          size="xlg"
          closeOnEsc
          closeOnOutsideClick={!mobile}
          contentClassName={cn(s.modalContent, s.top5)}
          onOpen={::this.handleOpen}
          onClose={() => ::this.toggleModal(false)}
          isOpened={isOpened}
          closePortal={() => ::this.toggleModal(false)}
        >
          <Grid.Container fluid className={s.container}>
            <Row>
              <Col xs="12">
                <Form.Container
                  className={cn(sUtils.pushedTop4, sUtils.positionRelative)}
                >
                  <Input
                    className={s.inputRoutes}
                    value={value}
                    onChange={::this.searchLocations}
                    block
                    placeholder="Введите район, ЖК"
                  />

                  {!!value && (
                    <Button
                      className={s.btnClearRoutes}
                      type="button"
                      onClick={() => {
                        this.setState({ value: `` });
                        this.props.search(``);
                      }}
                    >
                      <Icon className={s.iconClearRoutes} icon="times" />
                      Очистить
                    </Button>
                  )}
                </Form.Container>
              </Col>
            </Row>

            <Row>
              <Col xs="12" className={cn(sUtils.pushedTop3, s.fixHeight12)}>
                {!!selectedItems.subLocality &&
                  !!selectedItems.subLocality.length && (
                    <ul className={s.list}>
                      <li className={s.listTitle}>Районы:</li>

                      {selectedItems.subLocality.map(item => (
                        <li key={item.id} className={s.listItem}>
                          {item.name}
                          <Button
                            className={s.btnDelete}
                            onClick={() =>
                              ::this.handleChange(`subLocality`, item, false)
                            }
                          >
                            <Icon className={st.modal.iconTimes} icon="times" />
                          </Button>
                        </li>
                      ))}

                      <li className={s.listItem}>
                        {(!!selectedItems.subLocality.length ||
                          !!selectedItems.residentialComplex.length) && (
                          <Button
                            className={st.modal.btnDeleteAll}
                            onClick={() => ::this.clear(`subLocality`)}
                          >
                            Очистить
                          </Button>
                        )}
                      </li>
                    </ul>
                  )}

                {!!selectedItems.residentialComplex &&
                  !!selectedItems.residentialComplex.length && (
                    <ul className={s.list}>
                      <li className={s.listTitle}>ЖК:</li>

                      {selectedItems.residentialComplex.map(item => (
                        <li key={item.id} className={s.listItem}>
                          {item.name}
                          <Button
                            className={s.btnDelete}
                            onClick={() =>
                              ::this.handleChange(
                                `residentialComplex`,
                                item,
                                false,
                              )
                            }
                          >
                            <Icon className={st.modal.iconTimes} icon="times" />
                          </Button>
                        </li>
                      ))}

                      <li className={s.listItem}>
                        {(!!selectedItems.subLocality.length ||
                          !!selectedItems.residentialComplex.length) && (
                          <Button
                            className={s.btnDeleteAll}
                            onClick={() => ::this.clear(`residentialComplex`)}
                          >
                            Очистить
                          </Button>
                        )}
                      </li>
                    </ul>
                  )}
              </Col>
            </Row>

            {!value && (
              <div>
                <Row>
                  <Col
                    xs="12"
                    className={cn(sUtils.pushedTop3, sUtils.pushedBottom3)}
                  >
                    <div className={s.btnGroup}>
                      <Button
                        className={cn(
                          s.btn,
                          selectedTab === `subLocality` && s.active,
                        )}
                        size="lg"
                        onClick={() =>
                          this.setState({ selectedTab: `subLocality` })
                        }
                      >
                        Район
                      </Button>
                      <Button
                        className={cn(
                          s.btn,
                          selectedTab === `residentialComplex` && s.active,
                        )}
                        size="lg"
                        onClick={() =>
                          this.setState({ selectedTab: `residentialComplex` })
                        }
                      >
                        ЖК
                      </Button>
                    </div>
                  </Col>
                </Row>

                {selectedTab === `subLocality` && (
                  <Row className={s.fixHeight}>
                    <Col sm="12">
                      <Row>
                        {alphabet
                          .split(``)
                          .filter(::this.countSubLocalityAB)
                          .map(letter => (
                            <Col sm="6" md="3" className={s.pushedBottom2}>
                              <label className={s.labelBold}>
                                {letter.toUpperCase()}
                              </label>

                              <div className={sUtils.pushedTop1}>
                                {foundItems.subLocality.items &&
                                  foundItems.subLocality.items
                                    .filter(
                                      item =>
                                        item.name[0].toLowerCase() === letter,
                                    )
                                    .map(item => (
                                      <Checkbox
                                        key={item.id}
                                        checked={this.isChecked(
                                          `subLocality`,
                                          item.id,
                                        )}
                                        handleChange={(ref, val) =>
                                          ::this.handleChange(
                                            `subLocality`,
                                            { id: item.id, name: item.name },
                                            val,
                                          )
                                        }
                                      >
                                        <Text
                                          truncate={17}
                                          ellipsis
                                          title="title"
                                        >
                                          {item.name}
                                        </Text>
                                      </Checkbox>
                                    ))}
                              </div>
                            </Col>
                          ))}
                      </Row>
                    </Col>
                  </Row>
                )}

                {selectedTab === `residentialComplex` && (
                  <Row className={s.fixHeight}>
                    <Col sm="12">
                      <Row>
                        {foundItems.residentialComplex.items &&
                          foundItems.residentialComplex.items.map(item => (
                            <Col sm="6" md="3">
                              <div className={sUtils.pushedTop1}>
                                <Checkbox
                                  key={item.id}
                                  checked={this.isChecked(
                                    `residentialComplex`,
                                    item.id,
                                  )}
                                  handleChange={(ref, val) =>
                                    ::this.handleChange(
                                      `residentialComplex`,
                                      { id: item.id, name: item.name },
                                      val,
                                    )
                                  }
                                >
                                  <Text truncate={17} ellipsis title="title">
                                    {item.name || ``}
                                  </Text>
                                </Checkbox>
                              </div>
                            </Col>
                          ))}

                        {foundItems.residentialComplex.pagination &&
                          foundItems.residentialComplex.pagination.total >
                            foundItems.residentialComplex.items.length && (
                            <Button
                              className={s.btnDashed}
                              onClick={::this.loadMoreResidentialComplexes}
                            >
                              <span className={s.borderDashed}>
                                ещё&nbsp;
                                <CountIndicator
                                  count={count}
                                  declensionForms={[
                                    `жилищный комплекс`,
                                    `жилищных комплекса`,
                                    `жилищный комплексов`,
                                  ]}
                                />
                              </span>
                            </Button>
                          )}
                      </Row>
                    </Col>
                  </Row>
                )}
              </div>
            )}

            {!!value && (
              <div>
                <Row className={cn(sUtils.pushedTop3, s.fixHeight)}>
                  {/* subLocality */}
                  {foundItems.subLocality.items && (
                    <Col xs="12" className={sUtils.pushedBottom2}>
                      <label className={s.labelBold}>Район</label>

                      {foundItems.subLocality.items.map(item => (
                        <div className={sUtils.pushedTop1}>
                          <Checkbox
                            key={item.id}
                            checked={this.isChecked(`subLocality`, item.id)}
                            handleChange={(ref, val) =>
                              ::this.handleChange(
                                `subLocality`,
                                { id: item.id, name: item.name },
                                val,
                              )
                            }
                          >
                            {item.name}
                          </Checkbox>
                        </div>
                      ))}

                      {!foundItems.subLocality.items.length && (
                        <div className={cn(sUtils.pushedTop1, s.textGrey)}>
                          Ничего не нашлось
                        </div>
                      )}
                    </Col>
                  )}

                  {/* residentialComplex */}
                  {foundItems.residentialComplex.items && (
                    <Col xs="12" className={sUtils.pushedBottom2}>
                      <label className={s.labelBold}>ЖК</label>

                      {foundItems.residentialComplex.items.map(item => (
                        <div className={sUtils.pushedTop1}>
                          <Checkbox
                            key={item.id}
                            checked={this.isChecked(
                              `residentialComplex`,
                              item.id,
                            )}
                            handleChange={(ref, val) =>
                              ::this.handleChange(
                                `residentialComplex`,
                                { id: item.id, name: item.name },
                                val,
                              )
                            }
                          >
                            {item.name}
                          </Checkbox>
                        </div>
                      ))}

                      {!foundItems.residentialComplex.items.length && (
                        <div className={cn(sUtils.pushedTop1, s.textGrey)}>
                          Ничего не нашлось
                        </div>
                      )}
                    </Col>
                  )}
                </Row>
              </div>
            )}
          </Grid.Container>

          {!value && (
            <Button
              className={s.btnModalAction}
              block
              kind="primary"
              size="xlg"
              onClick={::this.updateFilter}
            >
              Искать
            </Button>
          )}
          {!!value && (
            <Button
              className={s.btnModalAction}
              block
              kind="primary"
              size="xlg"
              onClick={::this.updateFilter}
            >
              Показать&nbsp;
              <CountIndicator
                count={totalFoundItems.length}
                declensionForms={[`объект`, `объекта`, `объектов`]}
              />
            </Button>
          )}
        </Modal>
      </div>
    );
  }
}

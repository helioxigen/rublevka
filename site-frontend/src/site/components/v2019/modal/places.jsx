import React, { Component } from 'react';

import update from 'react/lib/update';

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
} = UI;
import uniq from 'lodash/uniqBy';

import cn from 'classnames';
import s from 'site/styles/modal/modal';
import st from 'site/styles/themes';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = { selectedItems: [], isOpened: false };
  }

  handleOpen() {
    const { selectedItems = [], search } = this.props;

    this.setState({ selectedItems, value: `` });
    search(``, null, true);
  }

  handleChange(value, toggle) {
    if (toggle) {
      this.setState(update(this.state, { selectedItems: { $push: [value] } }));
    } else {
      // Get Index of toggling item.
      const itemIndex = this.state.selectedItems.findIndex(
        settlement => settlement.id === value.id,
      );
      if (itemIndex >= 0) {
        // If item is in the array, remove it using react's immutable $splice helper.
        const newState = update(this.state, {
          selectedItems: {
            $splice: [[itemIndex, 1]],
          },
        });
        this.setState(newState);
      }
    }
  }

  loadMore() {
    const { value } = this.state;
    const { search, foundItems } = this.props;
    const { pagination } = foundItems;
    const offset = pagination.offset + pagination.limit;
    const finalOffset =
      offset <= pagination.total - pagination.limit
        ? offset
        : pagination.total - pagination.limit;
    search(value, finalOffset, true);
  }

  reset() {
    this.setState({ ...this.state, selectedItems: [] });
  }

  clear() {
    this.props.onUpdate(this.props.reference, []);
    this.setState({ ...this.state, selectedItems: [] });
  }

  updateFilter() {
    const { selectedItems } = this.state;

    this.props.onUpdate(this.props.reference, selectedItems);
    this.toggleModal(false);
  }

  isChecked(id) {
    const { selectedItems } = this.state;

    return !!selectedItems.filter(settlement => settlement.id === id).length;
  }

  searchSettlements(event) {
    const { value } = event.target;
    const { search } = this.props;

    this.setState({ ...this.state, value });
    search(value, null, true);
  }

  toggleModal(isOpened) {
    this.setState({ isOpened });
  }

  render() {
    const { pagination = {}, isFetching } = this.props.foundItems;
    const { selectedItems = [], mobile } = this.props;
    const preselectedItems = this.state.selectedItems;
    const items = uniq(this.props.foundItems.items, item => item.id);
    const buttonClassName = cn(s.btnModal, {
      [s.btnModalActive]: !!selectedItems.length,
    });

    return (
      <div className={s.modal}>
        <Button
          className={buttonClassName}
          block
          size="md"
          kind="default"
          onClick={() => ::this.toggleModal(true)}
        >
          {(!!selectedItems.length &&
            selectedItems
              .slice(0, 4)
              .map(item => item.name)
              .join(`, `)) ||
            `Поселок`}

          {!selectedItems.length && (
            <Visibility xs="hidden" sm="hidden">
              <Icon className={s.iconDots} icon="dots" />
            </Visibility>
          )}

          {!selectedItems.length && (
            <Visibility md="hidden" lg="hidden">
              <Icon className={s.iconArrow} icon="arrow-down" />
            </Visibility>
          )}
        </Button>

        {!!selectedItems.length && (
          <Button className={s.btnReset} onClick={::this.clear}>
            <Icon className={s.iconReset} icon="times" />
          </Button>
        )}

        <Modal
          closeOnEsc
          closeOnOutsideClick={!mobile}
          contentClassName={s.modalContent}
          onOpen={::this.handleOpen}
          onClose={() => ::this.toggleModal(false)}
          isOpened={this.state.isOpened}
          closePortal={() => ::this.toggleModal(false)}
        >
          <Grid.Container fluid className={s.container}>
            <Row>
              <Col xs="12">
                <h2 className={s.title}>
                  Посёлки {!!preselectedItems.length && preselectedItems.length}
                </h2>
              </Col>
            </Row>

            <Row>
              <Col xs="12">
                <ul className={s.list}>
                  {preselectedItems.map(settlement => (
                    <li key={settlement.id} className={s.listItem}>
                      {settlement.name}
                      <Button
                        className={s.btnDelete}
                        onClick={() => ::this.handleChange(settlement, false)}
                      >
                        <Icon className={st.modal.iconTimes} icon="times" />
                      </Button>
                    </li>
                  ))}

                  <li className={s.listItem}>
                    {!!preselectedItems.length && (
                      <Button
                        className={st.modal.btnDeleteAll}
                        onClick={::this.reset}
                      >
                        Сбросить все
                      </Button>
                    )}
                  </li>
                </ul>
              </Col>
            </Row>

            <Row>
              <Col xs="12">
                <Form.Container className={s.pushed}>
                  <Input
                    className={s.input}
                    onChange={::this.searchSettlements}
                    block
                    placeholder="Введите название поселка"
                  />
                </Form.Container>
              </Col>
            </Row>

            <Row className={s.fixHeight}>
              <Col sm="12">
                <div className={s.checkboxContainer}>
                  {items.map(settlement => (
                    <Checkbox
                      className={s.checkbox}
                      key={settlement.id}
                      handleChange={(ref, val) =>
                        ::this.handleChange(settlement, val)
                      }
                      reference={this.props.reference}
                      checked={::this.isChecked(settlement.id)}
                    >
                      <Text
                        truncate={17}
                        ellipsis
                        title={settlement && settlement.name}
                      >
                        {settlement.name}
                      </Text>
                    </Checkbox>
                  ))}

                  {!items.length && !isFetching && (
                    <h2 className={s.titleLg}>
                      Мы не нашли ничего по вашему запросу. <br />
                      Попробуйте что-то изменить{' '}
                    </h2>
                  )}
                </div>
              </Col>

              {pagination.total > items.length && (
                <Button className={s.btnDashed} onClick={::this.loadMore}>
                  <span className={s.borderDashed}>
                    ещё {pagination.total - items.length} посёлков
                  </span>
                </Button>
              )}
            </Row>
          </Grid.Container>

          <Button
            className={s.btnModalAction}
            block
            kind="primary"
            size="xlg"
            onClick={::this.updateFilter}
          >
            Искать
          </Button>
        </Modal>
      </div>
    );
  }
}

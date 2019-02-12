import React, { Component } from 'react';

import { connect } from 'react-redux';
import { dispatch } from 'cem/store';
import loadDictionaries from 'cem/_dictionaries/actions/loadList';

// ui
import UI from 'cem/components/ui';
const {
  Modal,
  Heading,
  Form: { Group, Input, Label },
  Button,
} = UI;

import s from 'cem/styles/modal/list';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

class RejectModal extends Component {
  constructor(...args) {
    super(args);

    this.state = {
      group: `client_lead_${this.props.toState}_reason`,
    };
  }

  componentWillMount() {
    this.load();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.toState && this.props.toState !== nextProps.toState) {
      this.setState({ group: `client_lead_${nextProps.toState}_reason` }, () =>
        this.load(nextProps),
      );
    }
  }

  load() {
    dispatch(loadDictionaries({}, this.state.group));
  }

  handleOnClick() {
    this.props.onClick(this.state.selected);
    this.props.close();
  }

  render() {
    const { _dictionaries } = this.props;
    const { ids = [] } = _dictionaries[this.state.group] || {};

    return (
      <Modal
        size="md"
        closePortal={::this.props.close}
        isOpened={this.props.isOpened}
        onClose={::this.props.close}
        closeOnEsc
        closeOnOutsideClick
      >
        <div className={s.container}>
          <Heading size="md">Отклонить лид</Heading>
          <p className={s.text}>
            Выберите, почему вы хотите отклонить лид. Руководитель проверит и
            подтвердит.
          </p>
          <div className={sUtils.pushedTop3}>
            {ids.map(id => (
              <Group block key={id}>
                <Label>
                  <Input
                    type="radio"
                    value={id}
                    checked={this.state.selected === id}
                    onClick={() => this.setState({ selected: id })}
                  />
                  {_dictionaries[id].data.title}
                </Label>
              </Group>
            ))}
          </div>
        </div>
        <Button
          className={sButton.btnWide}
          kind="danger"
          size="lg"
          block
          type="button"
          onClick={::this.handleOnClick}
          disabled={!this.state.selected}
        >
          Отклонить лид
        </Button>
      </Modal>
    );
  }
}

const pickState = ({ _dictionaries }) => ({ _dictionaries });

export default connect(pickState)(RejectModal);

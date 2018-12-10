import React, { Component } from 'react';
import omit from 'lodash/omit';

import formSettings from 'cem/constants/companies/form';
import { validatorShortcut } from 'core/decorators/submitValidator';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { pop } from 'cem/actions/toastr';
import { pushPath } from 'redux-simple-router';
import CompaniesActions from 'cem/actions/companies';

import Search from 'cem/components/companies/id/create/search';
import StaticForm from 'cem/components/companies/id/create/staticForm';

import UI from 'cem/components/ui';
const {
  Modal, Button, Form, Heading,
  Grid: { Container },
} = UI;

import s from 'cem/styles/modal/list';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

class CreateCompany extends Component {
  state = { isOpened: false };

  onSubmitSuccess({ id }) {
    const { callback } = this.props;
    this.close();
    this.props.destroyForm();
    this.props.actions.pop(`success`, `Компания (ID: ${id})`, `Успешно создана`);
    if (!callback) this.props.actions.pushPath(`/companies/${id}`);
    if (callback) callback(id);
  }

  open() { this.setState({ isOpened: true }); }
  close() {
    this.setState({ isOpened: false });
    this.props.destroyForm();
  }

  create() {
    const { actions } = this.props;
    const values = {
      ...omit(this.props.values, [`ceoName`, `ceoPosition`]),
      phoneNumbers: {},
    };

    return actions.createCompany(values);
  }

  initialize(initialValues) {
    this.props.initializeForm(initialValues);
  }

  render() {
    const {
      children, disableSearch = false, isOpened,
      handleSubmit,
      ...props,
    } = this.props;

    return (
      <div className={s.modalContainer}>
        {children && React.cloneElement(children, { ...children.props, onClick: ::this.open })}
        <Modal isOpened={isOpened || this.state.isOpened} closePortal={::this.close} {...this.props} closeOnEsc closeOnOutsideClick size="sm">
          <Form.Container onSubmit={handleSubmit(::this.create, ::this.onSubmitSuccess, ::this.close)}>
            <Container fluid className={s.container}>
              {!disableSearch &&
                <div>
                  <Heading size="md" className={sUtils.pushedBottom2}>Добавить новую компанию</Heading>
                  <p className={sUtils.pushedBottom3}>Введите название компании или ОГРН(ИП)</p>
                </div>
              }
              {!disableSearch && <Search {...props} />}
              {!!disableSearch &&
                <div>
                  <Heading size="md" className={sUtils.pushedBottom2}>Добавить новую компанию?</Heading>
                  <p className={sUtils.pushedBottom3}>У нас в базе нет компании {props.values.name}, но вы можете создать её, тщательно проверив реквизиты.</p>
                </div>
              }
              <StaticForm {...props} isStatic />
            </Container>
            <Button className={sButton.btnWide} kind="success" block size="lg">Добавить новую компанию</Button>
          </Form.Container>
        </Modal>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => ({
  actions: bindActionCreators({ ...CompaniesActions, pop, pushPath }, dispatch),
});

const formConnected = validatorShortcut(formSettings)(CreateCompany);
export default connect(null, mapDispatch)(formConnected);

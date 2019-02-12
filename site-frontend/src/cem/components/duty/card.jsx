import React, { Component } from 'react';
import { FormattedDate } from 'react-formatted';

import ModalDutyForm from './modalDutyForm';
import UI from 'cem/components/ui';
const {
  Media,
  Image,
  ParamList,
  Button,
  Icon,
  Modal,
  Grid: { Container, Row, Col },
} = UI;

import s from 'cem/styles/ui/card';
import sUtils from 'cem/styles/utils';

import { prepareInitialValues } from 'cem/helpers/duty';

import moment from 'moment';

const UserImage = ({ url }) => (
  <Image
    src={
      url
        ? `${url}-64`
        : 'https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/placeholder-photo.svg'
    }
    className={s.placeholder}
    kind="circle"
    width="64"
    height="64"
  />
);

const UserDescription = props => (
  <div>
    <h2 className={s.mediaTitle}>{`${props.firstName || ''} ${props.lastName ||
      ''}`}</h2>
    <p className={s.mediaText}>{props.workPhoneNumber}</p>
    <p className={s.mediaText}>{props.email}</p>
  </div>
);

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: props.isOpen,
    };
  }

  toggleModal(state) {
    this.setState({
      isOpen: state,
    });
  }

  render() {
    const {
      departmentId,
      startAt,
      finishAt,
      state,
      actions,
      isUpdateAllowed,
    } = this.props;
    const { data: userData = {} } = state.users[this.props.staffUserId] || {};
    const isEditable = isUpdateAllowed && !moment(finishAt).isBefore(moment());

    return (
      <div className={s.card}>
        <div className={s.cardWrapper}>
          <Container fluid className={s.flex}>
            <Row>
              <Col sm="10" lg="8">
                <ParamList label="Департамент" big>
                  {departmentId &&
                    userData.details &&
                    userData.details.departmentName}
                  {!departmentId && '—'}
                </ParamList>
              </Col>
              <Col className={sUtils.pushedTopXs2} sm="5" lg="3">
                <ParamList label="Начало" big>
                  <FormattedDate mask="dd.mm.yyyy HH:MM" value={startAt} />
                </ParamList>
              </Col>
              <Col className={sUtils.pushedTopXs2} sm="5" lg="3">
                <ParamList label="Конец" big>
                  <FormattedDate mask="dd.mm.yyyy HH:MM" value={finishAt} />
                </ParamList>
              </Col>
            </Row>
            <Row>
              <Col className={sUtils.pushedTopXs2} sm="20">
                <Media
                  left={
                    <UserImage url={userData.photo && userData.photo.url} />
                  }
                  body={<UserDescription {...userData} />}
                />
              </Col>
            </Row>

            {isEditable && (
              <Button
                className={s.btnEdit}
                onClick={() => this.toggleModal(true)}
              >
                <Icon className={s.iconEdit} icon="edit" />
              </Button>
            )}
            <Modal
              size="sm"
              closeOnEsc
              closeOnOutsideClick
              onClose={() => this.toggleModal(false)}
              isOpened={this.state.isOpen}
              closePortal={() => this.toggleModal(false)}
            >
              <ModalDutyForm
                formKey={this.props.id.toString()}
                initialValues={prepareInitialValues(this.props)}
                actions={actions}
                closeModal={() => this.toggleModal(false)}
              />
            </Modal>
          </Container>
        </div>
      </div>
    );
  }
}

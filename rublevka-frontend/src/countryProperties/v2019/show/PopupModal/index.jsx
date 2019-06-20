import React from 'react';
import styled from 'styled-components';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';
import InputMask from 'react-input-mask';

import Portal from 'react-portal';

import media from 'styles/media';
import UI from 'ui';
import CallbackForm from '../../../../ui/v2019/organisms/CallbackForm';

const { Icon } = UI;

const ModalCover = styled.div`
  position: fixed;
  z-index: 99999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);

  ${media.xs`
    background: rgba(0, 0, 0, 0.85);
  `}
`;

const Modal = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  min-width: 100%;
  padding: 32px 16px;
  background: #fff;
  border: 1px solid #eee;
  white-space: normal;
  box-shadow: 0px -3px 4px rgba(0, 0, 0, 0.05);

  ${media.xs`
    position: relative;
    padding: 32px 24px;
    margin: 0 auto;
    margin-top: 50px;
    min-width: 400px;
    max-width: 400px;
    border-radius: 4px;
  `}
`;

const Header = styled.h3`
  margin: 0;
  margin-top: 8px;
  font-weight: 500;
  color: #232323;
  font-size: 24px;
  line-height: 32px;
  font-weight: bold;
  text-align: center;

  ${media.xs`
    margin: 0;
    line-height: 29px;
  `}
`;

const Body = styled.p`
  margin: 0;
  margin-top: 12px;
  color: #232323;
  font-size: 15px;
  line-height: 24px;
  text-align: center;
  font-weight: 500;

  ${media.xs`
    margin-top: 8px;
    font-size: 16px;
  `}
`;

const BodySlim = styled(Body)`
  font-weight: normal;
`;

const CallForm = styled.form`
  margin: 20px 0px;
  display: flex;
  flex-direction: column;

  ${media.xs`
    margin: 12px 0px;
  `}
`;

const StInput = styled(InputMask)`
  margin: 4px 0px;
  padding: 16px 15px 14px 15px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.75);
  appearance: none;

  font-weight: bold;
  line-height: 18px;
  font-size: 15px;
  text-transform: uppercase;
  color: #232323;

  &::-webkit-input-placeholder {
    color: #aaa;
  }
`;

const TextArea = styled.textarea`
  margin: 4px 0px;
  padding: 16px 15px 14px 15px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.75);
  appearance: none;

  font-weight: bold;
  line-height: 18px;
  font-size: 15px;
  text-transform: uppercase;
  color: #232323;

  &::-webkit-input-placeholder {
    color: #aaa;
  }
`;

const SubmitBtn = styled.button`
  align-self: center;
  margin-top: 12px;
  padding: 21px 32px 17px 32px;
  border: none;
  background-color: #47b34c;
  border-radius: 4px;

  text-transform: uppercase;
  color: #fff;
  font-size: 15px;
  line-height: 18px;
  font-weight: bold;

  ${media.xs`
    margin-top: 8px;
  `}
`;

const AgreementText = styled.p`
  text-align: center;
  margin: 0;
  margin-top: 4px;
  color: #232323;
  font-size: 14px;
  line-height: 20px;

  ${media.xs`
    line-height: 18px;
    padding: 0px 20px;
  `}
`;

const AgreementLink = styled.a`
  font-size: 14px;
  line-height: 20px;
  color: #f44336;
  text-decoration: none;

  &:hover {
    cursor: pointer;
  }

  ${media.xs`
    line-height: 18px;
  `}
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  margin: 0;
  padding: 0;
  border: none;
  background: none;
`;

const CloseIcon = styled(Icon)`
  fill: rgba(8, 8, 8, 0.3);
  width: 24px;
  height: 24px;
`;

export default class extends React.Component {
  state = {
    name: null,
    phone: null,
    isModalOpen: false,
    isRequestSended: false,
    values: {},
  };

  componentWillUnmount() {
    clearAllBodyScrollLocks();
  }

  openModal = () => {
    disableBodyScroll(this.modal);

    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    enableBodyScroll(this.modal);

    this.setState({
      isModalOpen: false,
      isRequestSended: false,
      values: {},
    });
  };

  handleSendRequest = e => {
    const { onSendRequest } = this.props;
    const { values } = this.state;

    e.preventDefault();

    onSendRequest(values);

    this.setState({ isRequestSended: true });
  };

  handleValueChange = fieldName => e =>
    this.setState({
      values: {
        ...this.state.values,
        [fieldName]: e.target.value,
      },
    });

  render() {
    const { values, isModalOpen, isRequestSended } = this.state;
    const {
      children,
      fields = [],
      header,
      subheader,
      successMessage,
    } = this.props;

    return (
      <div>
        {React.cloneElement(children, { onClick: this.openModal })}
        <Portal
          ref={el => {
            this.modal = el;
          }}
          closeOnEsc
          isOpened={isModalOpen}
          closePortal={this.closeModal}
        >
          <ModalCover onClick={this.closeModal}>
            <Modal onClick={e => e.stopPropagation()}>
              <CloseButton onClick={this.closeModal}>
                <CloseIcon icon="close-button" />
              </CloseButton>
              <CallbackForm
                header={
                  <header>
                    <Header>{header}</Header>
                    <Body>{subheader}</Body>
                  </header>
                }
                fields={{
                  name: {
                    placeholder: 'Имя',
                    required: true,
                  },
                  phone: {
                    placeholder: 'Телефон',
                    type: 'tel',
                    required: true,
                  },
                  comment: {
                    placeholder: 'Комментарий',
                    type: 'textarea',
                  },
                }}
                submitLabel="Оставить заявку"
                footer={
                  <footer>
                    <AgreementText>
                      Отправляя заявку, вы соглашаетесь с нашей{' '}
                      <AgreementLink
                        href="/static/privacy-policy.pdf"
                        target="_blank"
                      >
                        политикой конфиденциальности
                      </AgreementLink>
                      .
                    </AgreementText>
                  </footer>
                }
              />
            </Modal>
          </ModalCover>
        </Portal>
      </div>
    );
  }
}

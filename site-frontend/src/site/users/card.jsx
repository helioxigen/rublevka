import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

import { connect } from 'react-redux';

import { cloudfront } from 'core/config/resources';

import cn from 'classnames';
import UI from 'site/ui';
const {
  Image,
  CountIndicator,
  Modal,
  Grid: { Col },
} = UI;

import s from 'site/styles/about/card';
import sUtils from 'site/styles/utils';

class Card extends Component {
  state = {
    isOpened: false,
    selected: `selected`,
  };

  toggleModal(isOpened) {
    this.setState({
      isOpened,
    });
  }

  render() {
    const { id, showExperience, showDescription } = this.props;
    const { data = {}, isFetching } = this.props.state.users[id] || {};

    if (!isFetching) {
      const { details = {}, photo = {} } = data;

      return (
        <Col sm="6" md="4" className={s.cardContainer}>
          {/* mobile
          <div className={cn(s.card, sUtils.hideFromSm)}>
            {!!data.photo && <Image className={s.image} src={`${global.config.cloudfront || cloudfront}/${data.photo.id}-512`} kind="circle" />}

            <div className={sUtils.pushedTopXs2_5Sm4}>
              <h2 className={s.titleLg}>{data.firstName} {data.lastName}</h2>

              <p className={s.textGrey}>{details.roleName && details.roleName}</p>

              {details.experienceYears &&
                <h4 className={cn(s.titleMd, sUtils.pushedTopXs3Sm2)}>Опыт — <CountIndicator count={details.experienceYears} declensionForms={[`год`, `года`, `лет`]} /></h4>
              }
            </div>
          </div>

          {/* tablet and desktop
          <div className={cn(s.card, sUtils.hideXs)} onClick={() => ::this.toggleModal(true)}>
            {!!data.photo && <Image className={s.image} src={`${global.config.cloudfront || cloudfront}/${data.photo.id}-512`} kind="circle" />}

            <div className={sUtils.pushedTopSm3_5Md4_5}>
              <h2 className={s.titleLg}>{data.firstName} {data.lastName}</h2>
              <p className={s.textGrey}>{details && details.roleName}</p>

              {details.experienceYears &&
                <h4 className={cn(s.titleMd, sUtils.pushedTop1_5)}>Опыт — <CountIndicator count={details.experienceYears} declensionForms={[`год`, `года`, `лет`]} /></h4>
              }
              {details.description &&
                <ReactMarkdown className={cn(s.text, s.heightSm13_5Md15, sUtils.pushedTop4, sUtils.hideXs)} source={details.description} />
              }
            </div>

            <Button className={s.btn} onClick={() => ::this.toggleModal(true)}>Подробнее</Button>
          </div> */}

          <div className={s.cardAgent}>
            <Image
              className={s.image}
              src={`${global.config.cloudfront || cloudfront}/${photo.id}-512`}
              kind="circle"
            />

            <div className={sUtils.pushedTopXs2_5Sm4}>
              <h2 className={s.titleLg}>
                {data.firstName} {data.lastName}
              </h2>
              <p className={s.textGrey}>
                {details.roleName && details.roleName}
              </p>

              {showExperience && details.experienceYears && (
                <h4 className={cn(s.titleMd, sUtils.pushedTopXs3Sm2)}>
                  Опыт —{' '}
                  <CountIndicator
                    count={details.experienceYears}
                    declensionForms={[`год`, `года`, `лет`]}
                  />
                </h4>
              )}
              {showDescription && details.description && (
                <ReactMarkdown
                  className={cn(
                    s.text,
                    s.heightSm13_5Md15,
                    sUtils.pushedTop4,
                    sUtils.hideXs,
                  )}
                  source={details.description}
                />
              )}
            </div>
          </div>

          <Modal
            contentClassName={s.modal}
            onClose={() => ::this.toggleModal(false)}
            isOpened={this.state.modalOpen}
            closeOnEsc
            closePortal={() => ::this.toggleModal(false)}
            closeOnOutsideClick
          >
            <div className={s.modalContainer}>
              {data.photo && (
                <Image
                  className={s.image}
                  src={`${global.config.cloudfront || cloudfront}/${
                    photo.id
                  }-512`}
                  width="204"
                  height="204"
                  kind="circle"
                />
              )}

              <div className={s.descriptionContainer}>
                <div>
                  <h2 className={s.titleLg}>
                    {data.firstName} {data.lastName}
                  </h2>
                  <p className={s.textGrey}>{details && details.roleName}</p>
                </div>

                {details.education && (
                  <div className={sUtils.pushedTop4}>
                    <h3 className={s.titleMd}>Образование</h3>
                    <p
                      className={cn(s.text, sUtils.pushedTop2, s.resetPadding)}
                    >
                      {details.education}
                    </p>
                  </div>
                )}
                {details.description && (
                  <div className={sUtils.pushedTop4}>
                    <h3 className={s.titleMd}>
                      Опыт —{' '}
                      <CountIndicator
                        count={details.experienceYears}
                        declensionForms={[`год`, `года`, `лет`]}
                      />
                    </h3>
                    <ReactMarkdown
                      className={cn(s.text, s.resetPadding, s.paddingBottomSm8)}
                      source={details.description}
                    />
                  </div>
                )}
              </div>
            </div>
          </Modal>
        </Col>
      );
    }

    return null;
  }
}

const pickState = ({ users }) => {
  return {
    state: { users },
  };
};

export default connect(pickState)(Card);

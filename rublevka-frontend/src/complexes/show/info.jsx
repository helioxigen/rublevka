import React, { Component } from 'react';

import cn from 'classnames';
import Media from './media';
import UI from 'ui';
const {
  CountIndicator,
  Grid: { Row, Col },
} = UI;

import s from 'styles/complexes/id/info';
import sMedia from 'styles/property/media';
import sUtils from 'styles/utils';

class Description extends Component {
  render() {
    const { data, complexBuildingsIds = [] } = this.props;

    const publicLayoutImages =
      (data.images && data.images.filter(image => !!image.isPublic)) || [];

    const totalAreaFrom =
      data.statistics && parseInt(data.statistics.totalPrimaryArea.from, 10);
    const totalAreaTo =
      data.statistics && parseInt(data.statistics.totalPrimaryArea.to, 10);

    return (
      <Row className={s.container}>
        <Col xs="12">
          <ul className={s.list}>
            <li className={s.listItem}>
              <h1 className={s.title}>
                {data.commissioningQuarter} квартал {data.commissioningYear}{' '}
                года
              </h1>
              <p className={s.text}>Конец строительства</p>
            </li>
            <li className={s.listItem}>
              <h1 className={s.title}>
                от {totalAreaFrom} до {totalAreaTo} м²
              </h1>
              <p className={s.text}>Площадь квартир</p>
            </li>
            <li className={s.listItem}>
              <h1 className={s.title}>{complexBuildingsIds.length}</h1>
              <p className={s.text}>
                <CountIndicator
                  count={complexBuildingsIds.length}
                  declensionForms={['корпус', 'корпуса', 'корпусов']}
                  numberHidden
                />
              </p>
            </li>
          </ul>
        </Col>
        <Col
          xs="12"
          className={cn(
            publicLayoutImages.length
              ? sUtils.pushedBottom8
              : sUtils.pushedBottom3,
            sUtils.pushedTop3,
          )}
        >
          <Media
            images={publicLayoutImages}
            className={sMedia.complex}
            placeholderClassName={sMedia.complexPlaceholder}
          />
        </Col>

        {/* item && (
          <Col xs="12" className={sUtils.pushedBottom9_5}>
            <Row>
              <Col xs="12" className={sUtils.pushedBottom2_5}>
                <h1 className={s.title}>Застройщик</h1>
              </Col>
              <Col xs="12">
                <div className={s.flex}>
                  <div className={s.flexImageContainer}>
                    <UI.Image src="//" witemth="128px" height="128px" />
                  </div>
                  <div>
                    <p className={s.about}>Группа Компаний ПИК, основанная в 1994 году, сегодня является одним из ведущих российских девелоперов в области жилой недвижимости. За 21 год  работы Группа прошла долгий путь от небольшой, но динамичной риэлтерской компании до мощного вертикально-интегрированного холдинга, контролирующего все стадии процесса девелопмента – от разработки концепции и строительства до продаж и управления объектами.</p>
                    <p className={cn(s.about, sUtils.pushedTop4_5)}><strong>Архитектор.</strong> {item.data.details.architect} известнейший архитектор, ставший новатором в области архитектуры своего времени и основателем интернационального стиля. Он отказался от господствовавшей тенденции античного облика зданий в угоду модернизма и функционализма.</p>
                  </div>

                </div>
              </Col>
            </Row>
          </Col>
        ) */}
      </Row>
    );
  }
}

export default Description;

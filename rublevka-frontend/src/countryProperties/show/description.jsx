import React, { Component } from 'react';
import { layouts } from 'core/config/constants';
import { cloudfront } from 'core/config/resources';

import PopupCarousel from 'components/common/popupCarousel';

import UI from 'ui';
const {
  CountIndicator,
  DL,
  Button,
  Image,
  Grid: { Container, Row, Col },
} = UI;

import s from 'styles/property/description';

class Description extends Component {
  renderDescription(kind) {
    const { landDetails, communication } = this.props.data;

    if (kind !== 'flat') {
      return (
        <Row>
          <Col xs="12">
            <Row>
              <Col sm="4">
                <p className={s.title}>Участок</p>
                <Row>
                  <Col xs="12">
                    <DL
                      name="landSize"
                      type="dimension"
                      value={landDetails.area}
                    />
                    <DL
                      name="landType"
                      type="dictionary"
                      value={landDetails.landscapeKind[0]}
                    />
                    <DL
                      name="landscaping"
                      type="boolean"
                      value={!!landDetails.landscaping}
                    />
                  </Col>
                </Row>
              </Col>
              {!!Object.keys(communication).length && (
                <Col sm="4" className={s.pushedTopXs1_5}>
                  <p className={s.title}>Коммуникации</p>
                  <Row className={s.pushedBottomXs2_5Sm3}>
                    <Col xs="12">
                      {communication.gasSupply && (
                        <DL
                          name="gasSupply"
                          type="dictionary"
                          value={communication.gasSupply}
                        />
                      )}
                      {communication.powerSupply && (
                        <DL
                          name="powerSupply"
                          type="dimension"
                          value={communication.powerSupply}
                        />
                      )}
                      {communication.waterSupply && (
                        <DL
                          name="waterSupply"
                          type="dictionary"
                          value={communication.waterSupply}
                        />
                      )}
                      {communication.sewerageSupply && (
                        <DL
                          name="sewers"
                          type="dictionary"
                          value={communication.sewerageSupply}
                        />
                      )}
                    </Col>
                  </Row>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      );
    }

    return null;
  }

  render() {
    const { data, layoutImages = [] } = this.props;
    const publicLayoutImages = layoutImages.filter(image => !!image.isPublic);

    if (data.specification) {
      return (
        <Row>
          <Container className={s.paddingBottom6}>
            <Row>
              {Object.keys(data.specification.layouts).length !== 0 && (
                <Col xs="12">
                  <p className={s.title}>Дом</p>

                  <Row className={s.pushedBottomXs2_5Sm3}>
                    {Object.keys(data.specification.layouts).map(key => (
                      <Col xs="6" sm="4">
                        <span className={s.item}>
                          <CountIndicator
                            count={data.specification.layouts[key]}
                            declensionForms={layouts[key].declensions}
                            firstNumberHidden
                          />
                        </span>
                      </Col>
                    ))}
                  </Row>
                </Col>
              )}
            </Row>

            {this.renderDescription(data.kind)}

            {!!publicLayoutImages.length && (
              <Row>
                <Col xs="12">
                  <p className={s.title}>Планировки</p>
                </Col>
                {publicLayoutImages.map((item, i) => (
                  <Col sm="6" md="3" className={s.pushedBottom3}>
                    <PopupCarousel
                      propertyId={data.id}
                      images={publicLayoutImages}
                    >
                      <Button className={s.btn} size="md" block key={i}>
                        <Image
                          src={`${global.config.cloudfront || cloudfront}/${
                            item.id
                          }-thumbnail-512`}
                          key={i}
                          alt="Планировка"
                          responsive
                        />
                      </Button>
                    </PopupCarousel>
                  </Col>
                ))}
              </Row>
            )}
          </Container>
        </Row>
      );
    }

    return null;
  }
}

export default Description;

import React, { Component } from 'react';
import { layouts } from 'core/config/constants';
import { cloudfront } from 'core/config/resources';

import PopupCarousel from 'site/components/common/popupCarousel';

import UI from 'site/ui';

import s from 'site/styles/property/description';

import styled from 'styled-components';
import media from 'site/styles/media';

const { CountIndicator, DL, Button, Image, Grid: { Container, Row, Col } } = UI;

const DescWrapper = styled.div`
  background: ${p => p.theme.brandWhite};
  width: 100%;
  padding: ${p => (p.isEmpty ? '0.1rem 0 0' : '0 0 1rem')};

  ${media.sm`
    background: ${p => p.theme.bodyBg};
    padding: ${p => (p.isEmpty ? '0.1rem 0 0' : '0 1.5rem 1rem')};
  `} ${media.md`
    padding: ${p => (p.isEmpty ? '0.1rem 0 0' : '0.5rem 0 6rem')};
  `};
`;

const Title = styled.h3`
  font-weight: 500;
  font-size: 1.6rem;
  ${media.sm`
    font-size: 2rem;
  `};
`;

class Description extends Component {
  renderDescription(kind) {
    const { landDetails, communication } = this.props.data;

    if (kind !== 'flat') {
      return (
        <Row>
          <Col xs="12">
            <Row>
              <Col sm="4">
                <Title>Участок</Title>
                <Row>
                  <Col xs="12">
                    <DL name="landSize" type="dimension" value={landDetails.area} />
                    <DL name="landType" type="dictionary" value={landDetails.landscapeKind[0]} />
                    <DL name="landscaping" type="boolean" value={!!landDetails.landscaping} />
                  </Col>
                </Row>
              </Col>
              {!!Object.keys(communication).length && (
                <Col sm="4" className={s.pushedTopXs1_5}>
                  <Title>Коммуникации</Title>
                  <Row className={s.pushedBottomXs2_5Sm3}>
                    <Col xs="12">
                      {communication.gasSupply && (
                        <DL name="gasSupply" type="dictionary" value={communication.gasSupply} />
                      )}
                      {communication.powerSupply && (
                        <DL name="powerSupply" type="dimension" value={communication.powerSupply} />
                      )}
                      {communication.waterSupply && (
                        <DL
                          name="waterSupply"
                          type="dictionary"
                          value={communication.waterSupply}
                        />
                      )}
                      {communication.sewerageSupply && (
                        <DL name="sewers" type="dictionary" value={communication.sewerageSupply} />
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
          <DescWrapper isEmpty={Object.keys(data.specification.layouts).length === 0}>
            <Container>
              <Row>
                {Object.keys(data.specification.layouts).length !== 0 && (
                  <Col xs="12">
                    <Title>Дом</Title>

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
                    <Title>Планировки</Title>
                  </Col>
                  {publicLayoutImages.map((item, i) => (
                    <Col sm="6" md="3" className={s.pushedBottom3}>
                      <PopupCarousel propertyId={data.id} images={publicLayoutImages}>
                        <Button className={s.btn} size="md" block key={i}>
                          <Image
                            src={`${global.config.cloudfront ||
                              cloudfront}/${item.id}-thumbnail-512`}
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
          </DescWrapper>
        </Row>
      );
    }

    return null;
  }
}

export default Description;

import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import global from 'window-or-global';

import { show as seo } from '../../constants/seo';

import UI from 'ui';

import s from 'styles/settlements/id/description';
import st from 'styles/themes';

import styled from 'styled-components';
import media from 'styles/media';

const isJQ = global.config.domain === 'jq.estate';

const {
  Loading,
  Button,
  Grid: { Row, Col },
} = UI;

const Wrapper = styled.div`
  padding: 5rem 0;
  border-top: 1px solid ${p => p.theme.grey};
`;

const Desc = styled.div`
  position: relative;
  max-width: 86rem;
  margin: 0 auto;
  text-align: center;

  ${media.sm`
    text-align: left;
  `};
`;

const Title = styled.h2`
  margin: 0;
  font-size: 2.4rem;
  font-weight: 400;
  padding: 0 1rem;
`;

const DescText = styled.div`
  margin: 0;
  margin-top: 2.5rem;
  font-size: 1.6rem;
  line-height: 2.7rem;
  text-align: left;
`;

class Description extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isTextHidden: true,
    };

    this.showText = this.showText.bind(this);
  }

  showText() {
    this.setState({ isTextHidden: false });
  }

  render() {
    const { data = {}, isFetching } = this.props;

    const { description = {} } = data;
    const { main = {}, satellite = {} } = description;
    const mainText = main.sale || '';
    const satelliteText = satellite.sale || '';

    const text = isJQ ? mainText : satelliteText;

    const hasLongText = text.length > 650;

    return (
      <Wrapper>
        <Row xs="center">
          {isFetching && (
            <Col xs="12">
              <Loading />
            </Col>
          )}

          {!isFetching && description && (
            <Col xs="12" sm="10">
              <Desc>
                <Title>Описание посёлка {data.name}</Title>

                <div
                  className={
                    hasLongText && this.state.isTextHidden && s.hiddenText
                  }
                >
                  <DescText>
                    <ReactMarkdown source={text} />
                  </DescText>
                </div>
              </Desc>
            </Col>
          )}

          {!isFetching && hasLongText && this.state.isTextHidden && (
            <Col xs="12">
              {(!!main.sale || !!satellite.sale) && (
                <Button
                  onClick={this.showText}
                  size="lg"
                  className={st.settlement.btnLoad}
                >
                  Читать полностью
                </Button>
              )}
            </Col>
          )}
        </Row>
      </Wrapper>
    );
  }
}

export default Description;

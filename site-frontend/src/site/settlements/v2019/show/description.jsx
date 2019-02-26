import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import global from 'window-or-global';

import { show as seo } from '../constants/seo';

import UI from 'site/ui';
const {
  Loading,
  Button,
  Grid: { Row, Col },
} = UI;

import cn from 'classnames';
import s from 'site/styles/settlements/id/description';
import st from 'site/styles/themes';
import sUtils from 'site/styles/utils';

const isJQ = global.config.domain === `jq.estate`;

class Description extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isTextHidden: true,
    };
  }

  showText() {
    this.setState({ isTextHidden: false });
  }

  render() {
    const { data = {}, isFetching, dealType, kind } = this.props;

    const { description = {} } = data;
    const { main = {}, satellite = {} } = description;
    const mainText = main.sale || ``;
    const satelliteText = satellite.sale || ``;

    const text = isJQ ? mainText : satelliteText;

    const hasLongText = text.length > 650;

    return (
      <Row xs="center" className={s.descriptionContainer}>
        {isFetching && (
          <Col xs="12">
            <Loading />
          </Col>
        )}

        {!isFetching && description && (
          <Col xs="12" sm="10">
            <div className={s.description}>
              <h2
                className={cn(
                  s.title,
                  !!main.sale || (!!satellite.sale && sUtils.pushedBottom1_5),
                )}
              >
                Описание посёлка {data.name}
              </h2>

              <div
                className={
                  hasLongText && this.state.isTextHidden && s.hiddenText
                }
              >
                <div className={s.descriptionText}>
                  <ReactMarkdown source={text} />
                </div>
              </div>
            </div>
          </Col>
        )}

        {!isFetching && hasLongText && this.state.isTextHidden && (
          <Col xs="12">
            <div>
              {(!!main.sale || !!satellite.sale) && (
                <Button
                  onClick={::this.showText}
                  size="lg"
                  className={st.settlement.btnLoad}
                >
                  Читать полностью
                </Button>
              )}
            </div>
          </Col>
        )}
      </Row>
    );
  }
}

export default Description;

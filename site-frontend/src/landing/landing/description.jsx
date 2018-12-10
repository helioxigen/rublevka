import React, { Component } from 'react';

import ReactMarkdown from 'react-markdown';

import s from 'landing/styles/landing/description';

import UI from 'site/ui';
const {
  Button,
  Grid: { Container, Row, Col },
} = UI;

class Description extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isTextHidden: true,
    };
  }

  toggle() {
    const isTextHidden = !this.state.isTextHidden;

    this.setState({ isTextHidden: isTextHidden });
  }

  render() {
    const { data = {} } = this.props;
    const { main = {} } = data.description || {};

    return (
      <Container fluid>
        <Row xs="center">
          <Col md="10" lg="8">
            <div className={s.container}>
              <h1 className={s.title}>О посёлке</h1>

              <div className={this.state.isTextHidden && s.hiddenText}>
                <div className={s.descriptionText}>
                  <ReactMarkdown source={main.sale} />
                </div>
              </div>

              <Button onClick={::this.toggle} className={s.loadMoreBtn}>{this.state.isTextHidden ? `Читать полностью` : `Скрыть`}</Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Description;

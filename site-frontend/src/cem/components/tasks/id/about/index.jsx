import React, { Component } from 'react';

import UI from 'cem/components/ui';
const {
  Grid: { Container, Row, Col },
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

import Document from 'cem/containers/tasks/document';
import Comments from 'cem/containers/common/comments';

import Status from './status';
import Goal from './goal';
import Result from './result';
import PropertiesSelection from './propertiesSelection';
import Information from './information';

class About extends Component {
  render() {
    const {
      id, data, formKey,
      isDocumentsUploadAllowed, isCommentingAllowed,
    } = this.props;

    const isDocumentsSectionShown = formKey !== 'create' && data.kind === 'preview' && isDocumentsUploadAllowed && data.state !== 'canceled';

    return (
      <Container fluid>
        <Row>
          <section className={s.section}>
            <section>
              <Information {...this.props} />
              <PropertiesSelection {...this.props} />
              <Goal {...this.props} />
              <Result {...this.props} />
              {isDocumentsSectionShown && <Document taskId={formKey} />}
            </section>
            {formKey !== 'create' && isCommentingAllowed &&
              <Row className={sUtils.pushedBottom6}>
                <Col md="18">
                  <Comments entity={{ key: 'tasks', id }} />
                </Col>
              </Row>
            }
            <Row>
              <Col sm="18">
                <Status {...this.props} />
              </Col>
            </Row>
          </section>
        </Row>
      </Container>
    );
  }
}

export default About;

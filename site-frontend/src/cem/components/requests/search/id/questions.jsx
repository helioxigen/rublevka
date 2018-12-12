import React, { Component } from 'react';

import { captions } from 'cem/constants/requests/images/dictionaries';

import { reduxForm } from 'redux-form';

import UI from 'cem/components/ui';
const {
  Rating,
  Grid: { Row, Col },
  Form: { Label, Group },
 } = UI;

import s from 'cem/styles/modal/list';

const formSettings = {
  form: 'hubImageRequestQuestions',
  fields: [
    'questions[].questionId',
    'questions[].text',
    'questions[].rate',
  ],
};

export default reduxForm(formSettings)(
  class extends Component {
    render() {
      const { fields } = this.props;

      return (
        <section>
          {fields.questions.map(question => (
            <Row className={s.pushedBottom1}>
              <Col sm="20">
                <Group>
                  <Label className={s.pushedBottom1_2}>{question.text.value}</Label>
                  <Rating {...question.rate} captions={captions} />
                </Group>
              </Col>
            </Row>
          ))}
        </section>
      );
    }
  },
);

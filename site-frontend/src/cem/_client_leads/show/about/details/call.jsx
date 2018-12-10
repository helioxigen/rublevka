import React from 'react';

import * as dict from 'cem/constants/leads/dictionaries';

import cn from 'classnames';
import UI from 'cem/components/ui';
const {
  FormattedTime, Heading,
  Grid: { Row, Col },
  Form: { Label, Static, Group },
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

export default ({ phoneCallDetails = {}, className }) => {
  const callStatus = phoneCallDetails.status;

  if (callStatus) {
    return (
      <section className={className}>
        <Heading size="md">Звонок</Heading>

        <Row>
          <Col sm="5">
            <Group>
              <Label block>Статус</Label>

              <Static className={cn(sUtils.fontSizeMd, s[dict.callStatuses[callStatus].style])}>
                {dict.callStatuses[callStatus].title}
              </Static>
            </Group>
          </Col>
          {callStatus === 'unsuccessful' && (
            <Col sm="15">
              <Group>
                <Label block>Причина</Label>
                <Static className={sUtils.fontSizeMd}>
                  {phoneCallDetails.reason}
                </Static>
              </Group>
            </Col>
          )}
          {/* {callStatus === `successful` && (
            <Col sm="5">
              <Group>
                <Label block>Длительность</Label>
                <Static className={sUtils.fontSizeMd}>
                  <FormattedTime time={phoneCallDetails.duration} />
                </Static>
              </Group>
            </Col>
          )} */}
          {callStatus === 'successful' && (
            <Col sm="15">
              <Group>
                <Label block>Запись</Label>
                <Static>
                  <audio src={phoneCallDetails.callRecordingUrl} controls />
                </Static>
              </Group>
            </Col>
          )}
        </Row>
      </section>
    );
  }
  return <section />;
};

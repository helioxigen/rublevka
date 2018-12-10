import React from 'react';
import cn from 'classnames';

import UI from 'cem/components/ui';
const { Form, Button, Grid, Icon, Form: { Group, Input }, Grid: { Row, Col } } = UI;

import s from 'cem/styles/ui/card';
import sUtils from 'cem/styles/utils';

import { api } from 'core/config/constants';

const Image = ({ id, ...props }) => {
  // <UI.Image className={s.image} src={src} height="256" title="" alt="" />
  // <RetinaImage className={s.image} src={`${src}-256`} height="256" title="" alt="" />
  const isFullHeight =
    !props.showComment && !props.showPublic && !props.showDownload && props.disabled;
  return (
    <div
      className={cn(s.imageContainer, { [s.fullHeight]: isFullHeight })}
      style={{ backgroundImage: `url(${api.cloudfront}/${id.value}-thumbnail-256)` }}
    />
  );
};

const Controls = props => (
  <Grid.Container fluid>
    <Row>
      {props.showComment && (
        <Group>
          <Input type="text" placeholder="Комментарий" block {...props.comment} />
        </Group>
      )}
      {props.showPublic && (
        <Col xs="9">
          <Group>
            <Form.Label className={s.label}>
              <Input type="checkbox" {...props.isPublic} disabled={props.disabled} /> На сайте
            </Form.Label>
          </Group>
        </Col>
      )}
      <Col xs="11" className={sUtils.textRight}>
        {props.showDownload && (
          <a className={s.btn} href={props.url.value} target="_blank">
            <Icon className={s.icon} icon="download" /> Скачать
          </a>
        )}
        {!props.disabled &&
        props.showDelete && (
          <Button
            className={s.btn}
            onClick={(e) => {
              e.preventDefault();
              props.remove(props.index, props.isPublic);
            }}
          >
            <Icon className={s.icon} icon="delete" /> Удалить
          </Button>
        )}
      </Col>
    </Row>
  </Grid.Container>
);

const Card = ({
  connectDropTarget,
  connectDragSource,
  isDragging,
  url,
  toggleCarousel,
  ...props
}) =>
  connectDragSource(
    connectDropTarget(
      <div className={cn(s.cardPhotos, { [s.isDragging]: isDragging })}>
        <section onClick={() => toggleCarousel(props.index)}>
          <Image id={props.id.value} src={url.value} block {...props} />
        </section>

        <Controls {...props} url={url} />
      </div>,
    ),
  );

export default Card;

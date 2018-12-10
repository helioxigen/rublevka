/* eslint no-param-reassign: [0, { "props": false }] */
import React from 'react';

import { cloudfront } from 'core/config/resources';

import { DragSource, DropTarget } from 'react-dnd';

import UI from 'cem/components/ui';
const { Button, Icon, Grid: { Col, Row, Container }, Form: { Group, Label, Input } } = UI;

import cn from 'classnames';
import s from 'cem/styles/ui/card';
import sUtils from 'cem/styles/utils';

const Image = ({ id }) => (
  <div
    className={s.imageContainer}
    style={{ backgroundImage: `url(${cloudfront}/${id}-thumbnail-256)` }}
  />
);

const sourceSpec = {
  beginDrag: props => ({
    id: props.id.value,
    index: props.index,
  }),
  isDragging: (props, monitor) => props.id.value === monitor.getItem().id,
};

const targetSpec = {
  hover(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    if (dragIndex === hoverIndex) {
      return;
    }
    // Performance reasons, drang & drop is working slow as it is due to reduxForm.
    // Using something else here would make matters worse.
    monitor.getItem().index = hoverIndex;
    props.reorder(dragIndex, hoverIndex);
  },
};

const collectSource = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

const collectTarget = connect => ({
  connectDropTarget: connect.dropTarget(),
});

const PhotosDescription = props => (
  <Container fluid>
    <Row>
      <Col sm="7" md="9">
        <Group>
          <Label className={s.label}>
            <Input type="checkbox" {...props.isPublic} disabled={props.disabled} /> На сайте
          </Label>
        </Group>
      </Col>

      <Col sm="13" md="11" className={sUtils.textRight}>
        {/* <a className={s.btn} href={props.url.value} target="_blank">
          <Icon className={s.icon} icon="download" /> Скачать
        </a>*/}
        {!props.disabled && (
          <Button className={s.btn} type="button" onClick={() => props.remove(props.index)}>
            <Icon className={s.icon} icon="delete" /> Удалить
          </Button>
        )}
      </Col>
    </Row>
  </Container>
);

const Card = (props) => {
  const { connectDropTarget, connectDragSource, isDragging, id, toggleCarousel } = props;

  return connectDragSource(
    connectDropTarget(
      <div className={cn(s.cardPhotos, { [s.isDragging]: isDragging })}>
        <section onClick={() => toggleCarousel(props.index)}>
          <Image id={id.value} />
        </section>
        <PhotosDescription {...props} />
      </div>,
    ),
  );
};

export default DropTarget('complexes.photos.card', targetSpec, collectTarget)(
  DragSource('complexes.photos.card', sourceSpec, collectSource)(Card),
);

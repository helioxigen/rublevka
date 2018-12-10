// TODO: fixme :37
/* eslint no-param-reassign: [0, { "props": false }] */

import Card from 'cem/components/common/photos/card';

import { DragSource, DropTarget } from 'react-dnd';

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

export const PhotoCard = DropTarget('properties.photos.card', targetSpec, collectTarget)(DragSource('properties.photos.card', sourceSpec, collectSource)(Card));
export const LayoutCard = DropTarget('properties.photos.cardLayout', targetSpec, collectTarget)(DragSource('properties.photos.cardLayout', sourceSpec, collectSource)(Card));

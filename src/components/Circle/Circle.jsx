import React from 'react';
import { DragSource } from 'react-dnd';

import { ItemTypes } from '../ItemTypes';

import './Circle.css';

// Source object for Drag and Drop
const pointSource = {
  beginDrag(props) {
    return {
      positionIndex: props.positionIndex,
    };
  },
}

// Collect function for Drag and Drop
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

/**
 * Circle Component
 *
 * @extends React.Component
 */
class Circle extends React.Component {
  /**
   * Renders the component
   *
   * @return {string} JSX component
   */
  render() {
    const { connectDragSource, isDragging } = this.props;

    const component = (
        <circle
          draggable={false}
          cx={this.props.position.x}
          cy={this.props.position.y}
          r={isDragging ? (this.props.radius + 3) : this.props.radius}
          className={this.props.className} />
    );

    if (this.props.isDraggable === true) {
      return connectDragSource(component);
    }
    return component;
  }
}

/**
 * Default component properties
 */
Circle.defaultProps = {
  position: {
    x: -10,
    y: -10,
  },
  radius: 11/2,
  className: '',
  isDraggable: false,
};

export default DragSource(ItemTypes.POINT, pointSource, collect)(Circle);

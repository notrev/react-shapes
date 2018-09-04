import React from 'react';
import { DropTarget } from 'react-dnd';

import { ItemTypes } from '../ItemTypes';

import './SVG.css';

// Target object for Drag and Drop
const SVGTarget = {
  drop(props, monitor, component) {
    // drop is mandatory by the lib, but does nothing.
  },

  // callback for when the draggable element is hovering the drop area
  hover(props, monitor, component) {
    if (!component) {
      return;
    }

    const newPosition = monitor.getClientOffset();
    const positionIndex = monitor.getItem().positionIndex;
    props.handleDrop(positionIndex, newPosition);
  }
};

// Collect function for Drag and Drop
function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

/**
 * SVG Component
 *
 * @extends React.Component
 */
class SVG extends React.Component {
  /**
   * Renders the component
   *
   * @return {string} JSX component
   */
  render() {
    const { connectDropTarget } = this.props;

    return connectDropTarget(
      <svg className="app__svg" onClick={this.props.onClick}>
        {this.props.children}
      </svg>
    );
  }
}

export default DropTarget(ItemTypes.POINT, SVGTarget, collect)(SVG);

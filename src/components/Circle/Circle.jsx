import React from 'react';

import './Circle.css';

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
    return (
      <circle
        cx={this.props.position.x}
        cy={this.props.position.y}
        r={this.props.radius}
        className={this.props.className} />
    );
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
};

export default Circle;

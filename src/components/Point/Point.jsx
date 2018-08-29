import React from 'react';

/**
 * Point Component
 *
 * @extends React.Component
 */
class Point extends React.Component {
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
        fill={this.props.fill}
        stroke={this.props.stroke ? this.props.stroke.color : null}
        strokeWidth={this.props.stroke ? this.props.stroke.width : null}/>
    );
  }
}

/**
 * Default component properties
 */
Point.defaultProps = {
  position: {
    x: -10,
    y: -10,
  },
  radius: 11/2,
  fill: '#f00',
  stroke: {
    color: null,
    width: null,
  },
};

export default Point;

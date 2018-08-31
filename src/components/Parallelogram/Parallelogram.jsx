import React from 'react';

import './Parallelogram.css';

/**
 * Parallelogram Component
 *
 * @extends React.Component
 */
class Parallelogram extends React.Component {
  /**
   * Creates a string with the points array in the component's props and returns it
   *
   * @return {string} String with points in the order: a, b, d, c
   */
  preparePoints() {
    let pointsString = `${this.props.points[0].x},${this.props.points[0].y} ` +
      `${this.props.points[1].x},${this.props.points[1].y} ` +
      `${this.props.points[3].x},${this.props.points[3].y} ` +
      `${this.props.points[2].x},${this.props.points[2].y}`;
    return pointsString;
  }

  /**
   * Renders component
   *
   * @return {string} JSX component
   */
  render() {
    return <polygon points={this.preparePoints()} className={this.props.className} />;
  }
}

Parallelogram.defaultProps = {
  points: [],
  className: 'app__parallelogram',
};

export default Parallelogram;

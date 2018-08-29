import React from 'react';

import './SVG.css';

/**
 * SVG Component
 *
 * @extends React.Component
 */
class SVG extends React.Component {
  /**
   * Class constructor
   *
   * @constructor
   * @param {object} props Component properties
   */
  constructor(props) {
    super(props);
    this.state = {
      points: [],
    };

    this.handleClick = this.handleClick.bind(this);
    this.drawPoints = this.drawPoints.bind(this);
  }

  /**
   * Handles click events
   *
   * Calculates mouse pointer position during the click event and updates
   * component state to add the new point to the points list
   *
   * @param {object} evt Event object
   */
  handleClick(evt) {
    console.log('handleClick()');
    const dimension = evt.target.getBoundingClientRect();
    const pointPosition = {
      x: evt.clientX - dimension.left,
      y: evt.clientY - dimension.top,
    };

    const newPoints = [...this.state.points];
    if (newPoints.length >= 3) {
      console.log('Maximum number of points reached');
      return;
    }

    newPoints.push(pointPosition);

    this.setState({
      points: newPoints,
    });
  }

  /**
   * Creates SVG circle elements with the parameters from the points list in the component state
   *
   * @return {Array} List of SVG circle elements
   */
  drawPoints() {
    return this.state.points.map((point, i) => <circle key={i} cx={point.x} cy={point.y} r={11/2} fill="#f00" />);
  }

  /**
   * Renders the component
   *
   * @return {string} JSX component
   */
  render() {
    return (
      <svg className="app__svg" onClick={this.handleClick}>
        {this.drawPoints()}
      </svg>
    );
  }
}

export default SVG;

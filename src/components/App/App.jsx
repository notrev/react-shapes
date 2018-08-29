import React from 'react';

import './App.css';
import { SVG, Point } from '../';

/**
 * App Component
 *
 * Main application component
 *
 * @extends React.Component
 */
class App extends React.Component {
  /**
   * Class constructor
   *
   * @param {object} props Component properties
   */
  constructor(props) {
    super(props);
    this.state = {
      points: [],
    };

    this.handleClickOnSVG = this.handleClickOnSVG.bind(this);
    this.createPoints = this.createPoints.bind(this);
    this.clearPoints = this.clearPoints.bind(this);
  }

  /**
   * Handles click events on SVG component
   *
   * Calculates mouse pointer position during the click event and updates
   * component state to add the new point to the points list
   *
   * @param {object} evt Event object
   */
  handleClickOnSVG(evt) {
    console.log('handleClickOnSVG()');
    // if clicked 3 times, don't create more points on next clicks
    if (this.state.points.length >= 3) {
      return;
    }

    const newPoints = [...this.state.points];
    const dimension = evt.target.getBoundingClientRect();
    let pointPosition = {
      x: evt.clientX - dimension.left,
      y: evt.clientY - dimension.top,
    };

    newPoints.push(pointPosition);

    // calculate the 4th point
    if (newPoints.length === 3) {
      pointPosition = this.calculate4thPoint(...newPoints);
      newPoints.push(pointPosition);
    }

    this.setState({
      points: newPoints,
    });
  }

  /**
   * Calculates the 4th point of a parallelogram, given 3 other points
   *
   * @param {object} a Position object containing x and y properties
   * @param {object} b Position object containing x and y properties
   * @param {object} c Position object containing x and y properties
   * @return {object} Position object containing x and y properties
   */
  calculate4thPoint(a, b, c) {
    console.log('calculate4thPoint()');

    if (!a || !b || !c) {
      return null;
    }

    return {
      x: c.x + (b.x - a.x),
      y: c.y + (b.y - a.y),
    };
  }

  /**
   * Creates Point components with the parameters from the points list in the component state
   *
   * @param {number} limit Number of elements to be created
   * @return {Array} List of Point components
   */
  createPoints(limit) {
    if (!limit || typeof limit !== 'number') {
      limit = this.state.points.length;
    }

    return this.state.points
      .filter((position, i) => i < limit)
      .map((position, i) => <Point key={i} position={position} />);
  }

  /**
   * Resets the points list in the component state
   */
  clearPoints() {
    this.setState({ points: [] });
  }

  /**
   * Renders the component
   *
   * @return {string} JSX component
   */
  render() {
    return (
      <div className="app">
        <SVG onClick={this.handleClickOnSVG}>
          {this.createPoints()}
        </SVG>
      </div>
    );
  }
}

export default App;

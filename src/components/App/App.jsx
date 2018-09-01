import React from 'react';

import './App.css';
import { SVG, Circle, Parallelogram } from '../';

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
      center: { x: 0, y: 0 },
      area: 0,
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
    // if clicked 3 times, don't create more points on next clicks
    if (this.state.points.length >= 3) {
      return;
    }

    const newState = {};
    const newPoints = [...this.state.points];
    const dimension = evt.target.getBoundingClientRect();
    let pointPosition = {
      x: evt.clientX - dimension.left,
      y: evt.clientY - dimension.top,
    };

    newPoints.push(pointPosition);

    newState.points = newPoints;

    // calculate the 4th point
    if (newPoints.length === 3) {
      pointPosition = this.calculate4thPoint(...newPoints);
      newPoints.push(pointPosition);
      newState.points = newPoints;

      newState.area = this.calculateAreaOfParallelogram(...newPoints);
      newState.center = this.calculateCenterOfMassOfParallelogram(...newPoints);
    }
    this.setState(newState);
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
    if (!a || !b || !c) {
      return null;
    }

    return {
      x: c.x + (b.x - a.x),
      y: c.y + (b.y - a.y),
    };
  }

  /**
   * Calculates the center of mass of a parallelogram
   *
   * @param {object} a Position object containing x and y properties
   * @param {object} b Position object containing x and y properties
   * @param {object} c Position object containing x and y properties
   * @param {object} d Position object containing x and y properties
   * @return {object} Position object containing x and y properties
   */
  calculateCenterOfMassOfParallelogram(a, b, c, d) {
    if (!a || !b || !c || !d) {
      return null;
    }

    return {
      x: a.x + ((d.x - a.x) / 2),
      y: b.y + ((c.y - b.y) / 2),
    };
  }

  /**
   * Calculates the area of a parallelogram using the shoelace formula
   *
   * @param {object} a Position object containing x and y properties
   * @param {object} b Position object containing x and y properties
   * @param {object} c Position object containing x and y properties
   * @param {object} d Position object containing x and y properties
   * @return {object} Position object containing x and y properties
   */
  calculateAreaOfParallelogram(a, b, c, d) {
    const area = Math.abs((a.x * b.y) + (b.x * d.y) + (d.x * c.y) + (c.x * a.y) -
        (b.x * a.y) - (d.x * b.y) - (c.x * d.y) - (a.x * c.y));

    return area / 2;
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
      .map((position, i) => <Circle key={i} position={position} className="app__point"/>);
  }

  /**
   * Resets the points list in the component state
   */
  clearPoints() {
    this.setState({ points: [] });
  }

  /**
   * Creates a parallelogram with the points in the components state, if there are 4 of them
   *
   * @return {string} JSX component
   */
  createParallelogram() {
    if (this.state.points.length < 4) {
      return;
    }
    return <Parallelogram points={this.state.points} />;
  }

  /**
   * Creates a circle with the same area as the parallelogram
   */
  createCircle() {
    if (this.state.points.length < 4) {
      return;
    }

    const radius = Math.sqrt(this.state.area / (2 * Math.PI));
    return <Circle position={this.state.center} radius={radius} className="app__circle" />;
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
          {this.createParallelogram()}
          {this.createCircle()}
          {this.createPoints(3)}
        </SVG>
      </div>
    );
  }
}

export default App;

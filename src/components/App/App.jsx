import React from 'react';
import { DragDropContext } from 'react-dnd';
import MouseBackend from 'react-dnd-mouse-backend';

import { Info, About, SVG, Circle, Parallelogram } from '../';

import './App.css';

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
      center: { x: -1, y: -1 },
      area: 0,
      shouldShowAbout: false,
    };

    this.handleClickOnSVG = this.handleClickOnSVG.bind(this);
    this.createPoints = this.createPoints.bind(this);
    this.resetState = this.resetState.bind(this);
    this.movePoint = this.movePoint.bind(this);
    this.showAbout = this.showAbout.bind(this);
    this.hideAbout = this.hideAbout.bind(this);
    this.about = this.about.bind(this);
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
      .map((position, i) => (
        <Circle
          key={i}
          positionIndex={i}
          position={position}
          isDraggable={true}
          className="app__point" />
      ));
  }

  /**
   * Makes all necessary calculation when a point is moved and set the new component state
   *
   * @param {number} positionIndex Index of the moved point in the points list
   * @param {object} newPosition Object containing the new position for the moved component
   */
  movePoint(positionIndex, newPosition) {
    const newState =  { ...this.state };
    newState.points = newState.points.filter((item, i) => i < 3);
    newState.points[positionIndex] = newPosition;

    if (newState.points.length === 3) {
      newState.points.push(this.calculate4thPoint(...newState.points));
      newState.area = this.calculateAreaOfParallelogram(...newState.points);
      newState.center = this.calculateCenterOfMassOfParallelogram(...newState.points);
    }

    this.setState(newState);
  }

  /**
   * Resets the component state to its initial values
   */
  resetState() {
    this.setState({
      points: [],
      center: { x: -1, y: -1 },
      area: 0,
    });
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
   * Sets a flag in the component state that indicates that the About component should be shown
   *
   */
  showAbout() {
    this.setState({ shouldShowAbout: true });
  }

  /**
   * Sets a flag in the component state that indicates that the About component should be hidden
   *
   */
  hideAbout() {
    this.setState({ shouldShowAbout: false });
  }

  /**
   * Checks if the shouldShowAbout flag is set to true in the component state, and returns the
   * About component if it is
   *
   * @return {string} JSX component
   */
  about() {
    if (this.state.shouldShowAbout === true) {
      return <About handleBackClick={this.hideAbout}/>;
    }
  }

  /**
   * Renders the component
   *
   * @return {string} JSX component
   */
  render() {
    return (
      <div className="app">
        {this.about()}
        <div className="app-sidebar">
          <div className="app-sidebar__item-wrapper--centralized">
            <button className="app-sidebar__button--primary" onClick={this.showAbout}>About</button>
          </div>

          <div className="app-sidebar__item-wrapper">
            <div className="app-sidebar__separator"></div>
          </div>

          <div className="app-sidebar__item-wrapper">
            <Info
              points={this.state.points}
              area={this.state.area}
              center={this.state.center}
            />
          </div>

          <div className="app-sidebar__item-wrapper--centralized">
            <button className="app-sidebar__button--warning" onClick={this.resetState}>Reset</button>
          </div>

        </div>
        <SVG onClick={this.handleClickOnSVG} handleDrop={this.movePoint}>
          {this.createParallelogram()}
          {this.createCircle()}
          {this.createPoints(3)}
        </SVG>
      </div>
    );
  }
}

export default DragDropContext(MouseBackend)(App);

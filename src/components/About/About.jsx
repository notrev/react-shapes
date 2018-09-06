import React from 'react';

import './About.css';

/**
 * About component
 *
 * @extends React.Component
 */
class About extends React.Component {
  /**
   * Renders the component
   */
  render() {
    return (
      <div className="about-wrapper">
        <div className="about">
          <div className="about__header">
            <button className="about__button" onClick={this.props.handleBackClick}>Back</button>
          </div>
          <div className="about__content">
            <h1>React Shapes</h1>
            <h2>About</h2>
            <p>
              This is a React application that allows you to click on 3 points in the application screen, which are identified by small red circles.
              When the third point is selected, the application automatically calculates the 4th point, based on the 3 previous ones, in order to draw a blue parallelogram.</p>
            <p>
              It also draws a yellow circle positioned in the same center of mass as the parallelogram, with the same area.
            </p>
            <p>
              The selected points are draggable, allowing you to adjust their positions individually. By dragging any of the points, the area and center of mass of the blue parallelogram and the yellow circle are updated accordingly.
            </p>
            <p>Developed by Éverton Arruda</p>
          </div>
        </div>
      </div>
    );
  }
}

export default About;

import React from 'react';

import './Info.css';

/**
 * Info component
 *
 * @extends React.Component
 */
class Info extends React.Component {
  /**
   * Renders the component
   */
  render() {
    let coordinates = 'none';
    let center = 'none';
    let area = 'none';

    if (this.props.points.length > 0) {
      const edges = ['A', 'B', 'C', 'D'];

      coordinates = this.props.points
        .map((point, i) => <li key={i}>{edges[i]}({point.x}, {point.y})</li>);
    }

    if (this.props.area) {
      area = this.props.area;
    }

    if (this.props.center && this.props.center.x > -1 && this.props.center.y > -1) {
      center = `(${this.props.center.x}, ${this.props.center.y})`;
    }

    return (
      <div className="app-info">
        <ul className="app-info__list">
          <li className="app-info__list-item">
            <label htmlFor="app-info__area">Area:</label>
            <div className="app-info__area">{area}</div>
          </li>
          <li className="app-info__list-item">
            <label htmlFor="app-info__center">Center of mass:</label>
            <div className="app-info__center">{center}</div>
          </li>
          <li className="app-info__list-item">
            <label htmlFor="app-info__coordinates">Coordinates:</label>
            <ul className="app-info__coordinates">{coordinates}</ul>
          </li>
        </ul>
      </div>
    );
  }
}

Info.defaultProps = {
  points: [],
  center: { x: -1, y: -1 },
  area: 0,
};

export default Info;

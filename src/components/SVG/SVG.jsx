import React from 'react';

import './SVG.css';

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
    return (
      <svg className="app__svg" onClick={this.props.onClick}>
        {this.props.children}
      </svg>
    );
  }
}

export default SVG;

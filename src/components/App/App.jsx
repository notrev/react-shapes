import React from 'react';

import './App.css';
import SVG from '../SVG/SVG.jsx';

/**
 * App Component
 *
 * Main application component
 *
 * @extends React.Component
 */
class App extends React.Component {
  /**
   * Renders the component
   *
   * @return {string} JSX component
   */
  render() {
    return (
      <div className="app">
        <SVG />
      </div>
    );
  }
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import SVG from './SVG.jsx';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SVG />, div);
  ReactDOM.unmountComponentAtNode(div);
});

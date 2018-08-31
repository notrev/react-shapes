import React from 'react';
import ReactDOM from 'react-dom';
import Circle from '../';

import './Circle.css';

it('renders without crashing', () => {
  const position = [{ x: 3, y: 3 }];
  const radius = 2;
  const div = document.createElement('div');
  ReactDOM.render(<Circle position={position} radius={radius} className="app__circle" />, div);
  ReactDOM.unmountComponentAtNode(div);
});

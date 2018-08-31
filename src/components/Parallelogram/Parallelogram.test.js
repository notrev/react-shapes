import React from 'react';
import ReactDOM from 'react-dom';
import Parallelogram from '../';

it('renders without crashing', () => {
  const points = [{ x: 0, y: 0 }, { x: 5, y: 0 }, { x: 3, y: 5 }, { x: 8, y: 5 }];
  const div = document.createElement('div');
  ReactDOM.render(<Parallelogram points={points}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

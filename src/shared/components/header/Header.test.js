import React from 'react';
import { render } from '@testing-library/react';
 
import Header from './Header';
 
describe('Header Test', () => {
  test('renders Header component', () => {
    render(<Header />);
  });
});

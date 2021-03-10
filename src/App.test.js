import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  // const button = screen.getByRole('button', {name: /start demo/i});
  // button.click()
  // const linkElement = getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});

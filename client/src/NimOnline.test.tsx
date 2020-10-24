import React from 'react';
import { render } from '@testing-library/react';
import App from './NimOnline';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/nim/i);
  expect(linkElement).toBeInTheDocument();
});

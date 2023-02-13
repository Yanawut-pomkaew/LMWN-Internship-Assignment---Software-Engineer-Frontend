import React from 'react'
import {render , cleanup} from '@testing-library/react';
import App from './src/App';
import '@testing-library/jest-dom/extend-expect'

afterEach(() => {
    cleanup(); 
})

describe('can run file test' , () => {
    test('should be able to run unit test' , () => {});
})

test('renders learn react link', () => {
    const { getByText } = render(<App />);
    const Text = getByText(/learn react/i);
    expect(Text).toBeInTheDocument();
});
  
import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

test('renders app component', () => {
	render(<App />);
	const linkElement = screen.getByText(/Your simple ts-react setup is ready!/i);
	expect(linkElement).toBeInTheDocument();
});

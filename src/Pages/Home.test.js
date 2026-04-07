import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

// Mock axios
jest.mock('axios');

const mockEvents = [
  {
    id: 1,
    title: 'Miss Africa 2026',
    description_event: 'A prestigious beauty pageant.',
    banner_event_main: { url: 'https://test-image.jpg' }
  }
];

test('fetches events and displays the first event on load', async () => {
  axios.get.mockResolvedValue({ data: mockEvents });

  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  // Check if API was called
  expect(axios.get).toHaveBeenCalled();

  // Wait for the title to appear in the UI
  const title = await screen.findByText(/Miss Africa 2026/i);
  expect(title).toBeInTheDocument();
  
  // Check if the description is there
  expect(screen.getByText(/A prestigious beauty pageant/i)).toBeInTheDocument();
});
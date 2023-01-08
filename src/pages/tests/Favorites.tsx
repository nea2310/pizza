import { BrowserRouter } from 'react-router-dom';
import Favorites from '../favorites/Favorites'
import { screen } from '@testing-library/react'
import { renderWithProviders } from './testUtils/testUtils';
import { initialStore } from './testUtils/mockedStore';




describe('Favorites page rendering', () => {
  it('657676576', () => {
    renderWithProviders(<BrowserRouter><Favorites /></BrowserRouter>, {
      preloadedState: initialStore });
    screen.debug();
  });
});

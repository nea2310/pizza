import { BrowserRouter } from 'react-router-dom';
import Favorites from '../favorites/Favorites';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../shared/testUtils/testUtils';
import { initialStore } from '../../shared/testUtils/mockedStore';

describe('Favorites page rendering', () => {
  it('Renders Favorites page', async() => {
      const favoritesPage = renderWithProviders(<BrowserRouter><Favorites /></BrowserRouter>, {
        preloadedState: initialStore
      });

      expect(favoritesPage).toMatchSnapshot();
  });
});

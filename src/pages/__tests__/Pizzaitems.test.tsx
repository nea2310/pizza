import { BrowserRouter } from 'react-router-dom';
import PizzaItems from '../pizzaItems/pizzaItems';
import { screen} from '@testing-library/react'
import { renderWithProviders } from '../../shared/testUtils/testUtils';
import { initialStore } from '../../shared/testUtils/mockedStore';

describe('PizzaItems page rendering', () => {
  it('Renders PizzaItems page', async() => {
      const favoritesPage = renderWithProviders(<BrowserRouter><PizzaItems /></BrowserRouter>, {
        preloadedState: initialStore
      });

      expect(favoritesPage).toMatchSnapshot();
  });
});

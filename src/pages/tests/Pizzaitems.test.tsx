import { BrowserRouter } from 'react-router-dom';
import PizzaItems from '../pizzaItems/pizzaItems';
import { screen} from '@testing-library/react'
import { renderWithProviders } from './testUtils/testUtils';
import { initialStore } from './testUtils/mockedStore';

describe('PizzaItems page rendering', () => {
  it('657676576', () => {
    renderWithProviders(<BrowserRouter><PizzaItems /></BrowserRouter>, {
      preloadedState: initialStore });
    screen.debug();
  });
});

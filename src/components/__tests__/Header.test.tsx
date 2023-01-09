import Header from '../header/Header';
import { renderWithProviders } from '../../shared/testUtils/testUtils';
import { initialStore } from '../../shared/testUtils/mockedStore';
import { BrowserRouter } from 'react-router-dom';

describe('Header component rendering', () => {
  it('Renders Header component', async() => {
    const headerComponent = renderWithProviders(<BrowserRouter><Header /></BrowserRouter>, {
      preloadedState: initialStore
    });

    expect(headerComponent).toMatchSnapshot();
  });
});

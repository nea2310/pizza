import App from '../App';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '../shared/testUtils/testUtils';
import { initialStore } from '../shared/testUtils/mockedStore';


export const handlers = [
  rest.get('../../firebaseAPI/fetchPizzaItems', (req, res, ctx) => {
    return res(ctx.json({}), ctx.delay(0))
  }),
  rest.get('../../firebaseAPI/fetchUser', (req, res, ctx) => {
    return res(ctx.json({}), ctx.delay(100))
  })
]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe('Application rendering', () => {
  it('Renders application with correct routing', async () => {
    const application = renderWithProviders(<App />, {
      preloadedState: initialStore
    });
    expect(application).toMatchSnapshot();

    const aboutLink = screen.getByRole('link', { name: /О нас/i });
    fireEvent.click(aboutLink);
    expect(await screen.findByText(/О нас - раздел находится в разработке/i)).toBeInTheDocument();

    const dealsLink = screen.getByRole('link', { name: /Акции/i });
    fireEvent.click(dealsLink);
    expect(await screen.findByText(/Акции - раздел находится в разработке/i)).toBeInTheDocument();

    const favoritesLink = screen.getByRole('link', { name: /Избранное/i });
    fireEvent.click(favoritesLink);
    expect(await screen.findByText(/Заказать пиццу/i)).toBeInTheDocument();

    const blogLink = screen.getByRole('link', { name: /Блог/i });
    fireEvent.click(blogLink);
    expect(await screen.findByText(/Блог - раздел находится в разработке/i)).toBeInTheDocument();

    const homeLink = screen.getByTitle('главная страница');
    fireEvent.click(homeLink);
    expect(await screen.findByText(/Заказать пиццу/i)).toBeInTheDocument();
  });
});

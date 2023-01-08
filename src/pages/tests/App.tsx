import App from '../../App';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { fireEvent, screen } from '@testing-library/react'
// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from './testUtils/testUtils';
import { initialStore } from './testUtils/mockedStore';


export const handlers = [
  rest.get('../../firebaseAPI/fetchPizzaItems', (req, res, ctx) => {
    return res(ctx.json({}), ctx.delay(150))
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
  it('657676576', async () => {
    renderWithProviders(<App />, {
      preloadedState: initialStore });
    const link = screen.getByRole('link', { name: /Акции/i });
    fireEvent.click(link);
    expect(await screen.findByText(/Акции - раздел находится в разработке/i)).toBeInTheDocument();
    screen.debug();
  });
});

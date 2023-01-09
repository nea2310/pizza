import { screen } from '@testing-library/react';
import Order from '../order/order';
import { renderWithProviders } from '../../shared/testUtils/testUtils';
import { initialStore } from '../../shared/testUtils/mockedStore';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

// const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual<typeof import('react-router-dom')>('react-router-dom'),
  // useNavigate: () => mockedUseNavigate,
  // useLocation: jest.fn(() => {
  //   return { state: { total: 10 } };
  // }), - так не работает
  useLocation: () => {
    return { state: { total: 10 } };
  },
}));

describe('Order page rendering', () => {

  it('Renders Order page', async() => {
    const orderPage = renderWithProviders(<BrowserRouter><Order /></BrowserRouter>, {
      preloadedState: initialStore
    });

    expect(orderPage).toMatchSnapshot();

    const backToCart = screen.getByText(/Вернуться в корзину/);
    expect(backToCart).toBeInTheDocument();
    // fireEvent.click(backToCart);
    // expect(backToCart).toBeInTheDocument(); // не перешел в корзину
    const orderButton = screen.getByText(/Заказать/);
    expect(orderButton).toBeInTheDocument();
    const nameField = screen.getByLabelText(/Имя/);
    const phoneField = screen.getByLabelText(/Телефон/);
    const emailField = screen.getByLabelText(/Email/);
    expect(nameField).toBeInTheDocument();
    expect(phoneField).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    userEvent.type(nameField, 'Тестовое Имя');
    userEvent.type(phoneField, '123456789');
    userEvent.type(emailField, 'gfhdsgfksfgfgftf@kjk.jhjh');
  });
});

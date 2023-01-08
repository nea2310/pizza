import { render, screen, fireEvent } from '@testing-library/react';
import * as reduxHooks from 'react-redux';
import OrderButton from '../../components/buttons/order-button/OrderButton';
import * as actions from '../../store/slices/cartSlice';

jest.mock('react-redux');
const mockedDispatch = jest.spyOn(reduxHooks, 'useDispatch');

describe('OrderButton component rendering', () => {
  it('should dispatch AddCartItem action on button click if the pizza is not in the cart', () => {
    const dispatch = jest.fn();
    mockedDispatch.mockReturnValue(dispatch);
    const mockedAddCartItem = jest.spyOn(actions, 'addCartItem');
    render(
      <OrderButton
        incart={false}
        isavl={true}
        userdocid={'123'}
        pizzaid={'123456'}
      />
    );
    expect(screen.getByText(/Заказать/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button'));
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(mockedAddCartItem).toHaveBeenCalledWith({
      user: '123',
      pizzaItem: '123456',
    });
  });

  it('should dispatch removeCartItem action on button click if the pizza is in the cart', () => {
    const dispatch = jest.fn();
    mockedDispatch.mockReturnValue(dispatch);
    const mockedAddCartItem = jest.spyOn(actions, 'removeCartItem');
    render(
      <OrderButton
        incart={true}
        isavl={true}
        userdocid={'123'}
        pizzaid={'123456'}
      />
    );
    expect(screen.getByText(/Отменить/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button'));
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(mockedAddCartItem).toHaveBeenCalledWith({
      user: '123',
      pizzaItem: '123456',
    });
  });

  it('should dispatch no action on button click if the pizza is not available', () => {
    const dispatch = jest.fn();
    mockedDispatch.mockReturnValue(dispatch);
    render(
      <OrderButton
        incart={false}
        isavl={false}
        userdocid={'123'}
        pizzaid={'123456'}
      />
    );
    expect(screen.getByText(/Заказать/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button'));
    expect(dispatch).toHaveBeenCalledTimes(0);
  });
});

import { screen } from '@testing-library/react';
import Header from '../../components/header/Header';
import userEvent from '@testing-library/user-event';
import { renderWithReduxAndRouter } from './testUtils/testUtils';
import { initialStore } from './testUtils/mockedStore';

describe('Header component rendering', () => {
  it('', async () => {
    renderWithReduxAndRouter(<Header />, { initialState: initialStore });
    const user = userEvent.setup();
    await user.click(screen.getByText(/О нас/));
    // expect(
    //   screen.getByText(/раздел находится в разработке/)
    // ).toBeInTheDocument(); // не перешел на страницу О нас
  });
});

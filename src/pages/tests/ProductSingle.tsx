import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useParams } from 'react-router-dom';
import ProductSingle from '../../components/cards/product-single/ProductSingle';
import userEvent from '@testing-library/user-event';

describe('ProductSingle component rendering', () => {
  it('', async () => {
    render(
      <MemoryRouter>
        <ProductSingle
          backUrl={'/'}
          image={''}
          ingredients={['пармезан', 'моцарелла', 'камамбер']}
          name={'Маргарита'}
          price={100}
        />
      </MemoryRouter>
    );

    const user = userEvent.setup();
    expect(screen.getByText(/Маргарита/)).toBeInTheDocument();
    expect(
      screen.getByText(/Состав: пармезан, моцарелла, камамбер/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Цена: 100р./)).toBeInTheDocument();

    await user.click(screen.getByRole('link'));
    // expect(screen.getByText(/Заказать пиццу/)).toBeInTheDocument(); // не перешел на главную страницу
  });
});

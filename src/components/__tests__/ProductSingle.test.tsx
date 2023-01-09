import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import ProductSingle from '../cards/product-single/ProductSingle';

describe('ProductSingle component rendering', () => {
  it('Renders ProductSingle component', async () => {
    const productSingleComponent = render(
      <BrowserRouter>
        <ProductSingle
          backUrl={'/'}
          image={''}
          ingredients={['пармезан', 'моцарелла', 'камамбер']}
          name={'Маргарита'}
          price={100}
        />
      </BrowserRouter>
    );

    const user = userEvent.setup();
    expect(screen.getByText(/Маргарита/)).toBeInTheDocument();
    expect(
      screen.getByText(/Состав: пармезан, моцарелла, камамбер/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Цена: 100р./)).toBeInTheDocument();
    expect(productSingleComponent).toMatchSnapshot();
  });
});

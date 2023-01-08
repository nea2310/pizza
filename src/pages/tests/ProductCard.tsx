import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../../components/cards/product-card/ProductCard';
import { renderWithReduxAndRouter } from './testUtils/testUtils';
import { initialStore } from './testUtils/mockedStore';

describe('ProductCard component rendering', () => {
  it('should render Order button and Favorites button if user is signed in', () => {
    renderWithReduxAndRouter(
      <ProductCard
        image={'http//'}
        isavl={true}
        name={'Четыре сыра'}
        pizzaid={'123'}
        price={100}
        incart={false}
        userdocid={'123456'}
        infav={false}
      />,
      { initialState: initialStore }
    );
    expect(screen.getByText(/Четыре сыра/)).toBeInTheDocument();
    expect(screen.getByText(/Цена: 100р./)).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(1);
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('should render Sign in link and no Favorites button if user is not signed in', () => {
    renderWithReduxAndRouter(
      <ProductCard
        image={'http//'}
        isavl={true}
        name={'Четыре сыра'}
        pizzaid={'123'}
        price={100}
        incart={false}
        userdocid={null}
        infav={false}
      />,
      { initialState: initialStore }
    );
    expect(screen.getByText(/Четыре сыра/)).toBeInTheDocument();
    expect(screen.getByText(/Цена: 100р./)).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(2);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});

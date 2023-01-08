import { screen } from '@testing-library/react';
import Favorites from '../favorites/Favorites';
import { renderWithReduxAndRouter } from './testUtils/testUtils';
import { initialStore } from './testUtils/mockedStore';
import App from '../../App';
import {fetchPizzaItems} from '../../store/slices/pizzaItemsSlice' 

import * as reduxHooks from 'react-redux';
import { AsyncThunkAction } from '@reduxjs/toolkit';

const mockedDispatch = jest.spyOn(reduxHooks, 'useDispatch');


describe('Favorites page rendering', () => {
  it('should render Favorites page', () => {
    // const component = renderWithReduxAndRouter(<Favorites />, {
    //   initialState: initialStore,
    // });

    const dispatch = jest.fn();
    mockedDispatch.mockReturnValue(dispatch);

    const mockedFetchPizzaItems = jest.spyOn({
      fetchPizzaItems
    },'fetchPizzaItems');

    // mockedFetchPizzaItems.mockImplementationOnce();

    renderWithReduxAndRouter(<App />, {
      initialState: initialStore,
    });


    screen.debug();

    //expect(screen.getByText('Заказать пиццу')).toBeInTheDocument();
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../App';
import {
 renderWithReduxAndRouter,
  renderWithProviders
} from './testUtils/testUtils';
import { initialStore, mockedStore } from './testUtils/mockedStore';
import userEvent from '@testing-library/user-event';
import * as reduxHooks from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from "redux-mock-store";

jest.mock('react-redux');
const mockedDispatch = jest.spyOn(reduxHooks, 'useDispatch');
const dispatch = jest.fn();
mockedDispatch.mockReturnValue(dispatch);

describe('Application component rendering', () => {
  it('657676576', () => {

    // const mockStore = configureStore([]);

    // const store = mockStore({});

    renderWithReduxAndRouter(<main />, {
      initialState: initialStore,
    });




  //  render(
  //     <Provider store={store}>
  //       {/* <BrowserRouter> */}
  //               <App />
  //       {/* </BrowserRouter> */}
  //     </Provider>
  //   );


    

    screen.debug();

    // render(
    //   <BrowserRouter>
    //     <App />
    //   </BrowserRouter>
    // );

   
    // const link = screen.getByText('О нас');
    // expect(link).toBeInTheDocument();
    // const user = userEvent.setup();
    // await user.click(link);
    // expect(
    //   screen.getByText('О нас (раздел находится в разработке)')
    // ).toBeInTheDocument();
  });
});

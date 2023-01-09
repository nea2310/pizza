
import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import { pizzaItemsAPI } from '../API/pizzaItemsAPI';
import {
  IPizzaItemsState,
  IFetchPizzaItemsReturn,
  IFilterPizzaItemsArgs,
  IFilterPizzaItemsReturn,
} from './../../interface';
import capitalize from '../../shared/helpers/capitalize';

const initialState: IPizzaItemsState = {
  data: {
    pizzaItemsAll: [],
    pizzaItemsFiltered: [],
    ingredientsSelected: [],
    ingredientsAll: [],
    currentQuery: '',
    spicySelected: '',
    lentSelected: '',
  },
  status: null,
  error: null
};

const NAMESPACE = 'pizzaItems';

export const fetchPizzaItems = createAsyncThunk<IFetchPizzaItemsReturn, undefined, { rejectValue: string }>(
  `${NAMESPACE}/fetch${capitalize(NAMESPACE)}`,
    (_, rejectValue) => pizzaItemsAPI.fetchPizzaItems(rejectValue)
)

export const filterPizzaItems = createAsyncThunk<IFilterPizzaItemsReturn, IFilterPizzaItemsArgs, { rejectValue: string }>(
  `${NAMESPACE}/filter${capitalize(NAMESPACE)}`,
  (filterData, {rejectWithValue}) => pizzaItemsAPI.filterPizzaItems(filterData, rejectWithValue),
)

function isRejected(action: AnyAction) {
  if (action.type.match(NAMESPACE)) return action.type.endsWith('rejected');
}

function isPending(action: AnyAction) {
  if (action.type.match(NAMESPACE)) return action.type.endsWith('pending');
}


const pizzaItemsSlice = createSlice({
  name: NAMESPACE,
  initialState,

  extraReducers:
    builder => {
      builder
        .addCase(fetchPizzaItems.fulfilled, (state, action) => {
          const {
            pizzaItemsAll,
            ingredientsAll
          } = action.payload;

          const { data } = state;

          state.status = 'resolved';
          data.pizzaItemsAll = pizzaItemsAll;
          data.pizzaItemsFiltered = pizzaItemsAll;
          data.ingredientsAll = ingredientsAll;
        })

        .addCase(filterPizzaItems.fulfilled, (state, action) => {
          const {
            ingredientsSelected,
            pizzaItemsFiltered,
          } = action.payload;

          const { data } = state;

          state.status = 'resolved';
          data.ingredientsSelected = ingredientsSelected;
          data.pizzaItemsFiltered = pizzaItemsFiltered;
        })

        .addCase(fetchPizzaItems.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(filterPizzaItems.pending, (state) => {
          state.status = 'pending';
          state.error = null;
        })

        .addMatcher(isRejected, (state, action: PayloadAction<string>) => {
            state.status = 'rejected';
            state.error = action.payload;
        })
        // .addMatcher(isPending, (state, action: PayloadAction<string>) => {
        //     state.status = 'loading';
        //     state.error = null;
        // })
    },

  reducers: {},
});

export default pizzaItemsSlice.reducer;
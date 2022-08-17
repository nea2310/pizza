let initialState: { productItems: any, productsMap: any } = {
  productItems: [],
  productsMap: []
};

const reducer = function (state: any = initialState, action: any) {
  switch (action.type) {
    case 'PRODUCTS_FETCH_DATA_SUCCESS': {
      let newState = [...state];
      let productItems = action.productItems;
      let productsMap: { [id: string]: number } = {};
      productItems.forEach((pr: any, i: number) => {
        productsMap[pr.id.toString()] = i;
      });

      return { ...newState, productItems, productsMap };
    }

    case 'PRODUCTS_FETCH_DATA_SUCCESS_FS': {
      return state;
    }
    default:
      return state;
  }

};

export default reducer;


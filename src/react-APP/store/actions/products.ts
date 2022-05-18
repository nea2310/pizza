
import makeRequest from '../../api/helpers/makeRequest';
import { collection, addDoc, getDocs } from "firebase/firestore";
import db from './../../firebase';

export function productsFetchDataSuccess(productItems: any) {
  return {
    type: 'PRODUCTS_FETCH_DATA_SUCCESS',
    productItems
  };
}

export function productsFetchDataSuccessFS(products: any) {
  let productItems: any = [];

  products.forEach((doc: any) => {
    let a = { ...doc.data(), id: doc.id };
    productItems.push(a);
  });

  return {
    type: 'PRODUCTS_FETCH_DATA_SUCCESS_FS',
    productItems
  };
}

export function productsFetchData() {
  /*dispatch нужен для того, чтобы потом вызвать 
  функцию productsFetchDataSuccess*/
  return (dispatch: any) => {
    return makeRequest(`products/all.php`)
      .then(products => {
        dispatch(productsFetchDataSuccess(products));
      }
      );
  };
}


export function productsFetchDataFS() {



  return (dispatch: any) => {
    return getDocs(collection(db, "products"))
      .then(products => dispatch(productsFetchDataSuccessFS(products)))
      .catch(console.error);
  };
}



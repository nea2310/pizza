
export function orderChangeField(name: any, value: any) {
  return {
    type: 'ORDER_CHANGE',
    name,
    value
  };
}

export function cartItemsDetailed(items: any) {
  return {
    type: 'ORDER_SET_DETAILED',
    items,
  };
}

export function orderSetLastOrderCache() {
  return {
    type: 'ORDER_SET_CACHE',
  };
}

// export function cartChangeItem(id: number, cnt: any) {
//   return (dispatch: any) => {
//     // eslint-disable-next-line max-len
//     return makeRequest(`cart/change.php?token=${getToken()}&id=${id}&cnt=${cnt}`)
//       .then(response => {
//         if (response)//если получили true, т.е. кол-ва товара изменено
//         {
//           dispatch(cartChangeItemSuccess(id, cnt));
//         }// вызвать cartChangeItemSuccess для вызова редьюсера по кейсу CART_CHANGE_CNT
//       }
//       );
//   };
// }




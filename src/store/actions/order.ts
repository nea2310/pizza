
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




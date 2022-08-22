import { IPizzaDetailsPartial } from '../../interface'

export function orderSetUser(name: string, email: string) {
  return {
    type: 'ORDER_SET_USER',
    name,
    email
  };
}


export function orderChangeField(name: string, value: string) {
  return {
    type: 'ORDER_CHANGE',
    name,
    value
  };
}

export function orderItemsDetailed(items: Array<IPizzaDetailsPartial>) {
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




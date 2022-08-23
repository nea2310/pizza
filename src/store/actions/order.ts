import {
  IPizzaDetailsPartial,
  IOrderUserSet,
  IOrderChange,
  IOrderSetDetailed,
  IOrderSetLastOrderCache
} from '../../interface'


/*нужно типизировать возвращаемое значение для правильной работы типа TDispatchUnion*/
export function orderSetUser(name: string, email: string): IOrderUserSet {
  return {
    type: 'ORDER_SET_USER',
    name,
    email
  };
}


export function orderChangeField(name: string, value: string): IOrderChange {
  return {
    type: 'ORDER_CHANGE',
    name,
    value
  };
}

export function orderItemsDetailed(items: Array<IPizzaDetailsPartial>): IOrderSetDetailed {
  return {
    type: 'ORDER_SET_DETAILED',
    items,
  };
}

export function orderSetLastOrderCache(): IOrderSetLastOrderCache {
  return {
    type: 'ORDER_SET_CACHE',
  };
}




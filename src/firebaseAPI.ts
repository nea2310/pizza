import { collection, getDocs } from "firebase/firestore";
import db from './firebase';
import { IPizzaItem } from './interface';


export const FirebaseAPI = {
  fetchPizzaItems:  async (rejectWithValue: Function | undefined) => {
    const pizzaItems = await getDocs(collection(db, "pizza"));
    if (pizzaItems.metadata.fromCache && rejectWithValue) {
      return rejectWithValue('Server error')
    }

    const pizzaItemsAll: Array<IPizzaItem> = [];
    pizzaItems.forEach((doc) => {
      let a = { ...doc.data(), id: doc.id } as IPizzaItem;
      pizzaItemsAll.push(a);
    });

    //список всех ингредиентов (с дублями)
    const ingredientsRaw: Array<string> = [];
    pizzaItemsAll.forEach((item: IPizzaItem) =>
      item.ingredients.forEach((item: string) => ingredientsRaw.push(item))
    );
    //список всех ингредиентов (убираем дубли)
    const ingredientsAll =
      ingredientsRaw.filter((item: string, pos: number) =>
        ingredientsRaw.indexOf(item) === pos
      );
    return { pizzaItemsAll, pizzaItemsFiltered: pizzaItemsAll, ingredientsAll }
  }

}

export default FirebaseAPI;

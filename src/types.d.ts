export interface IDishForm {
    title: string;
    price: number;
    image: string;
}

export interface IDish extends IDishForm {
    id: string;
}

export interface IDishApi {
    [key: string]: IDishForm;
}

export interface IUpdateDish {
    id: string;
    dish: IDishForm;
}

export interface ICartDish extends IDish {
    count: number;
}

export interface IOrder {
   id: string;
   dishes: {
       [dishId: string]: number;
   }
}


export interface IOrderAPI {
  [orderId: string]: {
    dishes: {
      [dishId: string]: number;
    };
  };
}

export interface IUpdateOrder {
    title: string;
    price: number;
    count: number;
    total: number;
}

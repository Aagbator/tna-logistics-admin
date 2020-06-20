/**
 * Created by Anthony on 13/10/2018.
 */

export class Dashboard {
  top10Products:      Top10Product[];
  orderStatistics:    OrderStatistic[];
  totalProductCount:  number;
  totalCustomerCount: number;
  constructor(obj) {
    this.top10Products = obj.top10Products;
    this.orderStatistics = obj.orderStatistics;
    this.totalProductCount = obj.totalProductCount;
    this.totalCustomerCount = obj.totalCustomerCount;
  }
}

export interface OrderStatistic {
  deliveryStatus: string;
  count:          number;
}

export interface Top10Product {
  id:     number;
  name:   string;
  price:  number;
  qty:    number;
  amount: number;
}


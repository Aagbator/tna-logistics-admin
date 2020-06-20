import {Product} from '../product/product.model';
import {Customer, Lga} from '../user/customer.model';
import {Coupon} from '../coupon/coupon.model';

export class Order {
  constructor(obj: any) {
    this._id = obj.id;
    this._paymentMethod = obj.paymentMethod;
    this._deliveryFirstName = obj.deliveryFirstName;
    this._deliveryLastName = obj.deliveryLastName;
    this._deliveryMobileNo = obj.deliveryMobileNo;
    this._deliveryStreet = obj.deliveryStreet;
    this._deliveryLga = obj.deliveryLga;
    this._deliveryInstruction = obj.deliveryInstruction;
    this._deliveryStatus = obj.deliveryStatus;
    this._user = obj.user;
    this._hasCoupon = obj.hasCoupon;
    this._coupon = obj.coupon;
    this._totalAmount = obj.totalAmount;
    this._actualAmount = obj.actualAmount;
    this._discountAmount = obj.discountAmount;
    this._status = obj.status;
    this._productOrderItems = obj.productOrderItems;
    this._transactionRef = obj.transactionRef;
    this._createdDate = obj.createdDate;
    this._updatedDate = obj.updatedDate;
  }
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get paymentMethod(): string {
    return this._paymentMethod;
  }

  set paymentMethod(value: string) {
    this._paymentMethod = value;
  }

  get deliveryFirstName(): string {
    return this._deliveryFirstName;
  }

  set deliveryFirstName(value: string) {
    this._deliveryFirstName = value;
  }

  get deliveryLastName(): string {
    return this._deliveryLastName;
  }

  set deliveryLastName(value: string) {
    this._deliveryLastName = value;
  }

  get deliveryMobileNo(): string {
    return this._deliveryMobileNo;
  }

  set deliveryMobileNo(value: string) {
    this._deliveryMobileNo = value;
  }

  get deliveryStreet(): string {
    return this._deliveryStreet;
  }

  set deliveryStreet(value: string) {
    this._deliveryStreet = value;
  }

  get deliveryLga(): Lga {
    return this._deliveryLga;
  }

  set deliveryLga(value: Lga) {
    this._deliveryLga = value;
  }

  get deliveryInstruction(): string {
    return this._deliveryInstruction;
  }

  set deliveryInstruction(value: string) {
    this._deliveryInstruction = value;
  }

  get deliveryStatus(): string {
    return this._deliveryStatus;
  }

  set deliveryStatus(value: string) {
    this._deliveryStatus = value;
  }

  get user(): Customer {
    return this._user;
  }

  set user(value: Customer) {
    this._user = value;
  }

  get hasCoupon(): number {
    return this._hasCoupon;
  }

  set hasCoupon(value: number) {
    this._hasCoupon = value;
  }

  get coupon(): Coupon {
    return this._coupon;
  }

  set coupon(value: Coupon) {
    this._coupon = value;
  }

  get totalAmount(): number {
    return this._totalAmount;
  }

  set totalAmount(value: number) {
    this._totalAmount = value;
  }

  get actualAmount(): number {
    return this._actualAmount;
  }

  set actualAmount(value: number) {
    this._actualAmount = value;
  }

  get discountAmount(): number {
    return this._discountAmount;
  }

  set discountAmount(value: number) {
    this._discountAmount = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }

  get productOrderItems(): ProductOrderItem[] {
    return this._productOrderItems;
  }

  set productOrderItems(value: ProductOrderItem[]) {
    this._productOrderItems = value;
  }

  get transactionRef(): string {
    return this._transactionRef;
  }

  set transactionRef(value: string) {
    this._transactionRef = value;
  }

  get createdDate(): string {
    return this._createdDate;
  }

  set createdDate(value: string) {
    this._createdDate = value;
  }

  get updatedDate(): string {
    return this._updatedDate;
  }

  set updatedDate(value: string) {
    this._updatedDate = value;
  }
  private _id:                  number;
  private _paymentMethod:       string;
  private _deliveryFirstName:   string;
  private _deliveryLastName:    string;
  private _deliveryMobileNo:    string;
  private _deliveryStreet:      string;
  private _deliveryLga:         Lga;
  private _deliveryInstruction: string;
  private _user:                Customer;
  private _hasCoupon:           number;
  private _coupon:              Coupon;
  private _totalAmount:         number;
  private _actualAmount:        number;
  private _discountAmount:      number;
  private _status:              string;
  private _deliveryStatus:      string;
  private _productOrderItems:   ProductOrderItem[];
  private _transactionRef:      string;
  private _createdDate:         string;
  private _updatedDate:         string;
}

export class ProductOrderItem {
  set product(value: Product) {
    this._product = value;
  }
  get product(): Product {
    return this._product;
  }
  id:          number;
  private _product:     Product;
  qty:         number;
  createdDate: string;
  updatedDate: string;
}

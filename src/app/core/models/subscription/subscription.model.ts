import {Constants} from '../../../config';

export class Subscription {
  constructor(obj: any) {
    this._id = obj.id;
    this._productName = obj.productName;
    this._productId = obj.productId;
    this._lastName = obj.lastName;
    this._firstName = obj.firstName;
    this._email = obj.email;
    this._userId = obj.userId;
    this._mobileNo = obj.mobileNo;
    this._amount = obj.amount;
    this._units = obj.units;
    this._payoutCount = obj.payoutCount;
    this._payoutInterval = obj.payoutInterval;
    this._totalPayoutCount = obj.totalPayoutCount;
    this._profit = obj.profit;
    this._isMultiplePayoutProduct = obj.isMultiplePayoutProduct ? obj.isMultiplePayoutProduct : 0;
    this._investmentMaturityDate = obj.investmentMaturityDate;
    this._createdDate = obj.createdDate;
    this._updatedDate = obj.updatedDate;
    this._status = obj.status;
  }
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get productName(): string {
    return this._productName;
  }

  set productName(value: string) {
    this._productName = value;
  }

  get isMultiplePayoutProduct(): number {
    return this._isMultiplePayoutProduct;
  }

  set isMultiplePayoutProduct(value: number) {
    this._isMultiplePayoutProduct = value;
  }

  get productId(): number {
    return this._productId;
  }

  set productId(value: number) {
    this._productId = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get mobileNo(): string {
    return this._mobileNo;
  }

  set mobileNo(value: string) {
    this._mobileNo = value;
  }

  get amount(): number {
    return this._amount;
  }

  set amount(value: number) {
    this._amount = value;
  }


  get userId(): number {
    return this._userId;
  }

  set userId(value: number) {
    this._userId = value;
  }

  get units(): number {
    return this._units;
  }

  set units(value: number) {
    this._units = value;
  }

  get profit(): number {
    return this._profit;
  }

  set profit(value: number) {
    this._profit = value;
  }

  get payoutCount(): number {
    return this._payoutCount;
  }

  set payoutCount(value: number) {
    this._payoutCount = value;
  }

  get payoutInterval(): number {
    return this._payoutInterval;
  }

  set payoutInterval(value: number) {
    this._payoutInterval = value;
  }

  get totalPayoutCount(): number {
    return this._totalPayoutCount;
  }

  set totalPayoutCount(value: number) {
    this._totalPayoutCount = value;
  }

  get investmentMaturityDate(): Date {
    return this._investmentMaturityDate;
  }

  set investmentMaturityDate(value: Date) {
    this._investmentMaturityDate = value;
  }

  get createdDate(): Date {
    return this._createdDate;
  }

  set createdDate(value: Date) {
    this._createdDate = value;
  }

  get updatedDate(): null {
    return this._updatedDate;
  }

  set updatedDate(value: null) {
    this._updatedDate = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }

  private _id:                     number;
  private _productName:            string;
  private _productId:              number;
  private _lastName:               string;
  private _firstName:              string;
  private _email:                  string;
  private _userId:                 number;
  private _payoutCount:            number;
  private _mobileNo:               string;
  private _amount:                 number;
  private _units:                  number;
  private _profit:                 number;
  private _payoutInterval:         number;
  private _totalPayoutCount:       number;
  private _isMultiplePayoutProduct: number;
  private _investmentMaturityDate: Date;
  private _createdDate:            Date;
  private _updatedDate:            null;
  private _status:                 string;
}


// isMultiplePayoutProduct: 1
// lastName: "Joseph"
// mobileNo: "09090012938"
// paidOut: false
// paidOutDate: null
// payOutAccountName: "Anthony Agbator"
// payOutAccountNo: "1023341133"
// payOutBankName: "STANDARD CHARTERED BANK NIGERIA LIMITED"
// payoutCount: 0
// payoutInterval: 3
// productId: 8
// productName: "quater broiler project"
// profit: 8000
// status: "SUCCESSFUL"
// totalPayoutCount: 3


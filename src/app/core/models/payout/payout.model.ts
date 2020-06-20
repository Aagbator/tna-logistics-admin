export class Payout {
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

  get productId(): number {
    return this._productId;
  }

  set productId(value: number) {
    this._productId = value;
  }

  get userId(): number {
    return this._userId;
  }

  set userId(value: number) {
    this._userId = value;
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

  get investmentMaturityDate(): Date {
    return this._investmentMaturityDate;
  }

  set investmentMaturityDate(value: Date) {
    this._investmentMaturityDate = value;
  }

  get paidOut(): boolean {
    return this._paidOut;
  }

  set paidOut(value: boolean) {
    this._paidOut = value;
  }

  get payOutAccountName(): string {
    return this._payOutAccountName;
  }

  set payOutAccountName(value: string) {
    this._payOutAccountName = value;
  }

  get payOutBankName(): string {
    return this._payOutBankName;
  }

  set payOutBankName(value: string) {
    this._payOutBankName = value;
  }

  get payOutAccountNo(): string {
    return this._payOutAccountNo;
  }

  set payOutAccountNo(value: string) {
    this._payOutAccountNo = value;
  }

  get paidOutDate(): null {
    return this._paidOutDate;
  }

  set paidOutDate(value: null) {
    this._paidOutDate = value;
  }

  get createdDate(): Date {
    return this._createdDate;
  }

  set createdDate(value: Date) {
    this._createdDate = value;
  }

  get updatedDate(): Date {
    return this._updatedDate;
  }

  set updatedDate(value: Date) {
    this._updatedDate = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }
  constructor(obj: any) {
    this._id = obj.id;
    this._productName = obj.productName;
    this._productId = obj.productId;
    this._userId = obj.userId;
    this._lastName = obj.lastName;
    this._firstName = obj.firstName;
    this._email = obj.email;
    this._mobileNo = obj.mobileNo;
    this._amount = obj.amount;
    this._units = obj.units;
    this._profit = obj.profit;
    this._investmentMaturityDate = obj.investmentMaturityDate;
    this._paidOut = obj.paidOut;
    this._payOutAccountName = obj.payOutAccountName;
    this._payOutBankName = obj.payOutBankName;
    this._payOutAccountNo = obj.payOutAccountNo;
    this._paidOutDate = obj.paidOutDate;
    this._createdDate = obj.createdDate;
    this._updatedDate = obj.updatedDate;
    this._status = obj.status;
  }

  private _id:                     number;
  private _productName:            string;
  private _productId:              number;
  private _userId:                 number;
  private _lastName:               string;
  private _firstName:              string;
  private _email:                  string;
  private _mobileNo:               string;
  private _amount:                 number;
  private _units:                  number;
  private _profit:                 number;
  private _investmentMaturityDate: Date;
  private _paidOut:                boolean;
  private _payOutAccountName:      string;
  private _payOutBankName:         string;
  private _payOutAccountNo:        string;
  private _paidOutDate:            null;
  private _createdDate:            Date;
  private _updatedDate:            Date;
  private _status:                 string;
}


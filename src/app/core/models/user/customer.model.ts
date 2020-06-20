export class Lga {
  id:          number;
  name:        string;
}

export interface Address {
  id:               number;
  firstName:        string;
  lastName:         string;
  address:          string;
  mobileNo:         string;
  isDefaultAddress: number;
  lga:              Lga[];
}

export class Customer {
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
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

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get isMale(): number {
    return this._isMale;
  }

  set isMale(value: number) {
    this._isMale = value;
  }

  get userType(): string {
    return this._userType;
  }

  set userType(value: string) {
    this._userType = value;
  }

  get customerAddresses(): Address[] {
    return this._customerAddresses;
  }

  set customerAddresses(value: Address[]) {
    this._customerAddresses = value;
  }

  get gender(): string {
    return this._isMale ? 'Male' : 'Female';
  }

  get createdBy(): null {
    return this._createdBy;
  }

  set createdBy(value: null) {
    this._createdBy = value;
  }

  get active(): boolean {
    return this._active;
  }

  set active(value: boolean) {
    this._active = value;
  }

  get deleted(): number {
    return this._deleted;
  }

  set deleted(value: number) {
    this._deleted = value;
  }

  get lastLogin(): number {
    return this._lastLogin;
  }

  set lastLogin(value: number) {
    this._lastLogin = value;
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

  constructor(obj: any) {
    this._id = obj.id;
    this._email = obj.email;
    this._mobileNo = obj.mobileNo;
    this._firstName = obj.firstName;
    this._lastName = obj.lastName;
    this._isMale = obj.isMale;
    this._userType = obj.userType;
    this._customerAddresses = obj.customerAddresses;
    this._createdBy = obj.createdBy;
    this._active = obj.active;
    this._deleted = obj.deleted;
    this._lastLogin = obj.lastLogin;
    this._createdDate = obj.createdDate;
    this._updatedDate = obj.updatedDate;
  }

  private _id?:                 number;
  private _email?:              string;
  private _mobileNo?:           string;
  private _firstName?:          string;
  private _lastName?:           string;
  private _isMale?:             number;
  private _userType?:           string;
  private _customerAddresses?:  Address[];
  private _createdBy?:          null;
  private _active?:             boolean;
  private _deleted?:            number;
  private _lastLogin?:          number;
  private _createdDate?:        string;
  private _updatedDate?:        string;
}

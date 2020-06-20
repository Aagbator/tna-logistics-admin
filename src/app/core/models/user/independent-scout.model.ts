/**
 * Created by Anthony on 13/10/2018.
 */

export class IndependentScout {
  private _id:          number;
  private _email:       string;
  private _mobileNo:    string;
  private _firstName:   string;
  private _lastName:    string;
  private _createdBy:   number;
  private _lastLogin:   null;
  private _createdDate: string;
  private _updatedDate: null;
  private _active:      boolean;
  private _deleted:     boolean;

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

  get createdBy(): number {
    return this._createdBy;
  }

  constructor(obj: any) {
    this._id = obj.id;
    this._email = obj.email;
    this._mobileNo = obj.mobileNo;
    this._firstName = obj.firstName;
    this._lastName = obj.lastName;
    this._createdBy = obj.createdBy;
    this._lastLogin = obj.lastLogin;
    this._createdDate = obj.createdDate;
    this._updatedDate = obj.updatedDate;
    this._active = obj.active;
    this._deleted = obj.deleted;
  }

  set createdBy(value: number) {
    this._createdBy = value;
  }

  get lastLogin(): any {
    return this._lastLogin;
  }

  set lastLogin(value: any) {
    this._lastLogin = value;
  }

  get createdDate(): string {
    return this._createdDate;
  }

  set createdDate(value: string) {
    this._createdDate = value;
  }

  get updatedDate(): any {
    return this._updatedDate;
  }

  set updatedDate(value: any) {
    this._updatedDate = value;
  }

  get active(): boolean {
    return this._active;
  }

  set active(value: boolean) {
    this._active = value;
  }

  get deleted(): boolean {
    return this._deleted;
  }

  set deleted(value: boolean) {
    this._deleted = value;
  }
}

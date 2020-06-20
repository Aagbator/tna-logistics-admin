/**
 * Created by Anthony on 13/10/2018.
 */
import {Constants} from '../../../config';

export class Coupon {
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get couponCode(): string {
    return this._couponCode;
  }

  set couponCode(value: string) {
    this._couponCode = value;
  }

  get discountPercentage(): number {
    return this._discountPercentage;
  }

  set discountPercentage(value: number) {
    this._discountPercentage = value;
  }

  get expireDate(): string {
    return this._expireDate;
  }

  set expireDate(value: string) {
    this._expireDate = value;
  }

  get hasExpired(): boolean {
    return this._hasExpired;
  }

  set hasExpired(value: boolean) {
    this._hasExpired = value;
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

  private _id: number;
  private _couponCode: string;
  private _discountPercentage: number;
  private _expireDate: string;
  private _hasExpired: boolean;
  private _createdDate: string;
  private _updatedDate: string;

  constructor(obj: any) {
    this._id = obj.id;
    this._couponCode = obj.couponCode;
    this._discountPercentage = obj.discountPercentage;
    this._expireDate = obj.expireDate;
    this._hasExpired = obj.hasExpired;
    this._createdDate = obj.createdDate;
    this._updatedDate = obj.updatedDate;
  }
}


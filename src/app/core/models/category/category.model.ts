/**
 * Created by Anthony on 13/10/2018.
 */
import {Constants} from '../../../config';

export class Category {
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get slug(): string {
    return this._slug;
  }

  set slug(value: string) {
    this._slug = value;
  }

  get code(): string {
    return this._code;
  }

  set code(value: string) {
    this._code = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get imageUrl(): string {
    return  this._imageUrl ? Constants.serviceUrl + this._imageUrl : null;
  }

  set imageUrl(value: string) {
    this._imageUrl = value;
  }

  get createdDate(): string {
    return this._createdDate;
  }

  set createdDate(value: string) {
    this._createdDate = value;
  }

  get status(): boolean {
    return this._status;
  }

  set status(value: boolean) {
    this._status = value;
  }
  private _id: number;
  private _name: string;
  private _slug: string;
  private _code: string;
  private _description: string;
  private _imageUrl: string;
  private _createdDate: string;
  private _status: boolean;

  constructor(obj: any) {
    this._id = obj.id;
    this._name = obj.name;
    this._slug = obj.slug;
    this._code = obj.code;
    this._description = obj.description;
    this._imageUrl = obj.imageUrl;
    this._status = obj.status;
    this._createdDate = obj.createdDate;
  }
}


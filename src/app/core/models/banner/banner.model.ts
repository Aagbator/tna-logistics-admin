/**
 * Created by Anthony on 13/10/2018.
 */
import {Constants} from '../../../config';

export class Banner {
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get orderIndex(): number {
    return this._orderIndex;
  }

  set orderIndex(value: number) {
    this._orderIndex = value;
  }

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
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

  get isActive(): boolean {
    return this._isActive;
  }

  set isActive(value: boolean) {
    this._isActive = value;
  }
  private _id: number;
  private _title: string;
  private _orderIndex: number;
  private _imageUrl: string;
  private _description: string;
  private _url: string;
  private _createdDate: string;
  private _isActive: boolean;

  constructor(obj: any) {
    this._id = obj.id;
    this._title = obj.title;
    this._orderIndex = obj.orderIndex;
    this._imageUrl = obj.imageUrl;
    this._description = obj.description;
    this._url = obj.url;
    this._isActive = obj.isActive;
    this._createdDate = obj.createdDate;
  }
}


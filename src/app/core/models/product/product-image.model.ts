import {Constants} from '../../../config';

/**
 * Created by Anthony on 13/10/2018.
 */

export class ProductImage {
  private _id: number;
  private _imageUrl: string;

  constructor(obj: any) {
    this._id = obj.id;
    this._imageUrl = obj.imageUrl;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get imageUrl(): string {
    return  this._imageUrl ? Constants.serviceUrl + this._imageUrl : null;
  }

  set imageUrl(value: string) {
    this._imageUrl = value;
  }
}

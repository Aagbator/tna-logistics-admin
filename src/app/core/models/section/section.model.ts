/**
 * Created by Anthony on 13/10/2018.
 */
import {Product} from '../product/product.model';

export class Section {
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

  get orderIndex(): number {
    return this._orderIndex;
  }

  set orderIndex(value: number) {
    this._orderIndex = value;
  }

  get products(): Product[] {
    return this._products;
  }

  set products(value: Product[]) {
    this._products = value;
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
  private _name: string;
  private _slug: string;
  private _orderIndex: number;
  private _products: Product[];
  private _createdDate: string;
  private _updatedDate: string;

  constructor(obj: any) {
    this._id = obj.id;
    this._name = obj.name;
    this._slug = obj.slug;
    this._orderIndex = obj.orderIndex;
    this._products = obj.products;
    this._createdDate = obj.createdDate;
    this._updatedDate = obj.updatedDate;
  }
}


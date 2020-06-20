/**
 * Created by Anthony on 13/10/2018.
 */

import {Permission} from '../permission.model';

export class Role {
  private  _id: number;
  private  _name: string;
  private _permissions: Permission[];
  private _createdDate: string;
  private _updatedDate: string;

  constructor(obj: any) {
    this._id = obj.id;
    this._name = obj.name;
    this._permissions = obj.permissions;
    this._createdDate = obj.createdDate;
    this._updatedDate = obj.updatedDate;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get permissions(): Permission[] {
    return this._permissions;
  }

  get createdDate(): string {
    return this._createdDate;
  }

  get updatedDate(): string {
    return this._updatedDate;
  }
}


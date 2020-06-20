/**
 * Created by Anthony on 13/10/2018.
 */

export class Code {
  private _id: number;
  private _name: string;
  private _code: string;
  private _createdDate: string;
  private _updatedDate: string;

  constructor(obj: any) {
    this._id = obj.id;
    this._name = obj.name;
    this._code = obj.code;
    this._createdDate = obj.createdDate;
    this._updatedDate = obj.updatedDate;
  }
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

  get code(): string {
    return this._code;
  }

  set code(value: string) {
    this._code = value;
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
}


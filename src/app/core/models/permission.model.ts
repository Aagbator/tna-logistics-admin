/**
 * Created by Anthony on 13/10/2018.
 */

export class Permission {
  private _id:          number;
  private _name:        string;
  private _code:        string;
  private _createdDate: string;
  private _updatedDate: null;

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

  get name(): string {
    return this._name;
  }

  get code(): string {
    return this._code;
  }

  get createdDate(): string {
    return this._createdDate;
  }

  get updatedDate(): any {
    return this._updatedDate;
  }
}

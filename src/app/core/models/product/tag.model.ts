/**
 * Created by Anthony on 13/10/2018.
 */

export class Tag {
  private _id: number;
  private _name: string;

  constructor(obj: any) {
    this._id = obj.id;
    this._name = obj.name;
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
}


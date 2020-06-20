/**
 * Created by Anthony on 13/10/2018.
 */

export class Specification {
  private _id: number;
  private _name: string;
  private _value: string;

  constructor(obj: any) {
    this._id = obj.id;
    this._name = obj.name;
    this._value = obj.value;
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

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
  }
}

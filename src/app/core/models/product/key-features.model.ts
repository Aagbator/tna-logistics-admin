/**
 * Created by Anthony on 13/10/2018.
 */

export class KeyFeature {
  private _id: number;
  private _value: string;

  constructor(obj: any) {
    this._id = obj.id;
    this._value = obj.value;
  }
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
  }
}

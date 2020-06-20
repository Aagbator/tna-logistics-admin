export class LGA {
  private _id: number;
  private _name: string;
  private _costOfDelivery: number;

  constructor(obj: any) {
    this._id = obj.id;
    this._name = obj.name;
    this._costOfDelivery = obj.costOfDelivery;
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

  get costOfDelivery(): number {
    return this._costOfDelivery;
  }

  set costOfDelivery(value: number) {
    this._costOfDelivery = value;
  }
}


export class Error {
  private _error:      Err;
  private _message:    string;
  private _name:       string;
  private _ok:         boolean;
  private _status:     number;
  private _statusText: string;

  constructor(obj : any) {
    this._error = obj.error;
    this._message = obj.message;
    this._name = obj.name;
    this._ok = obj.ok;
    this._status = obj.status;
    this._statusText = obj.statusText;
  }
  get error(): Err {
    return this._error;
  }

  get errorMessage(): string {
    return this._error.message;
  }

  get message(): string {
    return this._message;
  }

  get name(): string {
    return this._name;
  }

  get ok(): boolean {
    return this._ok;
  }

  get status(): number {
    return this._status;
  }

  get statusText(): string {
    return this._statusText;
  }
}

export interface Err {
  timestamp:    string;
  responseCode: string;
  error:        string;
  message:      string;
}


export class AccessToken {
  get data(): Data{
    return this._data;
  }

  get message(): string {
    return this._message;
  }

  get responseCode(): string {
    return this._responseCode;
  }

  get timestamp(): string {
    return this._timestamp;
  }
  constructor(obj: any) {
    this._data = obj.data;
    this._message = obj.message;
    this._responseCode = obj.responseCode;
    this._timestamp = obj.timestamp;
  }
  private _data:         Data;
  private _message:      string;
  private _responseCode: string;
  private _timestamp:    string;
}

export interface Data {
  email:        string;
  firstName:    string;
  lastName:     string;
  refreshToken: string;
  token:        string;
  accessToken: string;
}

export default class UserSystem {

  private _id: number;
  private _username: string;
  private _email: string;
  private _password: string;

  constructor() {
    this._id = -1;
    this._username = "";
    this._email = "";
    this._password = "";
  }

  get id(): number { 
    return this._id;
  }
  set id(id: number) { 
    this._id = id;
  }

  get username(): string { 
    return this._username;
  }
  set username(username: string) { 
    this._username = username;
  }

  get email(): string { 
    return this._email;
  }
  set email(email: string) { 
    this._email = email;
  }

  get password(): string { 
    return this._password;
  }
  set password(password: string) { 
    this._password = password;
  }
}
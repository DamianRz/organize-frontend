import User from "./UserSystem";
export default class UserList {

  private _users: User[];

  constructor() {
    this._users = [];
  }

  get(index: number) { 
    return this._users[index];
  }

  set(index: number, user: User) { 
    this._users[index] = user;
  }

  add(user: User) { 
    this._users.push(user);
  }

  length() { 
    return this._users.length;
  }
}
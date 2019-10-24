import Axios from 'axios';
// import Base from './Base';

let axios = Axios.create({
  baseURL: 'http://localhost:8092/api/users',
  headers: {'content-type': 'application/json'}
});

export default class User {
  private _id:       number;
  private _username: string;
  private _password: string;
  private _email:    string;
  // private _name:     string;

  constructor(obj: any = {}) {
      this._id       = obj._id       || null;
      this._username = obj._username || "";
      this._password = obj._password || "";
      this._email    = obj._email    || "";
      // this._name     = obj._name  || "";
  }

  get id():number      { return this._id;  }
  set id(value:number) { this._id = value; }
  
  get username():string         { return this._username;     }
  set username(username:string) { this._username = username; }
  
  get password():string         { return this._password;     }
  set password(password:string) { this._password = password; }
  
  get email():string      { return this._email;  }
  set email(email:string) { this._email = email; }

  // get name():string     { return this._name;     }
  // set name(name:string)         { this._name = name;         }

  async get() {
    let data: any = { "username": this.username, "password": this.password };
    try {
      let response: any = await axios.get('', { params: data });
      this.id = response.data.id;
      this.email = response.data.email;
    } catch (error) {
      throw error.response;
    }
  }
  
  async add() {
    try {
      let response:any = await axios.post('',this);
      this.id = response.data.id;
      return response;
    } catch (error) {
      throw error.response;
    }
  }

  async save() {
    try {
      let response = await axios.put('/' + this.id, this);
      return response;
    } catch (error) {
      throw error.response;
    }
  }
}

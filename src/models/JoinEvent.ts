export default class User {

  private _idEvent: number;
  private _idUser: number;
  private _idType: number;

  constructor(idEvent: number, idUser: number, idType: number) {
    this._idEvent = idEvent;
    this._idUser = idUser;
    this._idType = idType;
  }

  get idEvent(): number { 
    return this._idEvent;
  }
  set idEvent(idEvent: number) { 
    this._idEvent = idEvent;
  }

  get idUser(): number { 
    return this._idUser;
  }
  set idUser(idUser: number) { 
    this._idUser = idUser;
  }
  
  get idType(): number { 
    return this._idType;
  }
  set idType(idType: number) { 
    this._idType = idType;
  }
}
export default class Event {

  private _id: number;
  private _name: string;
  private _location: string;
  private _start: string;
  private _end: string;
  private _description: string;
  private _guestsNumber: number;
  private _created: string;
  private _state: number;

  constructor() {
    this._id = -1;
    this._name = "";
    this._location = "";
    this._start = "";
    this._end = "";
    this._description = "";
    this._guestsNumber = 0;
    this._created = "";
    this._state = 0;
  }

  get id(): number { 
    return this._id;
  }
  set id(id: number) { 
    this._id = id;
  }

  get name(): string { 
    return this._name;
  }
  set name(name: string) { 
      this._name = name;
  }
  
  get location(): string { 
    return this._location;
  }
  set location(location: string) { 
    this._location = location;
  }

  get start(): string { 
    return this._start;
  }
  set start(start: string) { 
    this._start = start;
  }

  get end(): string { 
    return this._end;
  }
  set end(end: string) { 
    this._end = end;
  }

  get description(): string { 
    return this._description;
  }
  set description(description: string) { 
    this._description = description;
  }
  
  get guestsNumber(): number { 
    return this._guestsNumber;
  }
  set guestsNumber(guestsNumber: number) { 
    this._guestsNumber = guestsNumber;
  }

  get created(): string { 
    return this._created;
  }
  set created(created: string) { 
    this._created = created;
  }

  get state(): number { 
    return this._state;
  }
  set state(state: number) { 
    this._state = state;
  }

  // getJsonStructure() { 
  //   return {
  //     ""
  //   }
  // }
}
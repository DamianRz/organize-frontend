import Event from "./Event";
export default class EventList {

  private _events: Event[];

  constructor() {
    this._events = [];
  }

  get(index: number) { 
    return this._events[index];
  }

  set(index: number, event: Event) { 
    this._events[index] = event;
  }

  add(event: Event) { 
    this._events.push(event);
  }

  length() { 
    return this._events.length;
  }
}
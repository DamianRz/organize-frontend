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
    Object.assign(this._events[index], event);
  }

  add(event: Event) { 
    this._events.push(event);
  }

  length() { 
    return this._events.length;
  }

  getArray() {
    return this._events;
  }

  getLast() {
    return this.get(this.length()-1);
  }

  indexOf(item: Event) {
    console.log(this._events.indexOf(item))
    return (this._events.indexOf(item)-1);
  }

  getIndexById(id: number) { 
    let pos = -1;
    for (let i = 0; i < this._events.length; i++) {
      if (this._events[i]['_id'] == id) {
        console.log(id, i)
        pos = i;
      }
    }
    return pos;
  }

  removeById(id: number) {
    this._events = this._events.filter(item => item['_id'] !== id);
  }

  remove(index: number) {
    this._events.splice(index, 1);
  }

}
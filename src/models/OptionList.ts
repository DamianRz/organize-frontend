import Option from "./Option";
export default class OptionList {

  private _options: Option[];

  constructor() {
    this._options = [];
  }

  get(index: number) {
    return this._options[index];
  }

  set(index: number, option: Option) {
    this._options[index] = option;
  }

  add(option: Option) {
    this._options.push(option);
  }

  length() {
    return this._options.length;
  }

  getArray() {
    return this._options;
  }

  getLast() {
    return this.get(this.length()-1);
  }

  setLast(o: Option) {
    Object.assign(this._options[this.length()-1], o);
  }
}
import Question from './Question';
export default class QuestionList {

  private _questions: Question[];

  constructor() {
    this._questions = [];
  }

  public get(index: number) {
    return this._questions[index];
  }

  public set(index: number, q: Question) {
    this._questions[index] = q;
  }

  public add(q: Question) {
    this._questions.push(q);
  }

  get length(): number {
    return this._questions.length;
  }

  getArray() {
    return this._questions;
  }

  getLast() {
    return this._questions[this._questions.length-1];
  }

  remove(index: number) {
    this._questions.splice(index, 1);
  }

  setLast(q: Question) {
    Object.assign(this._questions[this.length()-1], q);
  }
}

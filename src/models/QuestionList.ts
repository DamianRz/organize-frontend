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

  public length() {
    return this._questions.length;
  }

  getArray() {
    return this._questions;
  }

  getLast() {
    // return this.get(this.length()-1);
    return this._questions[this._questions.length-1];
  }
}

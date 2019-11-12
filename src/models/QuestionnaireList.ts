import Questionnaire from "./Questionnaire";
export default class QuestionnaireList {

  private _questionnaires: Questionnaire[];

  constructor() {
    this._questionnaires = [];
  }

  get(index: number) {
    return this._questionnaires[index];
  }

  set(index: number, q: Questionnaire) {
    this._questionnaires[index] = q;
  }

  add(q: Questionnaire) {
    this._questionnaires.push(q);
  }

  length() {
    return this._questionnaires.length;
  }

  getArray() {
    return this._questionnaires;
  }

  getLast() {
    return this.get(this.length() - 1);
  }
  setLast(q: Questionnaire) {
    Object.assign(this._questionnaires[this.length() - 1], q);
  }

  getIndexById(id: number) {
    let pos = -1;
    for (let i = 0; i < this._questionnaires.length; i++) {
      if (this._questionnaires[i]['_id'] == id) {
        pos = i;
      }
    }
    return pos;
  }

  remove(index: number) {
    this._questionnaires.splice(index, 1)
  }

}
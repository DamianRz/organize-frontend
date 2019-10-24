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
}
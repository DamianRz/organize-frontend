export default class TimeLimit {

  private _idQuestion: number;
  private _idEvent: number;
  private _maxTime: string;

  constructor() {
    this._idQuestion = -1;
    this._idEvent = -1;
    this._maxTime = '';
  }

  get idQuestion(): number {
    return this._idQuestion;
  }
  set idQuestion(idQuestion: number) {
    this._idQuestion = idQuestion;
  }

  get idEvent(): number {
    return this._idEvent;
  }
  set idEvent(idEvent: number) {
    this._idEvent = idEvent;
  }

  get maxTime(): string {
    return this._maxTime;
  }
  set maxTime(maxTime: string) {
    this._maxTime = name;
  }
}

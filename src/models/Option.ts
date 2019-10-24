export default class Option {

  private _id: number;
  private _idUser: number;
  private _idQuestion: number;
  private _name: string;
  private _cost: number;

  constructor() {
    this._id = -1;
    this._idUser = -1;
    this._idQuestion = -1;
    this._name = "";
    this._cost = 0;
  }

  get id(): number {
    return this._id;
  }
  set id(id: number) {
    this._id = id;
  }

  get idUser(): number {
    return this._idUser;
  }
  set idUser(idUser: number) {
    this._idUser = idUser;
  }

  get idQuestion(): number {
    return this._idQuestion;
  }
  set idQuestion(idQuestion: number) {
    this._idQuestion = idQuestion;
  }

  get name(): string {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }

  get cost(): number {
    return this._cost;
  }
  set cost(cost: number) {
    this._cost = cost;
  }

}
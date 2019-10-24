export default class Questionnaire {

  private _id: number;
  private _idUser: number;
  private _name: string;
  private _category: string;

  constructor() {
    this._id = -1;
    this._idUser = -1;
    this._name = "";
    this._category = "";
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

  get name(): string {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }

  get category(): string {
    return this._category;
  }
  set category(category: string) {
    this._category = category;
  }

}
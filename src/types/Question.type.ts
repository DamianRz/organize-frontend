import IOption from './Option.type';

export interface IQuestion {
  id: number,
  idType: number,
  name: string,
  category: string,
  options: IOption[]
}

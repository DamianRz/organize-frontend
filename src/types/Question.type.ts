import IOption from './Option.type';

export default interface Question {
  id: number,
  idType: number,
  name: string,
  category: string,
  options: IOption[]
}

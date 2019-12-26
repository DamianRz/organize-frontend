import IQuestion from '../types/Question.type';

export default interface Questionnaire {
  id: number,
  idUser: number,
  name: string,
  category: string,
  questions: IQuestion[]
}

import IEvent from '../types/Event.type';
import IUserStore from '../types/UserStore';
import IOption from '../types/Option.type';
import { IQuestion } from '../types/Question.type';
import IQuestionnaire from '../types/Questionnaire.type';

export const BASE_EVENT = {
  id: -1,
  name: '',
  location: '',
  startDate: '',
  startHour: '',
  endDate: '',
  endHour: '',
  description: '',
  guestsNumber: 0,
  created: '',
  state: true,
}

export const BASE_USERSTORE = {
  id: -1,
  username: '',
  token: ''
}

export const BASE_OPTION = {
  id: -1,
  idUser: -1,
  idQuestion: -1,
  name: '',
  cost: 0.0
}

export const BASE_QUESTION = {
  id: -1,
  idType: -1,
  name: '',
  category: '',
  options: []
}

export const BASE_QUESTIONNAIRE = {
  id: -1,
  idUser: -1,
  name: '',
  category: '',
  questions: []
}

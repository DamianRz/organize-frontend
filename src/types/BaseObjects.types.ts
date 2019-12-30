import IEvent from '../types/Event.type';
import IUserStore from '../types/UserStore';
import IOption from '../types/Option.type';
import { IQuestion } from '../types/Question.type';
import IQuestionnaire from '../types/Questionnaire.type';

export default class BaseObjects {

  public BASE_EVENT: IEvent = {
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

  public BASE_USERSTORE: IUserStore = {
    id: -1,
    username: '',
    token: ''
  }

  public BASE_OPTION: IOption = {
    id: -1,
    idUser: -1,
    idQuestion: -1,
    name: '',
    cost: 0.0
  }

  public BASE_QUESTION: IQuestion = {
    id: -1,
    idType: -1,
    name: '',
    category: '',
    options: []
  }

  public BASE_QUESTIONNAIRE: IQuestionnaire = {
    id: -1,
    idUser: -1,
    name: '',
    category: '',
    questions: []
  }
}


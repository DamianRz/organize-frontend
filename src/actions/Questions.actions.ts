import IUserStore from '../types/UserStore';
import IntegrationBackend from '../utils/IntegrationBackend';
import IQuestion from '../types/Question.type';
import { BASE_USERSTORE } from '../types/BaseObjects.types';

export default class QuestionActions {
  private backend: any = new IntegrationBackend();
  private userInfo: IUserStore = BASE_USERSTORE;

  constructor(userInfo: IUserStore) {
    this.userInfo = userInfo;
  }

  async getByQuestionnaire(idQuestionnaire: number) {
    let questions: IQuestion[] = []
    return questions;
  }
}
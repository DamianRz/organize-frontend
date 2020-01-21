import IntegrationBackend from '../utils/IntegrationBackend';
import IUserStore from '../types/UserStore';
import IQuestionnaire from '../types/Questionnaire.type';
import {IQuestion} from '../types/Question.type';
import IOption from '../types/Option.type';
import Questionnaire from '../models/Questionnaire';
import ResultObject from '@/models/ResultObject';
import { BASE_USERSTORE } from '../types/BaseObjects.types';

export default class QuestionnaireAction {
  private backend: any = new IntegrationBackend();
  private userInfo: IUserStore = BASE_USERSTORE;

  constructor(userInfo: IUserStore) {
    this.userInfo = userInfo;
  }

  async add(questionnaire: IQuestionnaire, questions: IQuestion[]) {
    let data: any = {
      token: this.userInfo.token,
      questionnaire: {
        id: -1,
        idUser: this.userInfo.id,
        name: questionnaire.name,
        category: questionnaire.category,
        questions: []
      }
    }
    questions.forEach((question: IQuestion) => {
      let qData: any = {
        idType: question.idType,
        name: question.name,
        category: question.category,
        options: []
      }
      question.options.forEach((option: IOption) => {
        let oData: any = {
          name: option.name,
          cost: option.cost
        }
        qData.options.push(oData);
      });
      data.questionnaire.questions.push(qData);
    });
    const responsePostQuestionnaire: any = await this.backend.send('post:questionnaireFull', data);
    console.log(responsePostQuestionnaire)
    if (responsePostQuestionnaire.statusCode == 200) {
      data.questionnaire.id = responsePostQuestionnaire.value.id;
      return Object.assign(new Questionnaire(), data.questionnaire);
    } else {
      return null;
    }
  }





  async addDeprecated(questionnaire: IQuestionnaire, questions: IQuestion[]) {
    let data: any = {
      token: this.userInfo.token,
      questionnaire: {
        id: -1,
        idUser: this.userInfo.id,
        name: questionnaire.name,
        category: questionnaire.category,
        questions: []
      }
    }
    questions.forEach((question: IQuestion) => {
      let qData: any = {
        idType: question.idType,
        name: question.name,
        category: question.category,
        options: []
      }
      question.options.forEach((option: IOption) => {
        let oData: any = {
          name: option.name,
          cost: option.cost
        }
        qData.options.push(oData);
      });
      data.questionnaire.questions.push(qData);
    });
    const responsePostQuestionnaire: any = await this.backend.send('post:questionnaireFull', data);
    if (responsePostQuestionnaire.statusCode == 200) {
      data.questionnaire.id = responsePostQuestionnaire.value.id;
      return Object.assign(new Questionnaire(), data.questionnaire);
    } else {
      return null;
    }
  }



  async getByUser() {
    let questionnaires: IQuestionnaire[] = [];
    let data = {
      token: this.userInfo.token,
      questionnaire: {
        idUser: this.userInfo.id,
      }
    }
    const response: ResultObject = await this.backend.send('get:questionnaireByIdUser', data);
    if (response.statusCode == 200) {
      (response.value._questionnaires || []).map((q: Questionnaire) => {
        let questionnaire: IQuestionnaire = {
          id: q['_id'],
          idUser: q['_idUser'],
          name: q['_name'],
          category: q['_category'],
          questions: []
        };
        questionnaires.push(questionnaire);
      });
      return questionnaires;
    } else {
      return null;
    }
  }

  async getByEvent(idEvent: number) {
    let questionnaires: IQuestionnaire[] = [];
    let data = {
      token: this.userInfo.token,
      questionnaire: {
        idEvent: idEvent,
      }
    }
    const response: { value: any, statusCode: number } = await this.backend.send('get:questionnaireByEventId', data);
    if (response.statusCode == 200) {
      (response.value._questionnaires || []).map((q: Questionnaire) => {
        let questionnaire: IQuestionnaire = {
          id: q['_id'],
          idUser: q['_idUser'],
          name: q['_name'],
          category: q['_category'],
          questions: []
        };
        questionnaires.push(questionnaire);
      });
      return questionnaires;
    } else {
      return null;
    }
  }

  async saveQuestionsOfQuestionnaire(idQuestionnaire: number, questions: IQuestion[]) {
  }

  async remove(questionnaire: IQuestionnaire) {
    return {statusCode: 200}
  }

  async save(questionnaire: IQuestionnaire) {
    return {statusCode:200}
  }
}

import IntegrationBackend from '../utils/IntegrationBackend';
import IUserStore from '../types/UserStore';
import IQuestionnaire from '../types/Questionnaire.type';
import IQuestion from '../types/Question.type';
import IOption from '../types/Option.type';
import Questionnaire from '../models/Questionnaire';
import ResultObject from '@/models/ResultObject';

// import QuestionnaireList from '@/models/QuestionnaireList';
// import QuestionList from '@/models/QuestionList';
// import Question from '../models/Question';
// import Option from '../models/Option';

export default class QuestionnaireAction {
  private backend: any = new IntegrationBackend();
  private userInfo: IUserStore = {
    id: -1,
    username: '',
    token: ''
  }

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
    // add questions into the array
    questions.forEach((question: IQuestion) => {
      let qData: any = {
        idType: question.idType,
        name: question.name,
        category: question.category,
        options: []
      }
      // add options into the array



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
    console.log('response', responsePostQuestionnaire)
    if (responsePostQuestionnaire.statusCode == 200) {
      data.questionnaire.id = responsePostQuestionnaire.value.id;
      return Object.assign(new Questionnaire(), data.questionnaire);
    } else {
      return null;
    }
  }



  // GET_BY_USER
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

  // GET_BY_EVENT
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
}
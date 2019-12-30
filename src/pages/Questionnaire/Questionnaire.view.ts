import { Vue } from 'vue-property-decorator';
import QuestionnaireActions from '@/actions/Questionnaire.actions';
import QuestionActions from '@/actions/Questions.actions';
import OptionActions from '@/actions/Options.actions';
import Validation from '@/utils/Validation';
import UserStore from '@/types/UserStore';
import IQuestionnaire from '../../types/Questionnaire.type';
import { IQuestion } from '../../types/Question.type';
import IOption from '../../types/Option.type';

export default class QuestionnaireView extends Vue {
  private BASE_QUESTIONNAIRE: IQuestionnaire = {
    id: -1,
    idUser: -1,
    name: '',
    category: '',
    questions: []
  }

  private BASE_QUESTION: IQuestion = {
    id: -1,
    idType: -1,
    name: '',
    category: '',
    options: []
  }

  private BASE_OPTION: IOption = {
    id: -1,
    idUser: -1,
    idQuestion: -1,
    name: '',
    cost: 0.0
  }

  private userInfo: UserStore = this.$store.getters.userInfo;

  private questionnaireActions: QuestionnaireActions = new QuestionnaireActions(this.userInfo);
  private optionActions: OptionActions = new OptionActions(this.userInfo);
  private questionActions: QuestionActions = new QuestionActions(this.userInfo);

  private questionnaires: IQuestionnaire[] = [];
  private questions: IQuestion[] = [];
  private options: IOption[] = [];

  private newQuestionnaire: IQuestionnaire = this.BASE_QUESTIONNAIRE;
  private newQuestion: IQuestion = this.BASE_QUESTION;
  private newOption: IOption = this.BASE_OPTION;

  private v: Validation = new Validation();
  private dialogs = {
    options: false,
    questionnaires: false,
    questions: false,
    questionnairesQuestionnaires: false,
    deleteQuestionnaire: false
  }
  private notification = {
    visible: false,
    message: '',
    color: 'green',
    selectedItem: {}
  }
  private search: { filter: string, value: string } = {
    filter: '',
    value: ''
  }
  private searchFilters: any = {
    'nombre': 'name',
    'fecha de inicio': 'startDate'
  }
  private interactionsMode = {
    questionnaires: 0,
    questions: 0,
    options: 0
  }
  private selectedItem = {
    questionnaire: -1,
    question: -1,
    option: -1
  }
  private questionnaireFields = {
    objectName: 'newQuestionnaire',
    fields: [
      ['name', 'string'],
      ['category', 'string'],
    ]
  }
  private questionFields = {
    objectName: 'newQuestion',
    fields: [
      ['name', 'string'],

      ['idType', 'string'],
      ['category', 'string'],
    ]
  }
  private optionFields = {
    objectName: 'newOption',
    fields: [
      ['name', 'string'],
      ['cost', 'string'],
    ]
  }

  async init() {
    this.questionnaires = (await this.questionnaireActions.getByUser() || this.questionnaires);
  }

  private async showNewQuestionnaire() {
    this.newQuestionnaire = {
      id: -1,
      idUser: -1,
      name: '',
      category: '',
      questions: []
    };
    this.interactionsMode.questionnaires = 0;
    this.questions = [];
    this.dialogs.questionnaires = true;
  }

  private async editQuestionnaire(selectedQuestionnaire: IQuestionnaire) {
    this.selectedItem.questionnaire = this.questionnaires.indexOf(selectedQuestionnaire);

    this.newQuestionnaire = {
      category: '',
      id: -1,
      idUser: -1,
      name: '',
      questions: []
    };
    Object.assign(this.newQuestionnaire, selectedQuestionnaire);
    this.interactionsMode.questionnaires = 1;
    this.dialogs.questionnaires = true;
  }

  private async editQuestion(selectedQuestion: IQuestion) {
    this.selectedItem.question = this.questions.indexOf(selectedQuestion);

    this.newQuestion = {
      id: -1,
      name: '',
      category: '',
      idType: -1,
      options: []
    };
    Object.assign(this.newQuestion, selectedQuestion);
    this.interactionsMode.questions = 1;
    this.dialogs.questions = true;
  }

  private async editOption(selectedOption: IOption) {
    this.selectedItem.option = this.options.indexOf(selectedOption);

    this.newOption = {
      cost: 0,
      id: -1,
      idQuestion: -1,
      idUser: -1,
      name: ''
    }
    Object.assign(this.newOption, selectedOption);
    this.interactionsMode.options = 1;
    this.dialogs.options = true;
  }

  private async saveQuestionnaire() {
    if (this.v.validateFields(this.newQuestionnaire, [this.questionnaireFields])) {
      let response = await this.questionnaireActions.save(this.newQuestionnaire);
      if (response.statusCode == 200) {
        Object.assign(this.questionnaires[this.selectedItem.questionnaire], this.newQuestionnaire);
        this.dialogs.questionnaires = false;
        this.showNotificationSuccess('Datos guardados con exito!');
      } else {
        this.showNotificationSuccess('Ocurrio un error interno, vuelva a intentarlo');
      }
    }
  }

  private async saveQuestion() {
    if (this.v.validateFields(this.newQuestion, [this.questionFields])) {
      Object.assign(this.questions[this.selectedItem.question], this.newQuestion);
        this.dialogs.questions = false;
        this.showNotificationSuccess('Datos guardados con exito!');
    }
  }

  private async saveOption() {
    if (this.v.validateFields(this.newOption, [this.optionFields])) {
      Object.assign(this.options[this.selectedItem.option], this.newOption);
      this.dialogs.options = false;
      this.showNotificationSuccess('Datos guardados con exito!');
    }
  }

  private async addQuestionnaire() {
    if (this.v.validateFields(this.newQuestionnaire, [this.questionnaireFields])) {
      let questionnaire = await this.questionnaireActions.add(this.newQuestionnaire, this.questions);
      if (questionnaire) {
        this.questionnaires.push(questionnaire);
        this.showNotificationSuccess('Encuesta creada con exito!');
      } else {
        this.showNotificationSuccess('Ocurrio un error interno, vuelva a intentarlo');
      }
      this.dialogs.questionnaires = false;
    }
  }

  private async removeQuestionnaire(selectedQuestionnaire: IQuestionnaire) {
    let filtredQuestionnaire = this.questionnaires.filter(questionnaire => questionnaire.id == selectedQuestionnaire.id)[0];
    if (filtredQuestionnaire) {
      const response = await this.questionnaireActions.remove(selectedQuestionnaire);
      if (response.statusCode == 200) {
        let indexQuestionnaire = this.questionnaires.indexOf(filtredQuestionnaire);
        this.questionnaires.splice(indexQuestionnaire, 1)
        this.showNotificationSuccess('Questionnaireo eliminado correctamente')
        this.notification.selectedItem = {};
      } else {
        this.showNotificationError('Ocurrio un error!')
      }
    }
    this.dialogs.deleteQuestionnaire = false;
  }

  private showNewOption() {
    // this.newOption = this.BASE_OPTION;
    this.newOption = {
      cost: 0,
      id: -1,
      idQuestion: -1,
      idUser: -1,
      name: ''
    }
    this.interactionsMode.options = 0;
    this.dialogs.options = true;
  }

  private showNewQuestion() {
    // Object.assign(this.newQuestion, BASE_QUESTION)
    this.newQuestion = {
      id: -1,
      name: '',
      category: '',
      idType: -1,
      options: []
    };
    this.interactionsMode.questions = 0;
    this.dialogs.questions = true;
  }

  private includeNewQuestion() {
    if (this.v.validateFields(this.newQuestion, [this.questionFields])) {
      this.questions.push(this.newQuestion);
      this.newQuestion = {
        id: -1,
        name: '',
        category: '',
        idType: -1,
        options: []
      };
      // Object.assign(this.newQuestion, BASE_QUESTION)
      // this.newQuestion = this.BASE_QUESTION;
      this.dialogs.questions = false;
    }
  }

  private removeQuestion(selectedQuestion: IQuestion) {
    let pos = this.questions.indexOf(selectedQuestion);
    this.questions.splice(pos, 1);
  }

  private includeNewOption() {
    if (this.v.validateFields(this.newOption, [this.optionFields])) {
      this.options.push(this.newOption);
      // this.newOption = this.BASE_OPTION;
      this.newOption = {
        cost: 0,
        id: -1,
        idQuestion: -1,
        idUser: -1,
        name: ''
      }
      this.dialogs.options = false;
    }
  }

  private removeOption(selectedOption: IOption) {
    let pos = this.options.indexOf(selectedOption);
    this.options.splice(pos, 1);
  }

  private filterItems() {
    if (this.search.value == '') {
      return this.questionnaires;
    } else {
      let filterKey = this.searchFilters[this.search.filter];
      return this.questionnaires
        .filter(
          (pedido: any) =>
            (pedido[filterKey] || '')
              .toLowerCase()
              .indexOf(this.search.value.toLowerCase()) != -1
        );
    }
  }

  private showNotificationSuccess(message: string) {
    this.notification.color = 'green';
    this.notification.message = message;
    this.notification.visible = true;
  }

  private showNotificationError(message: string) {
    this.notification.color = 'red';
    this.notification.message = message;
    this.notification.visible = true;
  }

  private showNotificationDelete(selectedQuestionnaire: IQuestionnaire, message?: string) {
    this.notification.selectedItem = selectedQuestionnaire;
    this.notification.color = 'orange';
    this.notification.message = (message || 'Esta seguro de eliminar el item seleccionado?');
    this.notification.visible = true;
  }

  private closeNotification() {
    this.notification.selectedItem = {};
    this.notification.visible = false;
  }
}

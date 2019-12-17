import { Vue } from 'vue-property-decorator';
import IntegrationBackend from '../../utils/IntegrationBackend';
import Event from '../../models/Event';
import EventList from '../../models/EventList';
import QuestionnaireList from '../../models/QuestionnaireList';
import Questionnaire from '../../models/Questionnaire';
import Validation from '@/utils/Validation';
import OptionList from '@/models/OptionList';
import QuestionList from '@/models/QuestionList';
import Question from '@/models/Question';
import Option from '@/models/Option';
import ResultObject from '@/models/ResultObject';

export default class HomeCode extends Vue {

  // methods for connect to backend
  private backend = new IntegrationBackend();

  //validation of fields
  private v: Validation = new Validation();

  // control of the step position in the dialogs
  private wizard = 1;

  // interactionsMode is used for change the state of the buttons
  private interactionsMode = {
    // 0 = add / 1 = save
    questionnaires: 0,
    questions: 0,
    options: 0
  }

  // dialogs in the window
  private dialogs: any = {
    questionnaires: false,
    questions: false,
    options: false,
    deleteQuestionnaire: false,
  }

  private chips = [];
  private items = ['Fiesta', 'Comida', 'Cena', 'Noche', 'Deporte'];

  remove(item: never) {
    this.chips.splice(this.chips.indexOf(item), 1)
    this.chips = [...this.chips]
  }

  // Control activity of the buttons of the main actions
  private disabledButtons: boolean = false;

  private userInfo = this.$store.getters.userInfo;

  // vars object is used for add a new Event with the vinculated objects
  private newQuestionnaire: Questionnaire = new Questionnaire();
  private newQuestion: Question = new Question();
  private newOption: Option = new Option();

  private questionnaires: QuestionnaireList = new QuestionnaireList();
  private questions: QuestionList = new QuestionList();
  private options: OptionList = new OptionList();

  private selectedOption = -1;
  private selectedQuestion = -1;

  // vars only used for validation and model of the text-fields
  private questionnaireFields: any = {
    objectName: 'newQuestionnaire',
    fields: [
      // ['id', 'number'],
      ['name', 'string'],
      ['category', 'string'],
    ]
  }

  private questionFields: any = {
    objectName: 'newQuestion',
    fields: [
      ['name', 'string'],
      ['category', 'string'],
      ['type', 'string'],
      ['idType', 'number'],
    ]
  }

  private optionFields: any = {
    objectName: 'newOption',
    fields: [
      ['name', 'string'],
      ['cost', 'number']
    ]
  }

  // Headers of the tables
  private headersQ: any[] = [
    { text: "Nombre", value: "name", },
    { text: "Categoria", value: "category" },
    { text: "Acciones", value: 'action' }
  ];
  private headersQuestion: any[] = [
    { text: "Nombre", value: "name", },
    { text: "Categoria", value: "category" },
    { text: "Acciones", value: 'action' }
  ];
  private headersOption: any[] = [
    { text: "Nombre", value: "name", },
    { text: "Cost", value: "cost" },
    { text: "Acciones", value: 'action' }
  ];

  // Methods
  init() {
    this.getQuestionnaires();
    this.getDefaultQuestions();
  }

  private async showQuestionnaireDialog() {
    this.interactionsMode.questionnaires = 0; //mode add : 0
    this.dialogs.questionnaires = true;
  }

  private async createQuestionnaire() {
    if (this.v.validateFields(this.newQuestionnaire, [this.questionFields])) {
      if (this.questions.length >= 1) {
        let questionnaire = new Questionnaire();
        let data: any = {
          token: this.userInfo.token,
          questionnaire: {
            id: -1,
            idUser: this.userInfo.id,
            name: this.newQuestionnaire.name,
            category: this.newQuestionnaire.category,
            questions: []
          }
        }
        // add questions into the array
        this.questions.getArray().forEach((question: Question) => {
          let qData: any = {
            idType: question.idType,
            name: question.name,
            category: question.category,
            options: []
          }
          // add options into the array
          question.options.getArray().forEach((option: Option) => {
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
          alert(responsePostQuestionnaire);
          // data.questionnaire.id = responsePostQuestionnaire.value.id;
          // this.questionnaires.add(Object.assign(new Questionnaire(), data.questionnaire));
          this.dialogs.questionnaires.show = false;
        }
      } else {
        alert('Debe tener por lo menos una pregunta')
      }
    }
  }

  private async editQuestionnaire(questionnaire: Questionnaire) {
    this.newQuestionnaire = new Questionnaire();
    Object.assign(this.newQuestionnaire, questionnaire);
    // await this.getQuestionnaires();
    this.interactionsMode.questionnaires = 1; //mode edit : 1
    this.dialogs.events = true;
  }

  private async saveQuestionnaire() {
    if (this.v.validateFields(this.newQuestionnaire, [this.questionnaireFields])) {
      let data = {
        token: this.userInfo.token,
        questionnaire: {
          id: this.newQuestionnaire.id,
          idUser: this.userInfo.id,
          name: this.newQuestionnaire.name,
          category: this.newQuestionnaire.category,
        }
      }
      //save questionnaire
      const responsePutQuestionnaire: any = await this.backend.send('put:questionnaire', data);
      if (responsePutQuestionnaire.statusCode == 200) {
        let questionnaire: any = new Questionnaire();
        Object.assign(questionnaire, data.questionnaire);
      }
      this.dialogs.questionnaires.show = false;
    }
  }

  // QUESTION
  private addNewQuestion() {
    if (this.v.validateFields(this.newQuestion, [this.questionFields])) {
      // let value = {
      //   name: this.newQuestionData._name.value,
      //   category: this.newQuestionData._category.value,
      //   idType: this.newQuestionData._idType.value,
      // }
      if (this.questions.getArray().filter(item => item.name == this.newQuestion.name).length == 0) {
        if (this.options.length > 1) {
          // add question
          this.questions.add(Object.assign(new Question(), this.newQuestion));
          // add the options
          Object.assign(this.questions.getLast().options, this.options);
          // clear
          this.options.clear();
          this.newQuestion = new Question();
        } else {
          alert('La pregunta debe tener como minimo dos opciones')
        }
      } else {
        this.v.addFail('newQuestion.name', 'no puede repetir nombres');
      }
    }
  }

  private async editNewQuestion(question: Question) {
    this.selectedQuestion = this.questions.getArray().indexOf(question);
    this.newQuestion.name = question.name;
    this.newQuestion.category = question.category;
    this.options = this.questions.get(this.selectedQuestion).options;
    this.interactionsMode.questions = 1; //mode edit : 1
  }

  private saveNewQuestion() {
    if (this.v.validateFields(this.newQuestion, [this.questionFields])) {

      const positionName = this.questions.getArray().filter(item =>
        item.name == this.newQuestion.name).length;

      if (positionName == 0 ||
        positionName == 1 && this.questions.get(this.selectedQuestion).name == this.newQuestion.name) {

        if (this.options.length > 1) {
          let question = this.questions.get(this.selectedQuestion);
          question.name = this.newQuestion.name;
          question.category = this.newQuestion.category;
          question.options = this.options;
          this.questions.set(this.selectedQuestion, question);

          // clear
          this.options = new OptionList();
          this.newQuestion = new Question();
          this.newOption = new Option();

          this.interactionsMode.options = 0;
          this.interactionsMode.questions = 0;
        } else {
          alert('La pregunta debe tener como minimo dos opciones')
        }
      } else {
        this.v.addFail('newQuestion.name', 'no puede repetir nombres');
      }
    }
  }

  private deleteNewQuestion(question: Question) {
    const index = this.questions.getArray().indexOf(question);
    this.questions.remove(index);
  }

  // OPTION
  private addNewOption() {
    if (this.v.validateFields(this.newOption, [this.optionFields])) {
      if (this.options.getArray().filter(item => item.name == this.newOption.name).length === 0) {
        this.options.add(Object.assign(new Option(), this.newOption));
        // clear
        this.newOption = new Option();
      } else {
        this.v.addFail('newOption.name', 'no puede repetir nombres');
      }
    }
  }

  private async editNewOption(option: Option) {
    this.selectedOption = this.options.getArray().indexOf(option)
    this.newOption.name = option.name;
    this.newOption.cost = option.cost;
    this.interactionsMode.options = 1; //mode edit : 1
  }

  private saveNewOption() {
    if (this.v.validateFields(this.newOption, [this.optionFields])) {
      const positionName = this.options.getArray()
        .filter(option => option.name == this.newOption.name).length;

      if (positionName == 0 ||
        positionName == 1 && this.options.get(this.selectedOption).name == this.newOption.name) {

        let option = this.options.get(this.selectedOption);
        option.name = this.newOption.name;
        option.cost = this.newOption.cost;
        this.options.set(this.selectedOption, option);
        this.newOption = new Option();
        this.interactionsMode.options = 0;
      } else {
        this.v.addFail('newOption.name', 'no puede repetir nombres');
      }
    }
  }

  private deleteNewOption(option: Option) {
    const index = this.options.getArray().indexOf(option);
    this.options.remove(index);
  }

  // GET QUESTIONNAIRES
  private async getQuestionnaires() {
    const data = {
      token: this.userInfo.token,
      questionnaire: {
        idUser: this.userInfo.id,
      }
    }
    const getQuestionnairesByIdUser: any = await this.backend.send('get:questionnaireByIdUser', data);
    this.questionnaires = new QuestionnaireList();
    Object.assign(this.questionnaires, getQuestionnairesByIdUser.value);
  }

  private async getDefaultQuestions() {
    // let data = {
    //   token: this.userInfo.token,
    //   questionnaire: {
    //     idUser: this.userInfo.id,
    //   }
    // }
    // const getDefaultQuestions: any = await this.backend.send('get:defaultQuestions', data);
    // this.questions = new QuestionList();
    // let question = new Question();
    // getDefaultQuestions.value.forEach((item: any) => {
    //   question = new Question();
    //   question.id = item.id;
    //   question.name = item.name;
    //   question.category = item.category;
    //   question.idType = item.idType;
    //   this.questions.add(question);
    // });

    // Object.assign(this.questions, getDefaultQuestions.value);
    // // console.log(getDefaultQuestions.value)
    // console.log(this.questions.getArray())
  }

  // close event dialog
  closeDialog() {
    this.wizard = 1;
    this.dialogs.questionnaires = false;
  }
}

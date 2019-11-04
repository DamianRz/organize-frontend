import { Vue } from 'vue-property-decorator';
import IntegrationBackend from '../../libs/IntegrationBackend';
import Event from '../../models/Event';
import EventList from '../../models/EventList';
import QuestionnaireList from '../../models/QuestionnaireList';
import Questionnaire from '../../models/Questionnaire';
import Validation from '@/utils/Validation';
import OptionList from '@/models/OptionList';
import QuestionList from '@/models/QuestionList';
import Question from '@/models/Question';
import Option from '@/models/Option';

export default class HomeCode extends Vue {

  // methods for connect to backend
  private backend = new IntegrationBackend();

  //validation of fields
  private v: Validation = new Validation();

  // control of the step position in the dialogs
  private wizard = 1;

  // dialogs in the window
  private dialogs: any = {
    events: false,
  }

  // vars object is used for add a new Event with the vinculated objects
  private event: Event = new Event();
  private questionnaires: QuestionnaireList = new QuestionnaireList();
  private questions: QuestionList = new QuestionList();
  private options: OptionList = new OptionList();

  // others undefined function vars
  private selectedEvent = [];
  private qList: QuestionnaireList = new QuestionnaireList();
  private selectedQ = [];

  // vars only used for validation and model of the text-fields
  private newEvent = {
    name: '',
    location: '',
    start: '',
    end: '',
    description: '',
    guestsNumber: 0,
  }
  private newQuestionnaire = {
    name: {
      value: '',
      required: true,
    },
    category: {
      value: '',
      required: true,
    },
  }
  private newQuestion = {
    name: {
      value: '',
      required: true,
    },
    category: {
      value: '',
      required: true,
    },
    idType: {
      value: '',
      required: false,
    },
  }
  private newOption = {
    name: {
      value: '',
      required: true,
    },
    cost: {
      value: 0,
      required: true,
    },
  }

  private eventList: EventList = new EventList();
  private newQuestionnaires: QuestionnaireList = new QuestionnaireList();
  private newQuestions: QuestionList = new QuestionList();
  private newOptions: OptionList = new OptionList();

  // Headers of the tables
  private headers: any[] = [
    { text: "Nombre", value: "_name", },
    { text: "Lugar", value: "_location" },
    { text: "Inicio", value: "_start" },
    { text: "Invitados", value: "_guestsNumber" },
    { text: "Acciones", value: 'action' }
  ];
  private headersQ: any[] = [
    { text: "Nombre", value: "name", },
    { text: "Categoria", value: "category" },
  ];
  private headersOption: any[] = [
    { text: "Nombre", value: "name", },
    { text: "Cost", value: "cost" },
  ];
  private headersQuestion: any[] = [
    { text: "Nombre", value: "name", },
    { text: "Categoria", value: "category" },
  ];

  // Methods
  init() {
    this.getEvents();
  }

  closeDialog() {
    this.wizard = 1;
    this.dialogs.events = false;
  }

  private createEvent() {
    this.questionnaires.getArray().forEach((q: Questionnaire) => {
      console.log('questionnaire: ')
      q.questions.getArray().forEach((qu: Question) => {
        console.log('question')
        qu.options.getArray().forEach((o: Option) => {
          console.log('option')
        });
      });
    });    
    // console.log('questions: '+this.questionnaires.getLast().questions.length)
  }

  private addNewQuestionnaire() {
    if (this.v.validateFields(this.newQuestionnaire)) {
      let value = {
        name: this.newQuestionnaire.name.value,
        category: this.newQuestionnaire.category.value,
      }
      // test
      this.questionnaires.add(Object.assign(new Questionnaire(), value))
      // normal use
      this.newQuestionnaires.add(Object.assign(new Questionnaire(), value));

      Object.assign(this.newQuestionnaire, this.v.clearObject(this.newQuestionnaire))
      this.wizard = 2;
    } else {
      console.log('error validation addNewQuestion')
    }
  }

  private addNewQuestion() {
    if (this.v.validateFields(this.newQuestion)) {
      let value = {
        name: this.newQuestion.name.value,
        category: this.newQuestion.category.value,
        idType: this.newQuestion.idType.value,
      }
      // test
       
      this.questionnaires.getLast()
      .questions.add(Object.assign(new Question(), value))

      // this.questionnaires.getLast().questions.add(Object.assign(new Question(), value))
      // normal use
      this.newQuestions.add(Object.assign(new Question(), value));

      Object.assign(this.newQuestion, this.v.clearObject(this.newQuestion))
      this.wizard = 3;
    } else {
      console.log('error validation addNewQuestion')
    }
  }

  private addNewOption() {
    if (this.v.validateFields(this.newOption)) {
      let value = {
        name: this.newOption.name.value,
        cost: this.newOption.cost.value,
      }
      // test
      this.questionnaires.getLast()
      .questions.getLast()
      .options.add(Object.assign(new Option(), value));
      
      // this.questions.getLast().options.add(Object.assign(new Option(), value));
      // normal use
      this.newOptions.add(Object.assign(new Option(), value));

      Object.assign(this.newOption, this.v.clearObject(this.newOption));
      this.wizard = 4;
    } else {
      console.log('error validation addNewOption');
    }
  }

  private includeQuestionnaire() {
    this.questionnaires.add(new Questionnaire());
    this.wizard = 3;
  }
  private includeQuestion() {
    this.questionnaires.getLast().questions.add(new Question());
    this.wizard = 4;
  }
  private includeOption() {
    this.questionnaires.getLast().questions.getLast().options.add(new Option());
    this.wizard = 5;
  }

  private async getEvents() {
    let userInfo = this.$store.getters.userInfo;
    let data = {
      token: userInfo.token,
      joinEvent: {
        idUser: userInfo.id,
        idType: 1,
      }
    }
    const getEvents: any = await this.backend.send('get:joinEvents', data);
    Object.assign(this.eventList, getEvents.value)
  }

  private async showEventDialog() {
    let data = {
      questionnaire: {
        idEvent: 1
      }
    }
    this.dialogs.events = true;
    // const getQ: any = await this.backend.send('get:questionnaireByEventId', data);
    // Object.assign(this.qList, getQ.value)
  }

  private selectEvent(item: any) {
    console.log('selected')
  }

  private editItem(item: any) {
  }

  private deleteItem(item: any) {
  }

}

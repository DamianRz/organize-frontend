import { Vue } from 'vue-property-decorator';
import IntegrationBackend from '../../libs/IntegrationBackend';
import Event from '../../models/Event';
import EventList from '../../models/EventList';
import QuestionnaireList from '../../models/QuestionnaireList';
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
  
  // others undefined function vars
  private selectedEvent = [];
  private qList: QuestionnaireList = new QuestionnaireList();
  private selectedQ = [];

  private theNewEvent: any = {
    name: '',
    location: '',
    start: '',
    end: '',
    description: '',
    guestsNumber: 0,
    questionnaires: new QuestionnaireList()
  }
  
  // vars only used for validation and model of the text-fields
  private newEvent = {
    name: '',
    location: '',
    start: '',
    end: '',
    description: '',
    guestsNumber: 0,
  }
  private newQ = {
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
  }

  private addNewQuestionnaire() {
  }

  private addNewQuestion() {
    if(this.v.validateFields(this.newQuestion)) {
      let value = {
        name: this.newQuestion.name.value,
        category: this.newQuestion.category.value,
        idType: this.newQuestion.idType.value,
      }
      this.newQuestions.add(Object.assign(new Question(), value));
      this.wizard = 3;
    }else{
      console.log('error validation addNewQuestion')
    }
  }

  private addNewOption() {
    if(this.v.validateFields(this.newOption)) {
      let value = {
        name: this.newOption.name.value,
        cost: this.newOption.cost.value,
      }
      this.newOptions.add(Object.assign(new Option(), value));
      this.wizard = 4;
    }else{
      console.log('error validation addNewOption')
    }
  }

  private includeQuestionnaire() {
    this.wizard = 3;
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

import { Vue, Watch } from 'vue-property-decorator';
import EventActions from '@/actions/Event.actions';
import QuestionnaireActions from '@/actions/Questionnaire.actions';
import Validation from '@/utils/Validation';
import UserStore from '@/types/UserStore';
// import QuestionnaireList from '@/models/QuestionnaireList';
import IEvent from '../../types/Event.type';
import IQuestionnaire from '../../types/Questionnaire.type';
import Datetime from '@/utils/DateTime';

export default class HomeCode extends Vue {

  private userInfo: UserStore = this.$store.getters.userInfo;
  // Actions Classes
  //.............
  private eventActions: EventActions = new EventActions(this.userInfo);
  private questionnaireActions: QuestionnaireActions = new QuestionnaireActions(this.userInfo);
  //.............
  private events: IEvent[] = [];
  private newEvent: IEvent = this.eventActions.baseEvent;
  private questionnaires: IQuestionnaire[] = [];
  private questionnairesOfEvent: IQuestionnaire[] = [];
  private datetime: Datetime = new Datetime();
  private v: Validation = new Validation();
  private wizard = 1;
  private dialogs = {
    events: false,
    deleteEvent: false
  }

  private search: {filter: string, value: string} = {
    filter: '',
    value: ''
  }
  private searchFilters: any = {
    'nombre': 'name',
    'fecha de inicio': 'startDate'
  }

  private interactionsMode = {
    events: 0
  }

  private eventFields = {
    objectName: 'newEvent',
    fields: [
      ['name', 'string'],
      ['location', 'string'],
      ['startDate', 'string'],
      ['endDate', 'string'],
      ['startHour', 'string'],
      ['endHour', 'string'],
      ['description', 'string'],
      ['guestsNumber', 'number'] // fix this!
    ]
  }

  private questionnaireFields = {
    objectName: 'newQuestionnaire',
    fields: [
      ['name', 'string'],
      ['category', 'string'],
    ]
  }

  private headers: any[] = [
    { text: "Nombre", value: "name", },
    // { text: "Lugar", value: "location", },
    // { text: "Fecha Inicio", value: "startDate" },
    // { text: "Hora", value: "startHour" },
    { text: "Acciones", value: 'action' }
  ];
  private headersQ: any[] = [
    { text: "Nombre", value: "name", },
    { text: "Categoria", value: "category" },
    { text: "Acciones", value: 'action' }
  ];


  // Functions
  async init() {
    this.events = (await this.eventActions.getAll() || this.events);
    this.questionnaires = (await this.questionnaireActions.getByUser() || this.questionnaires);
  }


  // Actions  Functions

  private async addEvent() {
    if (this.v.validateFields(this.newEvent, [this.eventFields])) {
      if (this.questionnairesOfEvent.length > 0) {
        await this.eventActions.add(this.newEvent, this.questionnairesOfEvent);
        this.dialogs.events = false;
      } else {
        alert('debe tener como minimo un cuestionario asignado')
      }

    }
  }

  private async saveEvent() {
    if (this.v.validateFields(this.newEvent, [this.eventFields])) {
      await this.eventActions.save(this.newEvent, this.questionnairesOfEvent);
      this.dialogs.events = false;
    }
  }

  private async deleteEvent(item: any) {
    await this.eventActions.remove(item);
    this.dialogs.deleteEvent = false;
  }

  private async getQuestionnairesx(idEvent: number) {
    await this.questionnaireActions.getByEvent(idEvent);
  }

  private async showEventDialog() {
    this.questionnaires = (await this.questionnaireActions.getByUser() || []);
    // reset vars
    this.newEvent = this.eventActions.baseEvent;
    this.questionnairesOfEvent = [];
    this.interactionsMode.events = 0; //mode add : 0
    this.dialogs.events = true;
  }


  private async editEvent(item: IEvent) {
    this.newEvent = this.eventActions.baseEvent;
    Object.assign(this.newEvent, item);

    this.questionnairesOfEvent = (await this.questionnaireActions.getByEvent(item.id) || []);
    console.log(this.questionnairesOfEvent)
    this.interactionsMode.events = 1; //mode edit : 1
    this.dialogs.events = true;
  }


  private getNewQuestionnaires() {
    try {
      return this.questionnaires;
    } catch (error) {
      return [];
    }
  }

  private getNewQuestions() {
    try {
      return this.questionnaires.getLast().questions.getArray();
    } catch (error) {
      return [];
    }
  }

  private getNewOptions() {
    try {
      return this.questionnaires.getLast().questions.getLast().options.getArray();
    } catch (error) {
      return [];
    }
  }

  private includeQuestionnaire(item: IQuestionnaire) {
    let alreadyExists = false;
    this.questionnairesOfEvent.forEach(q => {
      if (q.id == item.id) {
        alreadyExists = true;
      }
    })
    if (!alreadyExists) {
      this.questionnairesOfEvent.push(item);
    }
  }

  private removeQuestionnaire(item: any) {
    let pos = this.questionnairesOfEvent.indexOf(item);
    this.questionnairesOfEvent.splice(pos, 1);
  }

  private closeDialog() {
    this.wizard = 1;
    this.dialogs.events = false;
  }


  // Functions Test

  private includeQuestion() {
  }
  private includeOption() {
  }

  private async selectEvent(item: any) {
    // await this.questionnaireActions.getByEvent(item._id);
  }

  private getActualDate() {
    console.log(new Datetime().getFormattedDate())
    return new Datetime().getFormattedDate();
  }

  private filterItems() {
    if (this.search.value == '') {
      return this.events;
    } else {
      // filter
      let filterKey = this.searchFilters[this.search.filter];
      return this.events
        .filter(
          (pedido: any) =>
            (pedido[filterKey] || '')
              .toLowerCase()
              .indexOf(this.search.value.toLowerCase()) != -1
        );
    }
  }
}

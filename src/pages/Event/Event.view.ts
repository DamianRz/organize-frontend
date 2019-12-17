import { Vue, Watch } from 'vue-property-decorator';
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
import Datetime from '@/utils/DateTime';

export default class HomeCode extends Vue {

  // TEST
  public test= new Date().toISOString().substr(0, 10);

  private datetime = new Datetime();
  // methods for connect to backend
  private backend = new IntegrationBackend();

  //validation of fields
  private v: Validation = new Validation();

  // control of the step position in the dialogs
  private wizard = 1;

  // dialogs in the window
  private dialogs = {
    events: false,
    deleteEvent: false
  }

  // interactionsMode is used for change the state of the buttons
  private interactionsMode = {
    events: 0
  }

  private userInfo = this.$store.getters.userInfo;

  // vars object is used for add a new Event with the vinculated objects

  private newEvent: Event = new Event();

  private event: Event = new Event();
  private events: EventList = new EventList();
  private questionnaires: QuestionnaireList = new QuestionnaireList();
  private questionnairesOfEvent: QuestionnaireList = new QuestionnaireList();
  private questions: QuestionList = new QuestionList();
  private options: OptionList = new OptionList();

  // vars only used for validation and model of the text-fields
  private eventFields = {
    objectName: 'newEvent',
    fields: [
      // ['id', 'number'],
      ['name', 'string'],
      ['location', 'string'],
      ['start', 'string'],
      ['end', 'string'],
      ['description', 'string'],
      ['guestsNumber', 'number'],
      // ['created', 'string'],
    ]
  }

  private questionnaireFields = {
    objectName: 'newQuestionnaire',
    fields: [
      ['name', 'string'],
      ['category', 'string'],
    ]
  }

  // Headers of the tables
  private headers: any[] = [
    { text: "Nombre", value: "_name", },
    { text: "Lugar", value: "_location", },
    { text: "Inicio", value: "_start" },
    { text: "Acciones", value: 'action' }
  ];
  private headersQ: any[] = [
    { text: "Nombre", value: "_name", },
    { text: "Categoria", value: "_category" },
    { text: "Acciones", value: 'action' }
  ];

  // Methods
  init() {
    this.getEvents();
  }

  // close event dialog
  closeDialog() {
    this.wizard = 1;
    this.dialogs.events = false;
  }

  private async createEvent() {
    if (this.v.validateFields(this.newEvent, [this.eventFields])) {
      // let event = new Event();
      let data = {
        token: this.userInfo.token,
        event: {
          id: -1,
          name: this.newEvent.name,
          location: this.newEvent.location,
          start: '0000-00-00 00:00:00',
          end: '0000-00-00 00:00:00',
          description: this.newEvent.description,
          guestsNumber: this.newEvent.guestsNumber,
          created: '0000-00-00 00:00:00',
          state: true,
        },
        joinEvent: {
          idUser: this.userInfo.id,
          idType: 1,
        }
      }
      const responsePostEvent: any = await this.backend.send('post:event', data);
      if (responsePostEvent.statusCode == 200) {
        data.event.id = responsePostEvent.value.id;
        this.events.add(Object.assign(new Event(), data.event));

        let linkQuestionnaireData: any = {
          token: this.userInfo.token,
          link: {
            idEvent: responsePostEvent.value.id,
            idQuestionnaires: [],
          }
        }
        this.questionnairesOfEvent.getArray().forEach((questionnaire: Questionnaire) => {
          linkQuestionnaireData.link.idQuestionnaires.push(questionnaire['_id']);
        });
        let response = await this.backend.send('post:eventQuestionnaireOption', linkQuestionnaireData);
        this.dialogs.events = false;
      }
    }
  }

  private async saveEvent() {
    if (this.v.validateFields(this.newEvent, [this.eventFields])) {
      let data = {
        token: this.userInfo.token,
        event: {
          id: this.newEvent.id,
          name: this.newEvent.name,
          location: this.newEvent.location,
          start: '0000-00-00 00:00:00',
          end: '0000-00-00 00:00:00',
          description: this.newEvent.description,
          guestsNumber: this.newEvent.guestsNumber,
          created: '0000-00-00 00:00:00',
          state: true,
        },
        joinEvent: {
          idUser: this.userInfo.id,
          idType: 1,
        }
      }
      //save event
      const responsePutEvent: any = await this.backend.send('put:event', data);
      if (responsePutEvent.statusCode == 200) {
        this.events.set(this.events.getIndexById(this.newEvent.id), this.newEvent);
        // remove all questionnaires related with the event
        let dataRemove = {
          token: this.userInfo.token,
          link: {
            idEvent: this.newEvent.id,
          }
        }
        const responseDeleteEventQO: any = await this.backend.send('delete:eventQuestionnaireOption', dataRemove);
        // add the assigned questionnaires
        let linkQuestionnaireData: any = {
          token: this.userInfo.token,
          link: {
            idEvent: this.newEvent.id,
            idQuestionnaires: [],
          }
        }
        this.questionnairesOfEvent.getArray().forEach((questionnaire: Questionnaire) => {
          linkQuestionnaireData.link.idQuestionnaires.push(questionnaire['_id']);
        });
        let response = await this.backend.send('post:eventQuestionnaireOption', linkQuestionnaireData);
      }
      this.dialogs.events = false;
    }
  }

  
  // methods used in tables in dialogs
  private getNewQuestionnaires() {
    try {
      return this.questionnaires.getArray();
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

  private includeQuestionnaire(item: any) {
    if (this.questionnairesOfEvent.getIndexById(item._id) == -1) {
      this.questionnairesOfEvent.add(item);
    }
  }
  private removeQuestionnaire(item: any) {
    this.questionnairesOfEvent.remove(this.questionnairesOfEvent.getIndexById(item._id));
  }
  private includeQuestion() {
  }
  private includeOption() {
  }

  // Backend methods
  private async getEvents() {
    let data = {
      token: this.userInfo.token,
      joinEvent: {
        idUser: this.userInfo.id,
        idType: 1,
      }
    }
    console.log('get Events ', data)
    const getEvents: any = await this.backend.send('get:joinEvents', data);
    Object.assign(this.events, getEvents.value)
  }

  // GET QUESTIONNAIRES
  private async getQuestionnaires(idEvent: number) {
    let data1 = {
      token: this.userInfo.token,
      questionnaire: {
        idUser: this.userInfo.id,
      }
    }
    const getQuestionnairesByIdUser: any = await this.backend.send('get:questionnaireByIdUser', data1);
    this.questionnaires = new QuestionnaireList();
    Object.assign(this.questionnaires, getQuestionnairesByIdUser.value);
    let data = {
      token: this.userInfo.token,
      questionnaire: {
        idEvent: idEvent,
      }
    }
    const getQuestionnairesOfEvent: any = await this.backend.send('get:questionnaireByEventId', data);
    Object.assign(this.questionnairesOfEvent, getQuestionnairesOfEvent.value);
  }

  private async showEventDialog() {
    let data1 = {
      token: this.userInfo.token,
      questionnaire: {
        idUser: this.userInfo.id,
      }
    }
    const getQuestionnairesByIdUser: any = await this.backend.send('get:questionnaireByIdUser', data1);
    this.questionnaires = new QuestionnaireList();
    Object.assign(this.questionnaires, getQuestionnairesByIdUser.value);
    // clear
    this.newEvent = new Event();
    this.questionnairesOfEvent = new QuestionnaireList();
    this.interactionsMode.events = 0; //mode add : 0
    this.dialogs.events = true;
  }

  private async editEvent(item: any) {
    this.newEvent = new Event();
    Object.assign(this.newEvent, item);

    // formatting date
    let { start, end, created } = this.newEvent;
    // DATETIME=> 2019-12-28T03:00:00.000Z | FILTER=>  28-12-2019 03:00:00
    start = new Date().toISOString().substr(0, 10)
    // console.log('filterd date: ', start)
    // end = this.datetime.normalize(end);
    // created = this.datetime.normalize(created);
    this.newEvent.start = start;
    // this.newEvent.end = end;
    // this.newEvent.created = created;

    await this.getQuestionnaires(item._id);
    this.interactionsMode.events = 1; //mode edit : 1
    this.dialogs.events = true;
  }

  private async deleteEvent(item: any) {
    let data = {
      token: this.userInfo.token,
      event: {
        id: item['_id'],
      }
    }
    const resultDeleteEvent: any = await this.backend.send('delete:event', data);
    if (resultDeleteEvent.statusCode == 200) {
      const index = this.events.indexOf(item);
      this.events.remove(index);
    }
    this.dialogs.deleteEvent = false;
  }

  private selectEvent(item: any) {
    // this.getQuestionnaires(item.id)
  }

  @Watch("newEvent.startDate")
  onStartDateChanged() {
    console.log('cambia')
    this.newEvent.end = "";
  }
}

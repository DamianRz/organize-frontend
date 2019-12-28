import { Vue } from 'vue-property-decorator';
import EventActions from '@/actions/Event.actions';
import QuestionnaireActions from '@/actions/Questionnaire.actions';
import Validation from '@/utils/Validation';
import UserStore from '@/types/UserStore';
import IEvent from '../../types/Event.type';
import IQuestionnaire from '../../types/Questionnaire.type';
import Datetime from '@/utils/DateTime';
import ResultObject from '@/models/ResultObject';

export default class HomeCode extends Vue {
  private userInfo: UserStore = this.$store.getters.userInfo;
  private eventActions: EventActions = new EventActions(this.userInfo);
  private questionnaireActions: QuestionnaireActions = new QuestionnaireActions(this.userInfo);
  private events: IEvent[] = [];
  private newEvent: IEvent = this.eventActions.baseEvent;
  private questionnaires: IQuestionnaire[] = [];
  private questionnairesOfEvent: IQuestionnaire[] = [];
  private datetime: Datetime = new Datetime();
  private v: Validation = new Validation();
  private wizard = 1;
  private dialogs = {
    events: false,
    eventsQuestionnaires: false,
    deleteEvent: false
  }
  private notification = {
    visible: false,
    message: '',
    color: 'green'
  }
  private todayDate: string = new Datetime().getFormattedDate();
  private search: { filter: string, value: string } = {
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

  // private headers: any[] = [
  //   { text: "Nombre", value: "name", },
  //   // { text: "Lugar", value: "location", },
  //   // { text: "Fecha Inicio", value: "startDate" },
  //   // { text: "Hora", value: "startHour" },
  //   { text: "Acciones", value: 'action' }
  // ];
  // private headersQ: any[] = [
  //   { text: "Nombre", value: "name", },
  //   { text: "Categoria", value: "category" },
  //   { text: "Acciones", value: 'action' }
  // ];

  async init() {
    this.events = (await this.eventActions.getAll() || this.events);
    this.questionnaires = (await this.questionnaireActions.getByUser() || this.questionnaires);
  }

  private async addEvent() {
    if (this.v.validateFields(this.newEvent, [this.eventFields])) {
      let event = await this.eventActions.add(this.newEvent, this.questionnairesOfEvent);
      if (event) {
        this.events.push(event);
        this.showNotificationSuccess('Evento creado con exito!');
      } else {
        this.showNotificationSuccess('Ocurrio un error interno, vuelva a intentarlo');
      }
      this.dialogs.events = false;
    }
  }

  private async saveEvent() {
    if (this.v.validateFields(this.newEvent, [this.eventFields])) {
      let response = await this.eventActions.save(this.newEvent);
      if (response.statusCode == 200) {
        let indexEvent = this.events.filter(event => event.id == this.newEvent.id)[0];
        let pos = this.events.indexOf(indexEvent);
        Object.assign(this.events[pos], this.newEvent);
        this.dialogs.events = false;
        this.showNotificationSuccess('Datos guardados con exito!');
      } else {
        this.showNotificationSuccess('Ocurrio un error interno, vuelva a intentarlo');
        console.log(response)
      }
    }
  }

  private async saveQuestionnairesOfEvent() {
    if (this.questionnairesOfEvent.length > 0) {
      console.log(this.newEvent)
      await this.eventActions.saveQuestionnairesOfEvent(this.newEvent.id, this.questionnairesOfEvent);
      this.dialogs.eventsQuestionnaires = false;
    } else {
      alert('Debe tener como minimo un cuestionario asignado')
    }
  }

  private async removeEvent(selectedEvent: IEvent) {
    if (confirm('Esta seguro de que desea eliminar el evento ' + selectedEvent.name + '?')) {
      const response = await this.eventActions.remove(selectedEvent);
      if (response.statusCode == 200) {
        let indexEvent = this.events.filter(event => event.id == selectedEvent.id)[0];
        let pos = this.events.indexOf(indexEvent);
        this.events.splice(pos, 1)
        this.showNotificationSuccess('Evento eliminado correctamente')
      } else {
        this.showNotificationError('Ocurrio un error!')
        console.log(response)
      }
      this.dialogs.deleteEvent = false;
    }
  }

  private async getQuestionnairesx(idEvent: number) {
    await this.questionnaireActions.getByEvent(idEvent);
  }

  private async showNewEvent() {
    this.newEvent = {
      id: -1,
      name: '',
      created: '',
      description: '',
      guestsNumber: 0,
      location: '',
      startDate: '',
      startHour: '',
      endDate: '',
      endHour: '',
      state: false
    };
    this.interactionsMode.events = 0;
    this.questionnairesOfEvent = [];
    this.dialogs.events = true;
  }


  private async editEvent(item: IEvent) {
    this.newEvent = this.eventActions.baseEvent;
    Object.assign(this.newEvent, item);
    // this.questionnairesOfEvent = (await this.questionnaireActions.getByEvent(item.id) || []);
    // console.log(this.questionnairesOfEvent)
    this.interactionsMode.events = 1; //mode edit : 1
    this.dialogs.events = true;
  }

  private async editQuestionnairesOfEvent(selectedEvent: IEvent) {
    console.log(selectedEvent)
    if (selectedEvent.id != -1) {
      this.questionnairesOfEvent = (await this.questionnaireActions.getByEvent(selectedEvent.id) || []);
      this.dialogs.eventsQuestionnaires = true;
    }
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
    this.todayDate = new Datetime().getFormattedDate();
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
}

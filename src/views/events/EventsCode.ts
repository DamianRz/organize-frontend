import { Vue } from 'vue-property-decorator';
import IntegrationBackend from '../../libs/IntegrationBackend';
import Event from '../../models/Event';
import EventList from '../../models/EventList';
import QuestionnaireList from '../../models/QuestionnaireList';
import Questionnaire from '@/models/Question';

export default class HomeCode extends Vue {
  private backend = new IntegrationBackend();
  private wizard = 1;

  private dialogs: any = {
    events: false
  }

  // Events vars
  private headers: any[] = [
    { text: "Nombre", value: "_name", },
    { text: "Lugar", value: "_location" },
    { text: "Inicio", value: "_start" },
    { text: "Invitados", value: "_guestsNumber" },
    { text: "Descripcion", value: "_description" },
    { text: "Estado", value: "_state" }
  ];
  private eventList: EventList = new EventList();
  private selectedEvent = [];


  // Questionnaires vars
  private headersQ: any[] = [
    { text: "Nombre", value: "_name", },
    { text: "Categoria", value: "_category" },
  ];
  private qList: QuestionnaireList = new QuestionnaireList();
  private selectedQ = [];


  // Methods

  init() {
    this.getEvents();
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
    const getQ: any = await this.backend.send('get:questionnaireByEventId', data);
    Object.assign(this.qList, getQ.value)
  }

  private selectEvent(item: any) {
    console.log('selected')
  }

}

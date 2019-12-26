import IntegrationBackend from '../utils/IntegrationBackend';
import IQuestionnaire from '../types/Questionnaire.type';
import IEvent from '../types/Event.type';
import IUserStore from '@/types/UserStore';
import Event from '../models/Event';
import ResultObject from '@/models/ResultObject';
import Datetime from '../utils/DateTime';

export default class EventActions {
  private backend: any = new IntegrationBackend();
  private userInfo: IUserStore = {
    id: -1,
    username: '',
    token: ''
  }
  public baseEvent: IEvent = {
    id: -1,
    name: '',
    location: '',
    startDate: '',
    startHour: '',
    endDate: '',
    endHour: '',
    description: '',
    guestsNumber: 0,
    created: '',
    state: true,
  }

  constructor(userInfo: IUserStore) {
    this.userInfo = userInfo;
  }

  // GET
  async getAll() {
    let events: IEvent[] = [];
    let data = {
      token: this.userInfo.token,
      joinEvent: {
        idUser: this.userInfo.id,
        idType: 1,
      }
    }
    const response: ResultObject = await this.backend.send('get:joinEvents', data);
    console.log(response.value)
    if (response.statusCode == 200) {
      (response.value._events || []).map((e: Event) => {
        // for (let i = 0; i < 50; i++) {
          let event: IEvent = {
            id: e['_id'],
            name: e['_name'],
            created: e['_created'],
            description: e['_description'],

            startDate: new Datetime().getDate(e['_start']),
            endDate: new Datetime().getDate(e['_end']),

            startHour: new Datetime().getHour(e['_start']).substr(0, 5),
            endHour: new Datetime().getHour(e['_end']).substr(0, 5),

            guestsNumber: (e['_guestsNumber'] | 0),
            location: e['_location'],
            state: e['_state']
          };
          events.push(event);

        // }
      });
      return events;
    } else {
      return null
    }
  }



  // ADD
  async add(event: IEvent, questionnaires: IQuestionnaire[]) {
    let data = {
      token: this.userInfo.token,
      event: {
        id: -1,
        start: `${event.startDate} ${event.startHour}`,
        end: `${event.endDate} ${event.endHour}`,
        name: event.name,
        location: event.location,
        description: event.description,
        guestsNumber: event.guestsNumber,
        created: event.created,
        state: true,
      },
      joinEvent: {
        idUser: this.userInfo.id,
        idType: 1,
      }
    }

    const response: ResultObject = await this.backend.send('post:event', data);
    if (response.statusCode == 200) {
      event.id = response.value.id;
      // link event-questionnaires
      this.linkQuestionnaires(questionnaires, event.id);
      return Object.assign(event, data.event);
    } else {
      return null;
    }
  }

  // SAVE
  async save(event: IEvent, questionnaires: IQuestionnaire[]) {
    let data = {
      token: this.userInfo.token,
      event: {
        id: event.id,
        name: event.name,
        location: event.location,
        start: `${event.startDate} ${event.startHour}`,
        end: `${event.endDate} ${event.endHour}`,
        description: event.description,
        guestsNumber: event.guestsNumber,
        created: event.created,
        state: true,
      },
      joinEvent: {
        idUser: this.userInfo.id,
        idType: 1,
      }
    }
    const response: any = await this.backend.send('put:event', data);
    if (response.statusCode == 200) {
      // delete links event-questionnaire_option
      this.removeLinksQuestionnaires(event.id);
      // link event-questionnaires
      this.linkQuestionnaires(questionnaires, data.event.id);
      return { statusCode: 200 };
    } else {
      return response;
    }
  }

  // REMOVE
  async remove(selectedEvent: IEvent) {
    let data = {
      token: this.userInfo.token,
      event: {
        id: selectedEvent.id,
      }
    }
    const response: any = await this.backend.send('delete:event', data);
    if (response.statusCode == 200) {
      // const index = this.events.indexOf(selectedEvent);
      // this.events.remove(index);
      return { statusCode: 200 }
    } else {
      return response;
    }
  }



  // LINK_QUESTIONNAIRES
  async linkQuestionnaires(questionnaires: IQuestionnaire[], idEvent: number) {
    let data: any = {
      token: this.userInfo.token,
      link: {
        idEvent: idEvent,
        idQuestionnaires: [],
      }
    }
    questionnaires.forEach((questionnaire: IQuestionnaire) => {
      data.link.idQuestionnaires.push(questionnaire.id);
    });
    await this.backend.send('post:eventQuestionnaireOption', data);
  }

  // REMOVE-LINKS_QUESTIONNAIRES
  async removeLinksQuestionnaires(idEvent: number) {
    let data = {
      token: this.userInfo.token,
      link: {
        idEvent: idEvent,
      }
    }
    const responseDeleteEventQO: any = await this.backend.send('delete:eventQuestionnaireOption', data);
  }
}
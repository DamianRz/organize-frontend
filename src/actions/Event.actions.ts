import IntegrationBackend from '../utils/IntegrationBackend';
import IQuestionnaire from '../types/Questionnaire.type';
import IEvent from '../types/Event.type';
import IUserStore from '@/types/UserStore';
import Event from '../models/Event';
import ResultObject from '@/models/ResultObject';
import Datetime from '../utils/DateTime';
import {
  STATE_ACTIVE,
  STATE_CANCELLED,
  STATE_FINALIZED,
  STATE_HIDE
} from '../types/EventStates'
import { BASE_USERSTORE } from '../types/BaseObjects.types';


export default class EventActions {
  private backend: any = new IntegrationBackend();
  private userInfo: IUserStore = BASE_USERSTORE;

  constructor(userInfo: IUserStore) {
    this.userInfo = userInfo;
  }

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
      });
      return events;
    } else {
      return null
    }
  }

  async add(event: IEvent, questionnaires: IQuestionnaire[]) {
    let data = {
      token: this.userInfo.token,
      event: {
        id: -1,
        start: `${event.startDate} ${event.startHour}:00`,
        end: `${event.endDate} ${event.endHour}:00`,
        name: event.name,
        location: event.location,
        description: event.description,
        guestsNumber: event.guestsNumber,
        created: `${new Datetime().getFormattedDate()} ${new Datetime().getHour()}`,
        state: STATE_HIDE,
      },
      joinEvent: {
        idUser: this.userInfo.id,
        idType: 1,
      }
    }
    const response: ResultObject = await this.backend.send('post:event', data);
    if (response.statusCode == 200) {
      data.event.id = response.value.id;
      return Object.assign(event, data.event);
    } else {
      return null;
    }
  }

  async save(event: IEvent) {
    let data = {
      token: this.userInfo.token,
      event: {
        id: event.id,
        name: event.name,
        location: event.location,
        start: `${event.startDate} ${event.startHour}`,
        end: `${event.endDate} ${event.endHour}`,
        description: event.description,
        guestsNumber: parseInt(event.guestsNumber + ''),
        state: event.state,
      },
      joinEvent: {
        idUser: this.userInfo.id,
        idType: 1,
      }
    }
    const response: ResultObject = await this.backend.send('put:event', data);
    if (response.statusCode == 200) {
      return { statusCode: 200 };
    } else {
      return response;
    }
  }

  async saveQuestionnairesOfEvent(idEvent: number, questionnaires: IQuestionnaire[]) {
    await this.removeLinksQuestionnaires(idEvent);
    await this.linkQuestionnaires(questionnaires, idEvent);
  }

  async remove(selectedEvent: IEvent) {
    let data = {
      token: this.userInfo.token,
      event: {
        id: selectedEvent.id,
      }
    }
    const response: any = await this.backend.send('delete:event', data);
    if (response.statusCode == 200) {
      return { statusCode: 200 }
    } else {
      return response;
    }
  }

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

  async removeLinksQuestionnaires(idEvent: number) {
    let data = {
      token: this.userInfo.token,
      link: {
        idEvent: idEvent,
      }
    }
    const responseDeleteEventQO: any = await this.backend.send('delete:eventQuestionnaireOption', data);
  }

  getInfoByState(state: string): { text: string, color: string } {
    switch (state) {
      case STATE_ACTIVE:
        return { text: 'activo', color: 'green' }
        break;
      case STATE_CANCELLED:
        return { text: 'cancelado', color: 'yellow' }
        break;
      case STATE_FINALIZED:
        return { text: 'finalizado', color: 'grey' }
        break;
      case STATE_HIDE:
        return { text: 'oculto', color: 'silver' }
        break;
      default:
        return { text: 'estado desconocido', color: 'red' }
    }
  }
}

import IntegrationBackend from '../utils/IntegrationBackend';
import IEvent from '../types/Event.type';
import Event from '../models/Event';
import EventList from '../models/EventList';
import Datetime from '../utils/DateTime';
import QuestionnaireList from '@/models/QuestionnaireList';
import Questionnaire from '@/models/Questionnaire';

export default class EventActions {
  private backend: any = new IntegrationBackend();

  private userInfo: {id: number, token: string} = {
    id: -1,
    token: ''
  }

  constructor(user: {id: number, token: string}) {
    this.userInfo = user;
  }

  // Vars used for EventActions
  public events: EventList = new EventList();

  // Functions

  // GET
  async get() {
    let data = {
      token: this.userInfo.token,
      joinEvent: {
        idUser: this.userInfo.id,
        idType: 1,
      }
    }
    const response: { value: string, statusCode: number } = await this.backend.send('get:joinEvents', data);
    Object.assign(this.events, response.value)
  }

  // ADD
  async add(event: IEvent, questionnaires: QuestionnaireList) {
    let data = {
      token: this.userInfo.token,
      event: {
        id: -1,
        name: event.name,
        location: event.location,
        start: event.start,
        end: event.end,
        description: event.description,
        guestsNumber: event.guestsNumber,
        created: new Datetime().now(),
        state: true,
      },
      joinEvent: {
        idUser: this.userInfo.id,
        idType: 1,
      }
    }

    const response: { value: any, statusCode: number } = await this.backend.send('post:event', data);
    if (response.statusCode == 200) {
      data.event.id = response.value.id;
      this.events.add(Object.assign(new Event(), data.event));
      // link event-questionnaires
      this.linkQuestionnaires(questionnaires, data.event.id)
    }
  }

  // SAVE
  async save(event: IEvent, questionnaires: QuestionnaireList) {
    let data = {
      token: this.userInfo.token,
      event: {
        id: event.id,
        name: event.name,
        location: event.location,
        start: event.start,
        end: event.end,
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
      this.events.set(this.events.getIndexById(event.id), Object.assign(new Event(), event));
      // delete links event-questionnaire_option
      this.removeLinksQuestionnaires(event.id)
      // link event-questionnaires
      this.linkQuestionnaires(questionnaires, data.event.id)
    }
  }

  // REMOVE
  async remove(selectedEvent: Event) {
    let data = {
      token: this.userInfo.token,
      event: {
        id: selectedEvent['_id'],
      }
    }
    const response: any = await this.backend.send('delete:event', data);
    if (response.statusCode == 200) {
      const index = this.events.indexOf(selectedEvent);
      this.events.remove(index);
    }
  }

  // LINK_QUESTIONNAIRES
  async linkQuestionnaires(questionnaires: QuestionnaireList, idEvent: number) {
    let data: any = {
      token: this.userInfo.token,
      link: {
        idEvent: idEvent,
        idQuestionnaires: [],
      }
    }
    questionnaires.getArray().forEach((questionnaire: Questionnaire) => {
      data.link.idQuestionnaires.push(questionnaire['_id']);
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
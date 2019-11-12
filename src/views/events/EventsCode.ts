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
    events: {
      show: false,
      mode: 0
    },
  }

  private userInfo = this.$store.getters.userInfo;
  // vars object is used for add a new Event with the vinculated objects
  private event: Event = new Event();
  private events: EventList = new EventList();
  private questionnaires: QuestionnaireList = new QuestionnaireList();
  private questionnairesOfEvent: QuestionnaireList = new QuestionnaireList();
  private questions: QuestionList = new QuestionList();
  private options: OptionList = new OptionList();

  // vars only used for validation and model of the text-fields
  private newEventData: any = {
    formName: 'newEventData',
    _id: {
      value: -1,
      required: false,
    },
    _name: {
      value: '',
      required: true,
    },
    _location: {
      value: '',
      required: true,
    },
    _start: {
      value: '',
      required: true,
    },
    _end: {
      value: '',
      required: true,
    },
    _description: {
      value: '',
      required: true,
    },
    _guestsNumber: {
      value: '',
      required: true,
    },
    _created: {
      value: '',
      required: false,
    },
    _state: {
      value: '',
      required: false,
    },
  }
  private newQuestionnaire: any = {
    formName: 'newQuestionnaireData',
    _name: {
      value: '',
      required: true,
    },
    _category: {
      value: '',
      required: true,
    },
  }
  private newQuestion: any = {
    formName: 'newQuestionData',
    _name: {
      value: '',
      required: true,
    },
    _category: {
      value: '',
      required: true,
    },
    _idType: {
      value: '',
      required: false,
    },
  }
  private newOption: any = {
    formName: 'newOptionData',
    _name: {
      value: '',
      required: true,
    },
    _cost: {
      value: 0,
      required: true,
    },
  }

  // Headers of the tables
  private headers: any[] = [
    { text: "Nombre", value: "_name", },
    { text: "Inicio", value: "_start" },
    { text: "Acciones", value: 'action' }
  ];
  private headersQ: any[] = [
    { text: "Nombre", value: "_name", },
    { text: "Categoria", value: "_category" },
    { text: "Acciones", value: 'action' }
  ];
  private headersQuestion: any[] = [
    { text: "Nombre", value: "_name", },
    { text: "Categoria", value: "_category" },
  ];
  private headersOption: any[] = [
    { text: "Nombre", value: "_name", },
    { text: "Cost", value: "_cost" },
  ];

  // Methods
  init() {
    this.getEvents();
  }

  // close event dialog
  closeDialog() {
    this.wizard = 1;
    this.dialogs.events.show = false;
  }

  private async createEvent() {
    if (this.v.validateFields([this.newEventData])) {
      let event = new Event();

      let data = {
        token: this.userInfo.token,
        event: {
          name: this.newEventData._name.value,
          location: this.newEventData._location.value,
          start: '0000-00-00 00:00:00',
          end: '0000-00-00 00:00:00',
          description: this.newEventData._description.value,
          guestsNumber: this.newEventData._guestsNumber.value,
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

        await Promise.all(
          this.questionnairesOfEvent.getArray().map(async q => {
            let data2 = {
              token: this.userInfo.token,
              link: {
                idEvent: responsePostEvent.value.id,
                idQuestionnaire: q['_id']
              }
            }    
            console.log(data2.link.idQuestionnaire)
            const responsePostEventQO: any = await this.backend.send('post:eventQuestionnaireOption', data2)
            console.log(responsePostEventQO)
          })
        );
      }
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

  // button save in the sub-dialogs
  private addNewQuestionnaire() {
    if (this.v.validateFields([this.newQuestionnaire])) {
      let value = {
        name: this.newQuestionnaire._name.value,
        category: this.newQuestionnaire._category.value,
      }
      // this.questionnaires.setLast(Object.assign(new Questionnaire(), value));
      this.questionnaires.add(Object.assign(new Questionnaire(), value))
      Object.assign(this.newQuestionnaire, this.v.clearObject(this.newQuestionnaire));
      this.wizard = 2;
    } else {
      console.log('error validation addNewQuestion')
    }
  }
  private addNewQuestion() {
    if (this.v.validateFields([this.newQuestion])) {
      let value = {
        name: this.newQuestion._name.value,
        category: this.newQuestion._category.value,
        idType: this.newQuestion._idType.value,
      }
      this.questions.add(Object.assign(new Question(), value))
      Object.assign(this.newQuestion, this.v.clearObject(this.newQuestion))
      this.wizard = 3;
    } else {
      console.log('error validation addNewQuestion')
    }
  }
  private addNewOption() {
    if (this.v.validateFields([this.newOption])) {
      let value = {
        name: this.newOption._name.value,
        cost: this.newOption._cost.value,
      }
      this.options.add(Object.assign(new Option(), value))
      Object.assign(this.newOption, this.v.clearObject(this.newOption));
      this.wizard = 4;
    } else {
      console.log('error validation addNewOption');
    }
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
    Object.assign(this.newEventData, this.v.clearObject(this.newEventData));
    this.questionnairesOfEvent = new QuestionnaireList();
    this.dialogs.events.mode = 0; //mode add : 0
    this.dialogs.events.show = true;
  }

  private async editEvent(item: any) {
    Object.assign(this.newEventData, this.v.clearObject(this.newEventData));
    Object.keys(item).forEach(key => {
      this.newEventData[key].value = item[key];
      // console.log(key)
    });
    await this.getQuestionnaires(item._id);
    this.dialogs.events.mode = 1; //mode edit : 1
    this.dialogs.events.show = true;
  }
  private deleteEvent(item: any) {
  }

  private selectEvent(item: any) {
    // this.getQuestionnaires(item.id)
  }

}

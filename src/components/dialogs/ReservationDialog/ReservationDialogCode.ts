import { Vue, Component } from 'vue-property-decorator';
import PageData from '../../../data/PageData';
import ReservationStructure from './ReservationStructure';
import  InBack  from './IntegrationBackend';
//timeout: 1000,

export default class ReservationDialogCode extends Vue {
    private structure = new ReservationStructure();
    private steps: any = this.structure.steps;
    private data: any = new PageData();
    private item: any = {};
    private wizard: number = 1;
    private inback = new InBack();

    private reservation = {
        employeeId: null,
        clientId: null,
        workId: null,
        startHour: null,
        startDate: null,
        isSuccess: false,
    }

    private selectedEmployee: any = {};
    private structureObjectReservationResponse = {
        reserve_id: null,
        barberOrHairdresserId: null,
        clientId: null,
        nameClient: null,
        mailClient : null,
        celClient: null,
        startTime: null ,
        endTime : null ,
        createOn : null,
        work_id : null,
        workToDo : null ,
        priceWork : null,
        workTime : null,
        additionalCost : null,
        totalCost : null
    }
    private selectedJob: any = {};

    //show and hide the reservation
   get model(): boolean {
    return this['value'];
  }

  set model(model: boolean) {
    this.$emit('input', model);
  }

    private selectJob(job: any) {
        this.selectedJob = job;
        this.reservation.workId = job.workId;
    }

    private selectEmployee(employee: any) {
        this.selectedEmployee = employee;
        this.selectedJob = {};
        this.reservation.employeeId = employee.userId;
    }

    private getWorksByTypeEmployee() { 
        if (this.selectedEmployee['barberId']) {
            return this.data.works.barberWorks;
        } else { 
            return this.data.works.hairdresserWorks;
        }
    }

    private checkSuccessStep() {
        let required = this.steps[this.wizard - 1].required;
        if (this.reservation[required] != undefined) {
            return false;//not disabled
        } else {
            return true; //disabled
        }
    }

    //pensar este metodo: debe desmarcar todos los domingos 
    private getDaysExceptWednesday() {
        return val => parseInt(val.split('-')[2]) % 7 === 1;
    }

    private getDayNumber(date: any) {
        return new Date(date).getDay();
    }

    private selectHour(hour: any) {
        this.data.weekObject.map((item: any) => {
            if (item == hour) {
                item.selected = true;
                this.reservation.startHour = hour.hour;
            } else {
                item.selected = false;
            }
        });
    }

    private getHours(saturday: boolean) {
        let items: any = [];
        this.data.weekObject.forEach((item: any) => {
            if (item.saturday == saturday) {
                items.push(item);
            }
        });
        return items;
    }

    next() {
        if (this.steps.length > this.wizard) this.wizard += 1;
    }

    prev() {
        if (this.steps.length > 0) this.wizard -= 1;
    }

    jump(value: number) {
        if (value >= 0 && value <= this.steps.length) {
            this.wizard = value;
        }
    }

    getFieldType(type: string): string {
        let component: string = '';
        if (type == 'input') component = 'v-text-field';
        if (type == 'select') component = 'v-select';
        if (type == 'list') component = 'x-list';
        if (type == 'checkbox') component = 'v-checkbox';
        if (type == 'date') component = 'v-date-picker';
        return component;
    }

    async event() {
     try{      
        console.log('Antes del rsponse: ')
        let response = await this.inback.getReserves();
        console.log('Despues del response: ')
        console.log(response);
    }catch(error){
        console.error('yep, algo se rompio'+ error);
        }
    }
            
    }
 


/*  OBjeto reserva que llega del backend. completo, y Asignacion de cada uno de los atributos.
Se reemplaza con la cadena, OBject.assign(copia, contieneLaData)
                   // this.barberOrHairdresserId = eachOne['barberId'];
                   // this.clientId              = eachOne['clientId'];
                   // this.workId                = eachOne['workId'];
                   // this.startDate             = eachOne['startDate'];
                   // this.reserve_id            = eachOne['reserve_id'],
                   // this.barberOrHairdresserId = eachOne['barberOrHairdresserId'],
                   //this.clientId              = eachOne['clientId'],
                   this.nameClient            = eachOne['nameClient'],
                   this.mailClient            = eachOne['mailClient'],
                   this.celClient             = eachOne['celClient'],
                   this.startTime             = eachOne['startTime'] ,
                   this.endTime               = eachOne['endTime'] ,
                   this.createOn              = eachOne['createOn'],
                   this.work_id               = eachOne['work_id'],
                   this.workToDo              = eachOne['workToDo'] ,
                   this.priceWork             = eachOne['priceWork'],
                   this.workTime              = eachOne['workTime'],
                   this.additionalCost        = eachOne['additionalCost'],
                   this.totalCost             = eachOne['totalCost']*/
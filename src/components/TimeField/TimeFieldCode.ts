import { Component, Vue } from 'vue-property-decorator';
 
@Component({})
export default class TimeFieldCode extends Vue {
  // date
  menu = false;
  date = '';
  // time
  time = '';
  simpleDate = '';
  menu2 = false;
  modal2 = false;

  setTodayDate() {
    this.simpleDate = this.getDate();
    this.time = this.convertDatetime(this.simpleDate)
  }

  setTodayHour() {
    // formatting hour
    let hParts = new Date().toLocaleTimeString().split(' ')[0].split(':');
    if(hParts[0].length == 1) {
      hParts[0] = '0'+ hParts[0];
    }
    this.time = `${hParts[0]}:${hParts[1]}`;
  }

  // Function of Datetime Formatting
  getDate(datetime?: string) {
    if (datetime) {
      let d = datetime.toString().split(' ')[0].split('-');
      return `${d[2]}/${d[1]}/${d[0]}`;
    } else {
      let d = new Date().toLocaleDateString().split('/');
      return `${d[1]}/${d[0]}/${d[2]}`;
    }
  }

  convertDatetime(time: string) {
    // 06/12/2019 00:00:00 or 06-12-2019 00:00:00
    let splitChar = '-';
    if(time.indexOf('/') != -1) {
      splitChar = '/';
    }
    let d: string[] = time.split(' ')[0].split(splitChar);
    let h = time.split(' ')[1];
    if(h == 'undefined') {
      h = '00:00:00';
    }
    let formated = d[2] + '-' + d[1] + '-' + d[0];
    // console.log(formated)
    return formated;
  }
}

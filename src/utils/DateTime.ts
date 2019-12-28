export default class Datetime {
  convert(date: string, hour?: string) {
    let d = date.split('/');
    let orderDate = d[2] + '-' + d[1] + '-' + d[0];
    let h = (hour == undefined ? '' : hour);
    return orderDate + (h == '' ? '' : ' ' + h);
  }

  now(datetime?: string) {
    if (datetime) {
      return this.getDate(datetime) + ' ' + this.getHour(datetime);
    } else {
      return this.convert(
        new Date().toLocaleDateString(),
        new Date().toLocaleTimeString()
      );
    }
  }

  getDate(datetime?: string | Date | undefined) {
    if (datetime) {
      if (datetime.toString().indexOf('T') != -1) {
        return datetime.toString().split('T')[0];
      } else {
        let d = datetime.toString().split(' ')[0].split('-');
        return `${d[0]}/${d[1]}/${d[2]}`;
      }
    } else {
      return new Date().toLocaleDateString();
    }
  }


  getHour(datetime?: string) { // datetime: 2019-11-26T03:00:00.000Z
    let value = '';
    if (datetime) {
      value = datetime.split('T')[1].split('.')[0];
    } else {
      value = new Date().toLocaleTimeString().split(' ')[0];
    }

    let hParts = value.split(':');
    if(hParts[0].length == 1) {
      hParts[0] = '0'+ hParts[0];
    }

    return `${hParts[0]}:${hParts[1]}:${hParts[2]}`;
  }


  normalize(datetime: string) { // datetime: 2019-11-26T03:00:00.000Z
    console.log('normalize ', datetime)
    let partDate = datetime.split('T')[0].split('-');
    console.log(partDate[2] + '-' + partDate[1] + '-' + partDate[0] + ' ' + this.getHour(datetime))
    return partDate[2] + '-' + partDate[1] + '-' + partDate[0] + ' ' + this.getHour(datetime)
  }


  convertDatetime(time: string | Date) {
    // 06/12/2019 00:00:00 or 06-12-2019 00:00:00
    let splitChar = '-';
    if (time.toString().indexOf('/') != -1) {
      splitChar = '/';
    }
    let d: string[] = time.toString().split(' ')[0].split(splitChar);
    let h = time.toString().split(' ')[1];
    if (h == 'undefined') {
      h = '00:00:00';
    }
    let formated = d[2] + '-' + d[1] + '-' + d[0];
    // console.log(formated)
    return formated;
  }

  getFormattedDate() {
    let dParts = this.convert(this.getDate()).split('-');
    return dParts[0] +'-'+ dParts[2] +'-'+ dParts[1];
  }
}

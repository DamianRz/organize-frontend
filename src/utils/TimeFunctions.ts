export default class Datetime {

  convert(date: string, hour: string) {
    let d = date.split("/");
    let orderDate = d[2] + "-" + d[1] + "-" + d[0];
    let h = hour;
    return orderDate + ' ' + h;
  }

  now() {
    return this.convert(new Date().toLocaleDateString(), new Date().toLocaleTimeString());
  }

  getDate() {
    return new Date().toLocaleDateString();
  }

  getHour() {
    return new Date().toLocaleTimeString();
  }
}

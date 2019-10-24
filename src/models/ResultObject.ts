class ResultObject {
  public statusCode: number;
  public value: any;

  constructor(statusCode: number, value: any) {
    this.statusCode = statusCode;
    this.value = value;
  }

  getJsonObject(): Object {
    return {
      statusCode: this.statusCode,
      value: this.value
    }
  }  
}

export default ResultObject;
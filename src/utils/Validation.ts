export default class Validation {

  private fieldsFail: any = [];

  validateFields(fields: any) {
    this.fieldsFail = [];

    let noErrors = true;
    Object.keys(fields).forEach((field: any) => {
      if (fields[field].value == '' && fields[field].required == true) {
        noErrors = false;
        let fieldError: any = {
          name: field,
          error: 'campo requerido'
        }
        this.fieldsFail.push(fieldError);
      }
    });
    return noErrors;
  }

  get(nameField: string) {
    let errorString = '';
    this.fieldsFail.forEach((field: any) => {
      if (field.name == nameField) {
        errorString = field.error;
      }
    });
    return errorString;
  }
}
export default class Validation {

  private fieldsFail: any = [];

  validateFields(object: any, fieldsArrays: any[]) {
    this.fieldsFail = [];
    let noErrors = true;

    fieldsArrays.forEach((fieldArray: { objectName: string, fields: string[][] }) => {
      fieldArray.fields.forEach((field: string[]) => {
        switch (field[1]) {
          case 'string':
            if (object[field[0]] == '') {
              noErrors = false;
              let fieldError = {
                name: field[0], // field key
                form: fieldArray.objectName, // object name
                error: 'el campo es requerido'
              }
              this.fieldsFail.push(fieldError);
            }
            break;
          case 'number':
            if (Number(object[field[0]]) === NaN) {
              noErrors = false;
              let fieldError = {
                name: field[0],
                form: fieldArray.objectName,
                error: 'el campo solo debe contener numeros'
              }
              this.fieldsFail.push(fieldError);
            }
            break;
        }
      });
    });
    // console.log(this.fieldsFail)
    return noErrors;
  }

  // get the error of the field, if not have errors return ''
  get(route: string) { // 'objectName.field'
    let errorString = '';
    const objectName = route.split('.')[0];
    const fieldName = route.split('.')[1];

    this.fieldsFail.forEach((field: any) => {
      if (field.form == objectName && field.name == fieldName) {
        errorString = field.error;
      }
    });
    return errorString;
  }

  clearFails() {
    this.fieldsFail = [];
  }


  addFail(route: string, message: string) { //route = 'objectName.field'
    let fieldError = {
      name: route.split('.')[1],
      form: route.split('.')[0],
      error: message
    }
    this.fieldsFail.push(fieldError);
  }

  // return object clean
  clearObject(object: any) {
    try {
      Object.keys(object).forEach((key: any) => {
        if (key != 'formName') {
          object[key].value = '';
        }
      })
      return object;
    } catch (error) {
      return object;
    }
  }
}
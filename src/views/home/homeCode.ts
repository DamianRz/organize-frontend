import vue from 'vue';
import Validation from "../../utils/Validation";
import IntegrationBackend from '../../utils/IntegrationBackend';

// Models
// import User from '@/models/usuario';

export default class HomeCode extends vue {

  // Integration Backend
  private backend: IntegrationBackend = new IntegrationBackend();

  // my litte class of validation
  private v: Validation = new Validation();

  private newUser = {
    username: '',
    password: '',
    password2: '',
    email: ''
  };

  // vars used for validation into the user
  // [ field-name, type: string, int ]
  private signInFields: any = {
    objectName: 'newUser',
    fields: [
      ['password', 'string'],
      ['email', 'string'],
    ]
  };
  private signUpFields: any = {
    objectName: 'newUser',
    fields: [
      ['username', 'string'],
      ['password', 'string'],
      ['email', 'string'],
    ]
  };

  // control step visible in the stepper
  private wizard = 1;

  async signUp() {
    if (this.v.validateFields(this.newUser, [this.signUpFields])) {
      if (this.newUser.password == this.newUser.password2) {
        let userData = {
          username: this.newUser.username,
          passwd: this.newUser.password,
        }
        try {
          // Integration Backend POST user send()
          const result: any = await this.backend.send('post:signUp', { user: userData });
          if (result.statusCode == 200) {
            let user = {
              id: result.value.id,
              username: userData.username,
            }
            // save in the store the user data
            this['$store'].commit('userInfo', user)
            // goto Identification page
            this["$router"].push('/Events');
          } else {
            console.error(result);
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        alert('Las contraseñas no coinciden');
      }
    }
  }

  async signIn() {
    if (this.v.validateFields(this.newUser, [this.signInFields])) {
      let userData = {
        email: this.newUser.email,
        password: this.newUser.password,
      }
      try {
        // Integration Backend POST user send()
        const result: any = await this.backend.send('post:signIn', { user: userData });
        if (result.statusCode == 200) {
          let user = {
            id: result.value.id,
            username: result.value.username
          }
          // save in the store the user data
          this['$store'].commit('userInfo', userData)
          // goto Identification page
          this["$router"].push('/Events');
        } else {
          console.error(result);
        }
      } catch (error) {
        alert('El usuario o la contraseña no son correctas');
      }
    }
  }

  private goToStep(index: number) {
    this.v.clearFails();
    this.wizard = index;
  }
}
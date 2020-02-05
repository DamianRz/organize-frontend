import vue from 'vue';
export type VForm = vue & { validate: () => boolean }

export interface IUserSignIn {
  email: string,
  password: string
}

export interface IUserSignUp {
  username: string,
  email: string,
  password: string,
  repeatPassword: string
}

export default class LoginActions extends vue {

  private ON_SIGNIN: string = 'onSignIn';
  private ON_SIGNUP: string = 'onSignUp';

  private disabledButtons: boolean = true;

  private fieldRules: any = [
    (v: string) => (!!v && this.disabledButtons == true) || 'Este campo es requerido!'
  ]
  private passwordRules: any = [
    (v: string) => (v === this.userSignUp.password) || 'Las contraseñas deben coincidir!!'
  ]
  private emailRules: any = [ 
    (v: string) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'El email no es valido!',
    (v: string) => (!!v && this.disabledButtons == true) || 'Este campo es requerido!'
  ]

  private userSignIn: IUserSignIn = {
    email: '',
    password: ''
  }

  private userSignUp: IUserSignUp = {
    username: '',
    email: '',
    password: '',
    repeatPassword: ''
  }

  private signIn() {
    let formSignIn: any = this.$refs[this.ON_SIGNIN]
    if (formSignIn.validate()) {
      this.$emit(this.ON_SIGNIN, this.userSignIn);
    }

  }

  private signUp() {
    let formSignUp: any = this.$refs[this.ON_SIGNUP];
    if (formSignUp.validate()) {
      if (this.userSignUp.password == this.userSignUp.repeatPassword) {
        this.$emit(this.ON_SIGNUP, this.userSignUp);
      } else {

      }
    }
  }
}
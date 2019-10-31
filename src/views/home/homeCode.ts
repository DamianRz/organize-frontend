import { Vue } from 'vue-property-decorator';
import IntegrationBackend from '../../libs/IntegrationBackend';
import ResultObject from '@/models/ResultObject';
export default class HomeCode extends Vue {
  private backend: IntegrationBackend = new IntegrationBackend();

  private signInData: any = {
    email: '',
    password: '',
  }
  private signInErrors = '';

  private signUpData: any = {
    username: '',
    email: '',
    password: ''
  }
  private signUpErrors = '';

  private dialogs: any = {
    signIn: false,
    signUp: false
  }

  async register() {
    // check success input data in register dialog
    const result: any = await this.backend.send('post:signUp', { user: this.signUpData })
    if (result.statusCode == 200) {
      this.dialogs.signUp = false;
      const userData = {
        id: result.value.id,
        token: result.value.token,
        username: this.signUpData.username,
      }
      this.$store.commit('userInfo', userData)
      this["$router"].push('/Events');
    } else {
      this.signUpErrors = 'No debe dejar los campos vacios'
    }
  }

  async login() {
    // check success input data in login dialog
    const result: any = await this.backend.send('post:signIn', { user: this.signInData });
    const userData = {
      id: result.value.id,
      token: result.value.token,
      username: result.value.username,
    }
    this.$store.commit('userInfo', userData);
    this["$router"].push('/Events');
  }
}

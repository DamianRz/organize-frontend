import { Vue } from 'vue-property-decorator';
import IntegrationBackend from '../../utils/IntegrationBackend';
import { IUserSignIn, IUserSignUp } from '../../components/Login'

export class HomeLogic extends Vue {

  private backend: IntegrationBackend = new IntegrationBackend();
  private wizard = 1;

  async signUp(signUpUser: IUserSignUp) {
    let userData = {
      username: signUpUser.username,
      passwd: signUpUser.password,
      email: signUpUser.email
    }
    try {
      const result: any = await this.backend.send('post:signUp', { user: userData });
      if (result.statusCode === 200) {
        let user = {
          id: result.value.id,
          username: userData.username,
        }
        this.$store.commit('userInfo', user)
        this.$router.push('/Events');
      } else {
        console.error(result);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async signIn(signInUser: IUserSignIn) {
    let data = {
      email: signInUser.email,
      passwd: signInUser.password,
    }
    console.log(data)
    try {
      const result: any = await this.backend.send('post:signIn', { user: data });
      if (result.statusCode === 200) {
        let user = {
          id: result.value.id,
          username: result.value.username,
          logged: true
        }
        this.$store.commit('userInfo', user)
        this.$router.push('/Events');
      } else {
        console.error(result);
      }
    } catch (error) {
      console.log(error)
      alert('El usuario o la contraseña no son correctas');
    }
  }
}
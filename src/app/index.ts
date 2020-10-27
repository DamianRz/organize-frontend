
import { Vue } from "vue-property-decorator";

export class AppLogic extends Vue {
    created() {
        this.init();
    }

    init() {
        let user = {
            id: -1,
            username: '',
            logged: false
        }
        // save in the store the user data
        this['$store'].commit('userInfo', user)
        console.log('usuario logeado: ', this.$store.getters.userLogged)
        this.$router.push("/");
    }

    pageRouter(route: string) {
        this.$router.push(route);
    }
}

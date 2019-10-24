
import { Vue } from "vue-property-decorator";

export default class AppCode extends Vue {
    created() {
        this.init();
    }

    init() {
        if (!this.$store.state.userInfo) {
            this.$router.push("/");
        }
    }

    get theme(): object {
        return this.$store.state.theme;
    }

    pageRouter(route: string) {
        this.$router.push(route);
    }
}

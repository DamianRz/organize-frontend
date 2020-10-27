import { Vue } from 'vue-property-decorator';
import MenuItems from './menuItems';

export class LeftMenuLogic extends Vue {
    private search: string = "";
    private MenuItems = new MenuItems();

    get drawer() {
        return this.$store.getters.drawer;
    }
    set drawer(drawer) {
        this.$store.commit("setLeftDrawer", drawer);
    }

    get filteredConf() {
        return this.MenuItems.menu.options.filter((option: any) => {
            return option.name.indexOf(this.search.toLowerCase()) >= 0;
        });
    }

    pageRouter(route: string) {
        this.drawer = false;
        this.$router.push(route);
    }
}

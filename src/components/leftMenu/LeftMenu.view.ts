import MenuItems from './menuItems';
import Component from 'vue-class-component';

Component({})
export default class LeftMenuView extends MenuItems {
    private search: string = "";
    private reservationDialog: boolean = false;

    get drawer() {
        return this.$store.getters.drawer;
    }
    set drawer(drawer) {
        this.$store.commit("setLeftDrawer", drawer);
    }

    get filteredConf() {
        return this.menu.options.filter((option: any) => {
            return option.name.indexOf(this.search.toLowerCase()) >= 0;
        });
    }

    pageRouter(route: string) {
        this.drawer = false;
        this.$router.push(route);
    }
}

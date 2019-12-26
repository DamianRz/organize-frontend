import MenuItems from './menuItems';
import Component from 'vue-class-component';

Component({})
export default class LeftMenuView extends MenuItems {
    private search: string = "";
    private reservationDialog: boolean = false;

    //show and hide the leftsidemenu
    get drawer() {
        return this.$store.getters.drawer;
    }
    set drawer(drawer) {
        this.$store.commit("setLeftDrawer", drawer);
    }

    //find the option by search menu
    get filteredConf() {
        return this.menu.options.filter((option: any) => {
            return option.name.indexOf(this.search.toLowerCase()) >= 0;
        });
    }

    //go to the route
    pageRouter(route: string) {
        console.log(route)
        this.$router.push(route);
    }
}

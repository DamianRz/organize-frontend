import Vue from "vue";

export default class MenuItems extends Vue {

  private menu: any = {
    options: [
      { name: "Eventos", icon: "", href: "/#services", route: "", toolbar: true },
      { name: "Cuestionarios", icon: "", href: "/#cources", route: "", toolbar: true },
      { name: "Buscar", icon: "", href: "/#contact", route: "", toolbar: true }
    ]
  };

  //go to the route
  public pageRouter(route: string) {
    if (route != "") {
      this["$router"].push(route);

    }
  }

  //find the option by search menu
  get filteredConf() {
    return this.menu.options;
  }
}

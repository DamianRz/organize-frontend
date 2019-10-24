import { Vue } from 'vue-property-decorator';
import IntegrationBackend from './IntegrationBackend';

export default class HomeCode extends Vue {
  private integrationBackend = new IntegrationBackend();
  private headers: any[] = [
    {
      text: "Nombre",
      align: "left",
      sortable: false,
      value: "name",
    },
    { text: "Fecha de comienzo", value: "calories" },
    { text: "Fat (g)", value: "fat" },
    { text: "Carbs (g)", value: "carbs" },
    { text: "Protein (g)", value: "protein" },
    { text: "Iron (%)", value: "iron" }
  ];

  private event: string = "sfdsafdsfdsfds";

  private events: any[] = [
    {
      name: "Frozen Yogurt",
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
      iron: "1%",
    }
  ];

  private async getEvents() { 
    let response = await IntegrationBackend.get(1);
    console.log(response)
  }
}

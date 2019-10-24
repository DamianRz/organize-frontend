import { Vue } from 'vue-property-decorator';
export default class HomeCode extends Vue {
  private headers: any[] = [
    {
      text: "Dessert (100g serving)",
      align: "left",
      sortable: false,
      value: "name",
    },
    { text: "Calories", value: "calories" },
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
}

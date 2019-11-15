import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class DateFieldCode extends Vue {
  private dialog = false;
  private dialog1 = false;
  private dateToSend = '';
  private field = {
    value: '',
    label: '',
    icon: '',
    date: '',
  }
  private sendDate() {
    this.dialog = false;
    // this.$emit('eventName','value');
    console.log(this.dateToSend)
  }
}

import { Component, Prop, Vue } from 'vue-property-decorator';
import MenuItems from '../menuItems';

@Component({})
export default class ToolbarCode extends MenuItems {
  private reservationDialog: boolean = false;
}
import { Vue } from 'vue-property-decorator';

export default class XComponent extends Vue {
  protected loading: any = { table: false, request: false };
  
  protected dialogs: any = {
    add: false, 
    save: false, 
    delete: false, 
    login: false, 
    register: false,
    imgSettings: false
  };

  protected wizard: number = 1;
  protected errors: any = { wizard: false };
  protected tableConf: any = {
    headers: [],
    search: {
      show: true,
      text: ''
    }
  };

  protected  icons: any = {
    instagram: "https://image.flaticon.com/icons/png/512/87/87390.png",
    facebook: "https://image.flaticon.com/icons/png/512/33/33702.png"
  }

  // translate(text: string) {
  //   return this["$i18n"].t(text);
  // }
}
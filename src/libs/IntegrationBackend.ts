import { Vue } from "vue-property-decorator";

export default class IntegrationBackend extends Vue {
  
  async send(event: string, json: any) {
    return new Promise((resolve, reject) => {
      this.$socket.client.emit(event, json);
      this.$socket.$subscribe(event, (data: any) => {
        if (data) {
          return resolve(data);
        }
      });
    }).catch((err: any) => {
      return err;
    });
  }
}
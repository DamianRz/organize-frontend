import { Vue } from "vue-property-decorator";

export default class IntegrationBackend extends Vue {

  async send(event: string, json: any) {
    // console.log(event,json)
    return await new Promise((resolve, reject) => {
      this.$socket.client.emit(event, json);
      this.$socket.client.addEventListener(event, (data: any) => {
        return resolve(data);
      });
    });
  }
}
import { Vue } from "vue-property-decorator";

export default class IntegrationBackend extends Vue {

  async send(event: string, json: any) {
    return await new Promise((resolve, reject) => {
      this.$socket.client.emit(event, json);
      this.$socket.client.addEventListener(event, (data: {value: any, statusCode: number}) => {
        return resolve(data);
      });
    });
  }
}
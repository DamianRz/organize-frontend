// import Axios from 'axios';
// let axios = Axios.create({
//   baseURL: 'http://localhost:8092/api/join/events',
//   headers: { 'content-type': 'application/json' }
// });

export default class IntegrationBackend {

  async fetchAction(method: string) {

  }

  static async get(idUser: number) {
    // try {
    //   let joinEvent = {
    //     idUser: idUser,
    //       idType: 1
    //   };

    //   let response = await axios.get('', { params: joinEvent });

    //   return {
    //     docs: response.data,
    //     total: response.data.length
    //   }
    // } catch (error) {
    //   throw error.response;
    // }
  }

  async add(idUser: number) {
    // try {
    //   let data = { 'idUser': idUser, 'event': this };
    //   let response: any = await axios.post('', data);
    //   // this.id = response.data.id;
    // } catch (error) {
    //   throw error;
    // }
  }

  async save() {
    // try {
    //   let data = { 'event': this };
    //   console.log('///////////');
    //   console.log(data);
    //   console.log('///////////');

    //   let response = null; // await axios.put('/' + this.id, data);
    //   // this.id = response.data.id;
    //   return response;
    // } catch (error) {
    //   throw error.response;
    // }
  }

  async remove() {
    // try {
    //   let response = null; // await axios.delete('/' + this.id);
    //   return response;
    // } catch (error) {
    //   throw error.response;
    // }
  }
}
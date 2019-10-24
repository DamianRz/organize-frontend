import { Vue } from "vue-property-decorator";
import PageData from '../../../data/PageData';
import reservationObject from "./ReservationDialogCode";
import { resolve } from "path";
import { reject } from "q";

const reservationUrlBase = "http://localhost:8082/reserve";

let request = new Request(reservationUrlBase, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
         }
    }
)
//const data;
export default class IntegrationReserves {
    
   /* <param> GET ALL RESERVES from Backend.
    * #Este metodo trae todas las reservas del backend.
    * #No importa el barbero, trae las que tenga registradas en la BD.
    * #Se Requieren algunos de los atributos como Dia, hora, cliente, barbero, para pintar en un Calendario
    * #y poder ver cuantas reservas mensuales se va obteniendo. 
    */      
    public async getReserves(){
            const response: any = await fetch(reservationUrlBase, request)
            return response.json();        
        
    }
}//end class    

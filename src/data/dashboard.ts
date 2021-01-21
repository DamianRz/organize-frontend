import { HEADER } from "../components/custom-table/table.type";

export const services = [
    "Cortes para Caballeros",
    "Cortes para Damas",
    "Servicio de Cafetería",
    "Productos",
];

export const courses = ["Intensivo", "Colorimetría", "Avanzado"];

export const headerOrder: HEADER[] = [
    { text: "ID", value: "reserveId" },
    { text: "N°Social", value: "socialNumber" },
    { text: "Cliente", value: "nameClient" },
    { text: "Fecha", value: "startTimeFront" },
    { text: "Barbero", value: "barberName" },
    { text: "Servicio", value: "workToDo" },
    { text: "", value: "actions" }
];

export const headerMobileOrder: HEADER[] = [
    { text: "N°Social", value: "socialNumber" },
    { text: "Cliente", value: "nameClient" },
    { text: "Fecha", value: "startTimeFront" },
    { text: "", value: "actions" }
];
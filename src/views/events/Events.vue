
<template>
  <div id="events">

    <v-btn @click="showEventDialog()" color="green" dark right absolute small fab>+</v-btn>
    <h1 class="font-title">Mis Eventos</h1>

    <v-data-table
      v-model="selectedEvent"
      :headers="headers"
      :items="eventList.getArray()"
      :items-per-page="5"
      single-select
      item-key="_name"
      show-select
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <tr @click="selectEvent(props.item)">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item._name }}</td>
        </tr>
      </template>
      <v-alert
        slot="no-results"
        :value="true"
        color="error"
        icon="warning"
      >Your search for found no results.</v-alert>
    </v-data-table>

    <v-dialog v-model="dialogs.events" width="500">
      <v-card class="event-dialog">
        <v-card-title></v-card-title>
        <v-card-text>
          <v-stepper v-model="wizard">
            <v-stepper-items>
              <!-- Events  -->
              <v-stepper-content step="1">
                <h2 class="font-title">Crear nuevo evento</h2>
                
                <div class="info-box">
                  <v-text-field label="Nombre"></v-text-field>
                  <v-text-field label="Lugar"></v-text-field>
                  <v-text-field label="Inicio"></v-text-field>
                  <v-text-field label="Final"></v-text-field>
                  <v-text-field label="Descripcion"></v-text-field>
                  <v-text-field label="Maximo de invitados"></v-text-field>
                </div>
                
                <div class="q-box">
                  <v-btn @click="wizard = 2" color="green" absolute right dark small fab>+</v-btn>
                  <p>Cuestionarios asignados</p>
                  
                  <v-data-table
                    v-model="selectedQ"
                    :headers="headersQ"
                    :items="qList.getArray()"
                    :items-per-page="5"
                    single-select
                    item-key="_id"
                    show-select
                    class="elevation-1"
                  ></v-data-table>
                  
                </div>
              </v-stepper-content>
              <!-- Questionnaires  -->
              <v-stepper-content step="2">
                <h2 class="font-title">Crear cuestionarios</h2>
                <div class="q-box">
                   <v-text-field label="Nombre"></v-text-field>
                  <v-text-field label="Categoria"></v-text-field>
                </div>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- <v-card-title>Evento</v-card-title>
        <v-card-text>
          <div class="q-box">
            <v-btn @click="showDialog()" color="green" absolute right dark small fab>+</v-btn>
            <p>Cuestionarios asignados</p>
            <v-data-table
              v-model="selectedQ"
              :headers="headersQ"
              :items="qList.getArray()"
              :items-per-page="5"
              single-select
              item-key="_id"
              show-select
              class="elevation-1"
            ></v-data-table>
          </div>
          <div class="guests-box"></div>
    </v-card-text>-->
  </div>
</template>
 
<script lang='ts'>
import EventsCode from "./EventsCode";
import "../../styles/fonts.scss";
import "./EventsStyle.scss";
import CustomTable from "../../components/CustomTable.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    CustomTable
  }
})
export default class EventsPage extends EventsCode {
  created() {
    this.init();
  }
}
</script>
<template>
  <div id="events">
    <v-btn @click="showEventDialog()" depressed small fab color="green" dark right absolute>
      <v-icon>add</v-icon>
    </v-btn>

    <div class="content-info">
      <h2 class="font-title">Mis Eventos</h2>
      <!-- <p>Todos tus eventos aqui</p> -->
    </div>

    <div class="search-box">
      <div class="select">
        <v-select
          v-model="search.filter"
          label="Buscar por"
          :items="Object.keys(searchFilters)"
          item-value="text"
          defa
        ></v-select>
      </div>
      <div class="field">
        <v-text-field
          v-model="search.value"
          append-icon="search"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
      </div>
    </div>



    <div class="tables-box">
      <div class="event-table-box">
        <div class="event-container">
          <div class="events-box">
            <div class="event" v-for="(item,index) in filterItems()" :key="index">
              <p class="name font-text">{{ item.name }}</p>
              <p
                class="date"
              >{{ datetime.convert(datetime.getDate(item.startDate)) +' '+ item.startHour }}</p>

              <v-icon class="icon-event">event</v-icon>
              <v-btn small fab depressed class="icon-edit">
                <v-icon @click="editEvent(item)" color="green">edit</v-icon>
              </v-btn>
              <v-btn small fab depressed class="icon-delete">
                <v-icon @click="dialogs.deleteEvent = true" color="red">delete</v-icon>
              </v-btn>
            </div>

            <p
              class="message-table"
              v-if="search.value != '' && filterItems().length == 0"
            >No se encontraron resultados</p>
            <p
              class="message-table"
              v-else-if="search.value == '' && filterItems().length == 0"
            >No tiene eventos creados</p>
          </div>
        </div>

        <!-- {{ newEvent }} -->
        <!-- <v-data-table
        dense
          :v-model="events"
          :headers="headers"
          :items="events"
          :items-per-page="500"
          single-select
          item-key="name"
          hide-default-header
          class="elevation-0"
          hide-default-footer
        >
         

          <template v-slot:item.action="{ item }">
            <v-icon class="mr-3" @click="editEvent(item)">edit</v-icon>
            <v-icon @click="dialogs.deleteEvent = true">delete</v-icon>
            <v-snackbar v-model="dialogs.deleteEvent" vertical>
              Esta seguro de borrar el evento seleccionado?
              <v-btn text @click="dialogs.deleteEvent = false">Cancelar</v-btn>
              <v-btn color="red" text @click="deleteEvent(item)">Borrar</v-btn>
            </v-snackbar>
          </template>
        </v-data-table>-->
      </div>
      <!-- <div class="map-box"></div> -->
    </div>

    <!-- New Event Dialog  -->
    <v-dialog v-model="dialogs.events" :fullscreen="$vuetify.breakpoint.name == 'xs'" persistent>
      <v-card class="event-dialog">
        <v-card-title></v-card-title>
        <v-card-text>
          <v-stepper v-model="wizard">
            <v-btn @click="closeDialog()" text fab small>X</v-btn>
            <v-stepper-items>
              <!-- STEP 1 Events -->
              <v-stepper-content step="1">
                <h2
                  class="font-title"
                >{{ interactionsMode.events ? 'Editar evento' : 'Crear nuevo evento' }}</h2>
                <div class="step1-box">
                  <div class="info-box">
                    <v-text-field
                      v-model="newEvent.name"
                      :error="v.get('newEvent.name') != ''"
                      :error-messages="v.get('newEvent.name')"
                      label="Nombre"
                    ></v-text-field>

                    <v-text-field
                      v-model="newEvent.location"
                      :error="v.get('newEvent.location') != ''"
                      :error-messages="v.get('newEvent.location')"
                      label="Lugar"
                    ></v-text-field>

                    <!-- TimeFields -->

                    <time-field
                      v-model="newEvent.startDate"
                      :min="getActualDate()"
                      type="date"
                      :error="v.get('newEvent.startDate') != ''"
                      :errorMessage="v.get('newEvent.startDate')"
                      label="Fecha de inicio"
                      lang="es"
                    ></time-field>

                    <TimeField
                      v-model="newEvent.endDate"
                      type="date"
                      :min="newEvent.startDate"
                      :error="v.get('newEvent.endDate') != ''"
                      :errorMessage="v.get('newEvent.endDate')"
                      label="Fecha de finalizacion"
                      lang="es"
                    ></TimeField>

                    <time-field
                      type="hour"
                      v-model="newEvent.startHour"
                      :min="newEvent.startHour"
                      :error="v.get('newEvent.startHour') != ''"
                      :errorMessage="v.get('newEvent.startHour')"
                      label="Hora de inicio"
                      lang="es"
                    ></time-field>

                    <time-field
                      type="hour"
                      v-model="newEvent.endHour"
                      :min="newEvent.endHour"
                      :error="v.get('newEvent.endHour') != ''"
                      :errorMessage="v.get('newEvent.endHour')"
                      label="Hora de finalizacion"
                      lang="es"
                    ></time-field>

                    <v-text-field
                      v-model="newEvent.description"
                      :error="v.get('newEvent.description') != ''"
                      :error-messages="v.get('newEvent.description')"
                      label="Descripcion"
                    ></v-text-field>

                    <v-text-field
                      v-model="newEvent.guestsNumber"
                      :error="v.get('newEvent.guestsNumber') != ''"
                      :error-messages="v.get('newEvent.guestsNumber')"
                      label="Maximo de invitados"
                    ></v-text-field>
                  </div>

                  <div class="tables">
                    <div class="questionnaire-table-box">
                      <h3 class="font-title">Mis cuestionarios</h3>
                      <v-data-table
                        :v-model="questionnaires"
                        :headers="headersQ"
                        :items="questionnaires"
                        :items-per-page="5"
                        single-select
                        item-key="name"
                        show-select
                        class="elevation-0"
                      >
                        <template v-slot:item.action="{ item }">
                          <v-icon class="mr-3" color="green" @click="includeQuestionnaire(item)">add</v-icon>
                        </template>
                      </v-data-table>
                    </div>
                    <div class="questionnaire-table-box">
                      <h3 class="font-title">Cuestionarios asignados</h3>
                      <v-data-table
                        :v-model="questionnairesOfEvent"
                        :headers="headersQ"
                        :items="questionnairesOfEvent"
                        :items-per-page="5"
                        single-select
                        item-key="name"
                        show-select
                        class="elevation-0"
                      >
                        <template v-slot:item.action="{ item }">
                          <v-icon class="mr-3" color="red" @click="removeQuestionnaire(item)">remove</v-icon>
                        </template>
                      </v-data-table>
                    </div>
                  </div>
                </div>
              </v-stepper-content>
            </v-stepper-items>

            <!-- footer -->
            <div class="footer-dialog">
              <v-btn
                v-if="interactionsMode.events == 0"
                text
                small
                class="footer-button"
                @click.native="addEvent()"
              >Crear evento</v-btn>

              <v-btn
                v-if="interactionsMode.events == 1"
                text
                small
                class="footer-button"
                @click.native="saveEvent()"
              >Guardar cambios</v-btn>

              <v-btn text small class="footer-button" @click.native="closeDialog()">cancelar</v-btn>
            </div>
          </v-stepper>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
 
<script lang='ts'>
import EventView from "./Event.view";
import "../../styles/fonts.scss";
import "./Event.scss";
// import CustomTable from "../../components/CustomTable.vue";
import { Component, Vue } from "vue-property-decorator";
import TimeField from "../../components/TimeField/TimeField.vue";

@Component({
  components: {
    // CustomTable,
    TimeField
  }
})
export default class EventsPage extends EventView {
  created() {
    this.init();
  }
}
</script>
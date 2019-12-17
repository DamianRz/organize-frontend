
<template>
  <div id="events">
    <h2 class="font-title">Mis Eventos</h2>

    <div class="tables-box">
      <div class="event-table-box">
        <v-data-table
          :v-model="events.getArray()"
          :headers="headers"
          :items="events.getArray()"
          :items-per-page="500"
          single-select
          item-key="name"
          show-select
          class="elevation-0"
          hide-default-footer
        >
          <template v-slot:top>
            <v-btn @click="showEventDialog()" color="green" dark right absolute small fab>+</v-btn>
          </template>

          <template v-slot:item.action="{ item }">
            <v-icon class="mr-3" @click="editEvent(item)">edit</v-icon>
            <v-icon @click="dialogs.deleteEvent = true">delete</v-icon>
            <v-snackbar v-model="dialogs.deleteEvent" vertical>
              Esta seguro de borrar el evento seleccionado?
              <v-btn text @click="dialogs.deleteEvent = false">Cancelar</v-btn>
              <v-btn color="red" text @click="deleteEvent(item)">Borrar</v-btn>
            </v-snackbar>
          </template>
        </v-data-table>
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


                    {{ 'start date test '+ test }}
                    <time-field
                      v-model="test"
                      type="date"
                      :error="v.get('newEvent.start') != ''"
                      :errorMessage="v.get('newEvent.start')"
                      label="Fecha de inicio"
                      lang="es"
                    ></time-field>

                    <time-field
                      type="hour"
                      :v-model="newEvent.startHour"
                      @time="(time)=> { newEvent.startHour = time }"
                      :min="datetime.getHour()"
                      :error="v.get('newEvent.startHour') != ''"
                      :errorMessage="v.get('newEvent.startHour')"
                      label="Hora inicio"
                      lang="es"
                    ></time-field>

                    <time-field
                      type="date"
                      :v-model="newEvent.end"
                      @time="(time)=> { newEvent.end = time }"
                      :min="newEvent.start"
                      :error="v.get('newEvent.end') != ''"
                      :errorMessage="v.get('newEvent.end')"
                      label="Fecha fin"
                      lang="es"
                    ></time-field>

                    <time-field
                      type="hour"
                      :v-model="newEvent.endHour"
                      @time="(time)=> { newEvent.endHour = time }"
                      :min="newEvent.startHour"
                      :error="v.get('newEvent.endHour') != ''"
                      :errorMessage="v.get('newEvent.endHour')"
                      label="Hora fin"
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
                        :v-model="questionnaires.getArray()"
                        :headers="headersQ"
                        :items="questionnaires.getArray()"
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
                        :v-model="questionnairesOfEvent.getArray()"
                        :headers="headersQ"
                        :items="questionnairesOfEvent.getArray()"
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
                @click.native="createEvent()"
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
import CustomTable from "../../components/CustomTable.vue";
import { Component, Vue } from "vue-property-decorator";
import TimeField from "../../components/TimeField/TimeField.vue";

@Component({
  components: {
    CustomTable,
    TimeField
  }
})
export default class EventsPage extends EventView {
  created() {
    this.init();
  }
}
</script>

<template>
  <div id="events">
    <h1 class="font-title">Mis Eventos</h1>

    <div class="tables-box">
      <div class="event-table-box">
        <v-data-table
          :v-model="events.getArray()"
          :headers="headers"
          :items="events.getArray()"
          :items-per-page="5"
          single-select
          item-key="name"
          show-select
          class="elevation-1"
        >
          <template v-slot:top>
            <v-btn @click="showEventDialog()" color="green" dark right absolute small fab>+</v-btn>
          </template>

          <template v-slot:item.action="{ item }">
            <v-icon class="mr-3" @click="editEvent(item)">edit</v-icon>
            <v-icon @click="dialogs.deleteEvent.show = true">delete</v-icon>
            <v-snackbar v-model="dialogs.deleteEvent.show" vertical>
              Esta seguro de borrar el evento seleccionado?
              <v-btn text @click="dialogs.deleteEvent.show = false">Cancelar</v-btn>
              <v-btn color="red" text @click="deleteEvent(item)">Borrar</v-btn>
            </v-snackbar>
          </template>
        </v-data-table>
      </div>

      <div class="map-box"></div>
    </div>

    <!-- New Event Dialog  -->
    <v-dialog
      v-model="dialogs.events.show"
      :fullscreen="$vuetify.breakpoint.name == 'xs'"
      persistent
    >
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
                >{{ dialogs.events.mode ? 'Editar evento' : 'Crear nuevo evento' }}</h2>
                <div class="step1-box">
                  <div class="info-box">
                    <v-text-field
                      v-model="newEventData._name.value"
                      :error="v.get('newEventData._name') != ''"
                      :error-messages="v.get('newEventData._name')"
                      label="Nombre"
                    ></v-text-field>
                    <v-text-field
                      v-model="newEventData._location.value"
                      :error="v.get('newEventData._location') != ''"
                      :error-messages="v.get('newEventData._location')"
                      label="Lugar"
                    ></v-text-field>

                    <date-field :v-model="datexd" ></date-field>

                    <v-text-field
                      v-model="newEventData._start.value"
                      :error="v.get('newEventData._start') != ''"
                      :error-messages="v.get('newEventData._start')"
                      label="Inicio"
                    ></v-text-field>
                    <v-text-field
                      v-model="newEventData._end.value"
                      :error="v.get('newEventData._end') != ''"
                      :error-messages="v.get('newEventData._end')"
                      label="Final"
                    ></v-text-field>
                    
                    <v-text-field
                      v-model="newEventData._description.value"
                      :error="v.get('newEventData._description') != ''"
                      :error-messages="v.get('newEventData._description')"
                      label="Descripcion"
                    ></v-text-field>
                    <v-text-field
                      v-model="newEventData._guestsNumber.value"
                      :error="v.get('newEventData._guestsNumber') != ''"
                      :error-messages="v.get('newEventData._guestsNumber')"
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
                v-if="dialogs.events.mode == 0"
                text
                small
                class="footer-button"
                @click.native="createEvent()"
              >Crear evento</v-btn>

              <v-btn
                v-if="dialogs.events.mode == 1"
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
import EventsCode from "./EventsCode";
import "../../styles/fonts.scss";
import "./EventsStyle.scss";
import CustomTable from "../../components/CustomTable.vue";
import { Component, Vue } from "vue-property-decorator";
import DateField from '../../components/dialogs/DateField/DateField.vue';

@Component({
  components: {
    CustomTable,
    DateField
  }
})
export default class EventsPage extends EventsCode {
  created() {
    this.init();
  }
}
</script>
<template>
  <div id="events">
    <v-btn @click="showNewEvent()" depressed small fab color="green" dark right absolute>
      <v-icon>add</v-icon>
    </v-btn>

    <div class="content-info">
      <h2 class="font-title">Mis Eventos</h2>
    </div>

    <div class="search-box">
      <div class="select">
        <v-select
          v-model="search.filter"
          label="Filtrar por"
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
              <p>{{ item.name }}</p>
              <p
                class="date"
              >{{ datetime.convert(datetime.getDate(item.startDate)) +' '+ item.startHour }}</p>

              <!-- :color="getColorByStatus()" -->
              <v-icon class="icon-event">event</v-icon>
              <p class="status">{{ item.status ? 'Activo' : 'no activo' }}</p>

              <div class="settings-box">
                <v-btn small fab depressed text class="icon-edit">
                  <v-icon @click="editEvent(item)" color="green">edit</v-icon>
                </v-btn>
                <v-btn small fab depressed text class="icon-edit">
                  <v-icon @click="editQuestionnairesOfEvent(item)" color="green">list</v-icon>
                </v-btn>
              </div>
              <v-btn small fab depressed text class="icon-delete">
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

    <v-dialog v-model="dialogs.events" fullscreen persistent>
      <div class="event-dialog">
        <v-btn @click="closeDialog()" class="closeDialog" depressed fab text color="red" small>X</v-btn>
        <h2
          class="font-title title-dialog"
        >{{ interactionsMode.events ? 'Editar evento' : 'Crear nuevo evento' }}</h2>
        <div class="fields-box">
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
        </div>
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
      </div>
    </v-dialog>

    <v-dialog v-model="dialogs.eventsQuestionnaires" fullscreen persistent>
      <div class="event-dialog">
        <v-btn
          @click="dialogs.eventsQuestionnaires = false"
          class="closeDialog"
          depressed
          fab
          text
          color="red"
          small
        >X</v-btn>
        <p class="font-title">Mis Cuestionarios</p>
        <div class="fields-box">
          <div class="questionnaires-box">
            <div class="questionnaire" v-for="(item,index) in questionnaires" :key="index">
              <p class="name">{{ item.name }}</p>
              <p class="category">{{ item.category }}</p>
              <v-btn
                @click="includeQuestionnaire(item)"
                dark
                class="add-btn"
                color="green"
                small
                depressed
                fab
              >
                <v-icon>keyboard_arrow_down</v-icon>
              </v-btn>
            </div>
            <p
              class="message-table"
              v-if="questionnaires.length == 0"
            >No se tiene cuestionarios creados</p>
          </div>
        </div>
        <p class="font-title">Cuestionarios Asignados</p>
        <div class="fields-box">
          <div class="questionnaires-box">
            <div class="questionnaire" v-for="(item,index) in questionnairesOfEvent" :key="index">
              <p class="name">{{ item.name }}</p>
              <p class="category">{{ item.category }}</p>
              <v-btn
                @click="removeQuestionnaire(item)"
                dark
                class="add-btn"
                color="red"
                small
                depressed
                fab
              >
                <v-icon>keyboard_arrow_up</v-icon>
              </v-btn>
            </div>
            <p
              class="message-table"
              v-if="questionnairesOfEvent.length == 0"
            >No hay cuestionarios asignados</p>
          </div>
        </div>
        <div class="footer-dialog">
          <v-btn text small class="footer-button" @click.native="saveEvent()">Guardar Cambios</v-btn>
          <v-btn
            text
            small
            class="footer-button"
            @click.native="dialogs.eventsQuestionnaires = false"
          >volver</v-btn>
        </div>
      </div>
    </v-dialog>
  </div>
</template>
 
<script lang='ts'>
import EventView from "./Event.view";
import "../../styles/fonts.scss";
import "./Event.scss";
import { Component, Vue } from "vue-property-decorator";
import TimeField from "../../components/TimeField/TimeField.vue";

@Component({
  components: {
    TimeField
  }
})
export default class EventsPage extends EventView {
  created() {
    this.init();
  }
}
</script>
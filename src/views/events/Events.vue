
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
      <template v-slot:item.action="{ item }">
        <v-icon class="mr-3" @click="editItem(item)">edit</v-icon>
        <v-icon @click="deleteItem(item)">delete</v-icon>
      </template>
    </v-data-table>

    <!-- New Event Dialog  -->
    <v-dialog v-model="dialogs.events" width="500" persistent>
      <v-card class="event-dialog">
        <v-card-title></v-card-title>
        <v-card-text>
          <v-stepper v-model="wizard">
            <v-btn @click="closeDialog()" text fab small>X {{ wizard }}</v-btn>
            <v-stepper-items>
              <!-- STEP 1 Events  -->
              <v-stepper-content step="1">
                <h2 class="font-title">Crear nuevo evento</h2>
                <div class="info-box">
                  <v-text-field v-model="newEvent.name" label="Nombre"></v-text-field>
                  <v-text-field v-model="newEvent.location" label="Lugar"></v-text-field>
                  <v-text-field v-model="newEvent.start" label="Inicio"></v-text-field>
                  <v-text-field v-model="newEvent.end" label="Final"></v-text-field>
                  <v-text-field v-model="newEvent.descripcion" label="Descripcion"></v-text-field>
                  <v-text-field v-model="newEvent.guestsNumber" label="Maximo de invitados"></v-text-field>
                </div>
              </v-stepper-content>

              <!-- STEP 2 Questionnaires  -->
              <v-stepper-content step="2">
                <div class="q-box">
                  <v-btn @click="includeQuestionnaire()" color="green" absolute right dark small fab>+</v-btn>
                  <p>Cuestionarios asignados</p>
                  <v-data-table
                    :v-model="newQuestionnaires.getArray()"
                    :headers="headersQ"
                    :items="newQuestionnaires.getArray()"
                    :items-per-page="5"
                    single-select
                    item-key="_id"
                    show-select
                    class="elevation-1"
                  ></v-data-table>
                </div>
              </v-stepper-content>

              <!-- STEP 3 Add/Edit - Questionnaires  -->
              <v-stepper-content step="3">
                <h2 class="font-title">Nuevo Cuestionario</h2>
                <div class="info-box">
                  <v-text-field
                    v-model="newQuestionnaire.name.value"
                    :error="v.get('name') != ''"
                    :error-messages="v.get('name')"
                    label="Nombre"
                  ></v-text-field>
                  <v-text-field
                    v-model="newQuestionnaire.category.value"
                    :error="v.get('category') != ''"
                    :error-messages="v.get('category')"
                    label="Categoria"
                  ></v-text-field>
                </div>
                <div class="q-box">
                  <v-btn @click="includeQuestion()" color="green" absolute right dark small fab>+</v-btn>
                  <p>Preguntas asignadas</p>

                  <v-data-table
                    :v-model="newQuestions.getArray()"
                    :headers="headersQuestion"
                    :items="newQuestions.getArray()"
                    :items-per-page="5"
                    single-select
                    item-key="name"
                    show-select
                    class="elevation-1"
                  ></v-data-table>
                </div>

                <!-- footer -->
                <div class="footer-dialog">
                  <v-btn
                    text
                    small
                    class="footer-button"
                    @click.native="addNewQuestionnaire()"
                  >Guardar</v-btn>
                  <v-btn text small class="footer-button" @click.native="wizard = 2">cancelar</v-btn>
                </div>
              </v-stepper-content>

              <!-- STEP 4 Add/Edit - Questions  -->
              <v-stepper-content step="4">
                <h2 class="font-title">Nueva Pregunta</h2>
                <div class="info-box">
                  <v-text-field
                    v-model="newQuestion.name.value"
                    :error="v.get('name') != ''"
                    :error-messages="v.get('name')"
                    label="Nombre"
                  ></v-text-field>
                  <v-text-field
                    v-model="newQuestion.category.value"
                    :error="v.get('category') != ''"
                    :error-messages="v.get('category')"
                    label="Categoria"
                  ></v-text-field>
                </div>
                <div class="q-box">
                  <v-btn @click="includeOption()" color="green" absolute right dark small fab>+</v-btn>
                  <p>Opciones asignadas</p>

                  <v-data-table
                    :v-model="newOptions.getArray()"
                    :headers="headersOption"
                    :items="newOptions.getArray()"
                    :items-per-page="5"
                    single-select
                    item-key="_name"
                    show-select
                    class="elevation-1"
                  ></v-data-table>
                </div>

                <!-- footer -->
                <div class="footer-dialog">
                  <v-btn text small class="footer-button" @click.native="addNewQuestion()">Guardar</v-btn>
                  <v-btn text small class="footer-button" @click.native="wizard = 3">cancelar</v-btn>
                </div>
              </v-stepper-content>

              <!-- STEP 5 Add/Edit - Option -->
              <v-stepper-content step="5">
                <h2 class="font-title">Nueva Opcion</h2>
                <div class="info-box">
                  <v-text-field
                    v-model="newOption.name.value"
                    :error="v.get('name') != ''"
                    :error-messages="v.get('name')"
                    label="Nombre"
                  ></v-text-field>
                  <v-text-field
                    v-model="newOption.cost.value"
                    :error="v.get('cost') != ''"
                    :error-messages="v.get('cost')"
                    label="Costo"
                  ></v-text-field>
                </div>
                <!-- custom footer of step 5 -->
                <div class="footer-dialog">
                  <v-btn text small class="footer-button" @click.native="addNewOption()">Guardar</v-btn>
                  <v-btn text small class="footer-button" @click.native="wizard = 4">cancelar</v-btn>
                </div>
              </v-stepper-content>
            </v-stepper-items>

            <!-- footer -->
            <div class="footer-dialog" v-if="wizard < 3">
              <v-btn
                v-if="wizard == 2"
                text
                small
                class="footer-button"
                @click.native="createEvent()"
              >Crear Evento</v-btn>

              <v-btn
                v-if="wizard != 2"
                text
                small
                class="footer-button"
                @click.native="wizard += 1"
              >siguiente</v-btn>

              <v-btn
                v-if="wizard > 1"
                text
                small
                class="footer-button"
                @click.native="wizard -= 1"
              >volver</v-btn>
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
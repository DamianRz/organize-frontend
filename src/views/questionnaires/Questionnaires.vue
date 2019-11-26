
<template>
  <div id="events">
    <h1 class="font-title">Mis Cuestionarios</h1> 

    <div class="tables-box">
      <div class="event-table-box">
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
          <template v-slot:top>
            <v-btn @click="showQuestionnaireDialog()" color="green" dark right absolute small fab>+</v-btn>
          </template>

          <template v-slot:item.action="{ item }">
            <v-icon class="mr-3" @click="editQuestionnaire(item)">edit</v-icon>
            <v-icon @click="dialogs.deleteQuestionnaire = true">delete</v-icon>
            <v-snackbar v-model="dialogs.deleteQuestionnaire" vertical>
              Esta seguro de borrar el cuestionario seleccionado?
              <v-btn text @click="dialogs.deleteQuestionnaire = false">Cancelar</v-btn>
              <v-btn color="red" text @click="deleteQuestionnaire(item)">Borrar</v-btn>
            </v-snackbar>
          </template>
        </v-data-table>
      </div>
    </div>

    <!-- New Questionnaire Dialog -->
    <v-dialog
      v-model="dialogs.questionnaires"
      :fullscreen="$vuetify.breakpoint.name == 'xs'"
      persistent
    >
      <v-card class="event-dialog">
        <v-card-title></v-card-title>
        <v-card-text>
          <v-stepper v-model="wizard">
            <v-btn @click="closeDialog()" text fab small>X</v-btn>
            <v-stepper-items>
              <!-- STEP 1 Questionnaires -->
              <v-stepper-content step="1">
                <h2
                  class="font-title"
                >{{ interactionsMode.questionnaires ? 'Editar cuestionario' : 'Crear nuevo cuestionario' }}</h2>
                <div class="step1-box">
                  <div class="info-box">
                    <v-text-field
                      v-model="newQuestionnaire.name"
                      :error="v.get('newQuestionnaire.name') != ''"
                      :error-messages="v.get('newQuestionnaire.name')"
                      label="Nombre"
                    ></v-text-field>
                    <v-text-field
                      v-model="newQuestionnaire.category"
                      :error="v.get('newQuestionnaire.category') != ''"
                      :error-messages="v.get('newQuestionnaire.category')"
                      label="Categoria"
                    ></v-text-field>
                  </div>

                  <!-- right - step  -->
                  <div class="tables">
                    <div class="questionnaire-table-box">
                      <!-- new question  -->
                      <div class="new-question-option">
                        <div class="new-question-box">
                          <div class="question-fields">
                            <h3 class="font-title">Nueva pregunta</h3>

                            <v-text-field
                              v-model="newQuestion.name"
                              :error="v.get('newQuestion.name') != ''"
                              :error-messages="v.get('newQuestion.name')"
                              label="Nombre"
                            ></v-text-field>

                            <v-text-field
                              v-model="newQuestion.idType"
                              :error="v.get('newQuestion.idType') != ''"
                              :error-messages="v.get('newQuestion.idType')"
                              label="Tipo de pregunta"
                            ></v-text-field>

                            <v-text-field
                              v-model="newQuestion.category"
                              :error="v.get('newQuestion.category') != ''"
                              :error-messages="v.get('newQuestion.category')"
                              label="Categoria"
                            ></v-text-field>
                          </div>
                          <div class="option-fields">
                            <h3 class="font-title">Nueva opcion</h3>
                            <v-text-field
                              v-model="newOption.name"
                              :error="v.get('newOption.name') != ''"
                              :error-messages="v.get('newOption.name')"
                              label="nombre"
                            ></v-text-field>
                            <v-text-field
                              v-model="newOption.cost"
                              :error="v.get('newOption.cost') != ''"
                              :error-messages="v.get('newOption.cost')"
                              label="costo"
                            ></v-text-field>

                            <!-- button action option -->
                            <v-btn
                              v-if="interactionsMode.options == 0"
                              outlined
                              small
                              @click="addNewOption()"
                            >Añadir opcion</v-btn>

                            <v-btn
                              v-if="interactionsMode.options == 1"
                              outlined
                              small
                              @click="saveNewOption()"
                            >Guardar opcion</v-btn>
                          </div>
                        </div>

                        <div class="table-questions">
                          <h3 class="font-title">Opciones asignadas</h3>
                          <v-data-table
                            :v-model="options.getArray()"
                            :headers="headersOption"
                            :items="options.getArray()"
                            :items-per-page="5"
                            single-select
                            item-key="name"
                            show-select
                            class="elevation-0"
                          >
                            <template v-slot:item.action="{ item }">
                              <v-icon class="mr-3" @click="editNewOption(item)">edit</v-icon>

                              <v-icon @click="deleteNewOption(item)">delete</v-icon>
                            </template>
                          </v-data-table>
                        </div>

                        <!-- button action question -->
                        <v-btn
                          v-if="interactionsMode.questions == 0"
                          outlined
                          small
                          @click="addNewQuestion()"
                          class="btn-add-question"
                        >Añadir nueva pregunta</v-btn>

                        <v-btn
                          v-if="interactionsMode.questions == 1"
                          outlined
                          small
                          @click="saveNewQuestion()"
                          class="btn-add-question"
                        >Guardar pregunta</v-btn>
                      </div>
                    </div>

                    <div class="questionnaire-table-box">
                      <h3 class="font-title">Preguntas asignadas</h3>
                      <v-data-table
                        :v-model="questions.getArray()"
                        :headers="headersQuestion"
                        :items="questions.getArray()"
                        :items-per-page="5"
                        single-select
                        item-key="name"
                        show-select
                        class="elevation-0"
                      >
                        <template v-slot:item.action="{ item }">
                          
                          <v-icon class="mr-3" @click="editNewQuestion(item)">edit</v-icon>

                          <v-icon @click="deleteNewQuestion(item)">delete</v-icon>
                        
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
                v-if="interactionsMode.questionnaires == 0"
                text
                small
                class="footer-button"
                @click.native="createQuestionnaire()"
              >Crear cuestionario</v-btn>

              <v-btn
                v-if="interactionsMode.questionnaires == 1"
                text
                small
                class="footer-button"
                @click.native="saveQuestionnaire()"
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
import QuestionnairesCode from "./QuestionnairesCode";
import "../../styles/fonts.scss";
import "./QuestionnairesStyle.scss";
import { Component, Vue } from "vue-property-decorator";
// import DateField from "../../components/dialogs/DateField/DateField.vue";

@Component({
  components: {
    // DateField
  }
})
export default class QuestionnairesPage extends QuestionnairesCode {
  created() {
    this.init();
  }
}
</script>
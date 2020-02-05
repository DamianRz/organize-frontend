<template>
  <div id="questionnaire-page">
    <v-btn @click="showNewQuestionnaire()" depressed small fab color="green" dark right absolute>
      <v-icon>add</v-icon>
    </v-btn>
    <div class="content-info">
      <h2 class="font-title">Mis Encuestas</h2>
    </div>
    <div class="search-box" v-if="questionnaires.length">
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
      <div class="questionnaire-table-box">
        <div class="questionnaire-container">
          <div class="questionnaires-box">
            <div class="questionnaire" v-for="(item,index) in filterItems()" :key="index">
              <p>{{ item.name }}</p>
              <!-- <p
                class="date"
              >{{ datetime.convert(datetime.getDate(item.startDate)) +' '+ item.startHour }}</p>-->
              <!-- <v-icon
                class="icon-questionnaire"
                :color="questionnaireActions.getInfoByState(item.state).color"
              >questionnaire</v-icon>-->
              <!-- <p class="state">{{ questionnaireActions.getInfoByState(item.state).text }}</p> -->
              <div class="settings-box">
                <v-btn small fab depressed text class="icon-edit">
                  <v-icon @click="editQuestionnaire(item)" color="green">edit</v-icon>
                </v-btn>
                <!-- <v-btn small fab depressed text class="icon-edit">
                  <v-icon @click="editQuestionnairesOfQuestionnaire(item)" color="green">list</v-icon>
                </v-btn>-->
              </div>
              <v-btn small fab depressed text class="icon-delete">
                <v-icon @click="showNotificationDelete(item)" color="red">delete</v-icon>
              </v-btn>
            </div>
            <p
              class="message-table"
              v-if="search.value != '' && filterItems().length == 0"
            >No se encontraron resultados</p>
            <p
              class="message-table"
              v-else-if="search.value == '' && filterItems().length == 0"
            >No tiene encuestas creadas. Pulse el buton superior derecho para crear</p>
          </div>
        </div>
      </div>
    </div>

    <v-dialog v-if="dialogs.questionnaires" v-model="dialogs.questionnaires" fullscreen persistent>
      <div class="questionnaire-dialog">
        <v-btn
          @click="dialogs.questionnaires = false"
          class="closeDialog"
          depressed
          fab
          text
          color="red"
          small
        >X</v-btn>
        <h2
          class="font-title title-dialog"
        >{{ interactionsMode.questionnaires ? 'Editar encuesta' : 'Crear nueva encuesta' }}</h2>
        <div class="fields-box">
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

        <v-btn @click="showNewQuestion()" depressed small fab color="green" dark right absolute>
          <v-icon>add</v-icon>
        </v-btn>

        <p class="font-title">Mis Preguntas</p>
        <div class="fields-box">
          <div class="questions-box">
            <div class="question" v-for="(item,index) in questions" :key="index">
              <p class="name">{{ `${item.name}` }}</p>
              <p class="category">{{ `${item.category}` }}</p>

              <div class="buttons-box">
                <v-btn @click="editQuestion(item)" fab color="green" small text depressed>
                  <v-icon>edit</v-icon>
                </v-btn>
                <v-btn @click="showNewOption()" fab color="green" small text depressed>
                  <v-icon>list</v-icon>
                </v-btn>
                <v-btn @click="removeQuestion(item)" fab text color="red" small depressed>
                  <v-icon>delete</v-icon>
                </v-btn>
              </div>
            </div>
            <p class="message-table" v-if="questions.length == 0">No tienes preguntas creadas</p>
          </div>
        </div>

        <p class="font-title" v-if="options.length">Opciones</p>
        <div class="fields-box" v-if="options.length">
          <div class="questions-box">
            <div class="question" v-for="(item,index) in options" :key="index">
              <p class="name">{{ `${item.name}` }}</p>
              <p class="category">{{ `$${item.cost}` }}</p>

              <div class="buttons-box">
                <v-btn @click="editOption(item)" fab color="green" small text depressed>
                  <v-icon>edit</v-icon>
                </v-btn>
                <v-btn
                  @click="removeOption(item)"
                  color="red"
                  small
                  text
                  depressed
                  fab
                >
                  <v-icon>delete</v-icon>
                </v-btn>
              </div>
            </div>
            <p class="message-table" v-if="options.length == 0">No hay opciones asignadas</p>
          </div>
        </div>

        <div class="footer-dialog">
          <v-btn
            v-if="interactionsMode.questionnaires == 0"
            text
            small
            class="footer-button"
            @click.native="addQuestionnaire()"
          >Crear encuesta</v-btn>
          <v-btn
            v-if="interactionsMode.questionnaires == 1"
            text
            small
            class="footer-button"
            @click.native="saveQuestionnaire()"
          >Guardar cambios</v-btn>
          <v-btn
            text
            small
            class="footer-button"
            @click.native="dialogs.questionnaires = false"
          >cancelar</v-btn>
        </div>
      </div>
    </v-dialog>

    <v-dialog v-model="dialogs.questions" fullscreen persistent>
      <div class="questionnaire-dialog">
        <v-btn
          @click="dialogs.questions = false"
          class="closeDialog"
          depressed
          fab
          text
          color="red"
          small
        >X</v-btn>
        <h2
          class="font-title title-dialog"
        >{{ interactionsMode.questionnaires ? 'Editar pregunta' : 'Crear nueva pregunta' }}</h2>
        <div class="fields-box">
          <v-text-field
            v-model="newQuestion.idType"
            :error="v.get('newQuestion.idType') != ''"
            :error-messages="v.get('newQuestion.idType')"
            label="idType"
          ></v-text-field>
          <v-text-field
            v-model="newQuestion.name"
            :error="v.get('newQuestion.name') != ''"
            :error-messages="v.get('newQuestion.name')"
            label="Nombre"
          ></v-text-field>
          <v-text-field
            v-model="newQuestion.category"
            :error="v.get('newQuestion.category') != ''"
            :error-messages="v.get('newQuestion.category')"
            label="Categoria"
          ></v-text-field>
          <v-text-field
            v-model="newQuestion.idType"
            :error="v.get('newQuestion.idType') != ''"
            :error-messages="v.get('newQuestion.idType')"
            label="timelimit example"
          ></v-text-field>
        </div>

        <div class="footer-dialog">
          <v-btn
            v-if="interactionsMode.questions == 0"
            text
            small
            class="footer-button"
            @click.native="includeNewQuestion()"
          >Añadir pregunta</v-btn>
          <v-btn
            v-if="interactionsMode.questions == 1"
            text
            small
            class="footer-button"
            @click.native="saveQuestion()"
          >Guardar cambios</v-btn>
          <v-btn text small class="footer-button" @click.native="dialogs.questions = false">volver</v-btn>
        </div>
      </div>
    </v-dialog>

    <v-dialog v-model="dialogs.options" fullscreen persistent>
      <div class="questionnaire-dialog">
        <v-btn
          @click="dialogs.options = false"
          class="closeDialog"
          depressed
          fab
          text
          color="red"
          small
        >X</v-btn>
        <h2
          class="font-title title-dialog"
        >{{ interactionsMode.options ? 'Editar opcion' : 'Crear nueva opcion' }}</h2>
        <div class="fields-box">
          <v-text-field
            v-model="newOption.name"
            :error="v.get('newOption.name') != ''"
            :error-messages="v.get('newOption.name')"
            label="Nombre"
          ></v-text-field>
          <v-text-field
            v-model="newOption.cost"
            :error="v.get('newOption.cost') != ''"
            :error-messages="v.get('newOption.cost')"
            label="Costo"
          ></v-text-field>
        </div>

        <div class="footer-dialog">
          <v-btn
            v-if="interactionsMode.options == 1"
            text
            small
            class="footer-button"
            @click.native="saveOption()"
          >Guardar cambios</v-btn>
          <v-btn
            v-if="interactionsMode.options == 0"
            text
            small
            class="footer-button"
            @click.native="includeNewOption()"
          >Añadir opcion</v-btn>
          <v-btn text small class="footer-button" @click.native="dialogs.options = false">volver</v-btn>
        </div>
      </div>
    </v-dialog>

    <v-snackbar v-model="notification.visible" :timeout="4000" :color="notification.color">
      <p>{{ notification.message }}</p>
      <v-btn
        dark
        depressed
        color="red"
        small
        @click="removeQuestionnaire(notification.selectedItem)"
        v-if="notification.color == 'orange'"
      >Eliminar</v-btn>
      <v-btn
        dark
        depressed
        color="grey"
        small
        @click="closeNotification()"
        v-if="notification.color == 'orange'"
      >Cancelar</v-btn>
    </v-snackbar>
  </div>
</template>
 
<script lang='ts'>
import QuestionnaireView from "./Questionnaire.view";
import "../../styles/Organize.scss";
import "./Questionnaire.scss";
import { Component, Vue } from "vue-property-decorator";
import TimeField from "../../components/TimeField/TimeField.vue";
import Datetime from "../../utils/DateTime";

@Component({
  components: {
    TimeField
  }
})
export default class QuestionnairesPage extends QuestionnaireView {
  private datetime: Datetime = new Datetime();
  created() {
    this.init();
  }
}
</script>
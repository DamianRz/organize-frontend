<template v-cloak>
  <v-dialog
   v-model="model"
    persistent
    overlay-color="black"
    transition="slide-x-transition"
    :fullscreen="$vuetify.breakpoint.name == 'xs'"
  >
    <div class="reservation-dialog">
      <v-btn @click="model=false" fab text small class="btn_close">
        <v-icon>close</v-icon>
      </v-btn>

      <v-stepper v-model="wizard">
        <v-stepper-items>
          <v-stepper-content v-for="(step,index) in steps" :key="index+1" :step="index+1">
            <!-- custom content -->
            <div class="content" v-if="index==0">
              <!-- list employees -->
              <p
                class="text step-title"
              >Seleccione el barbero con el que quiere realizar el servicio</p>
              <div class="items-list">
                <div
                  class="item"
                  v-for="(employee,index) in data.employees"
                  :key="index"
                  @click="selectEmployee(employee)"
                  data-aos="fade-down"
                  data-aos-duration="600"
                >
                  <v-img class="item-img-big" :src="employee.img" aspect-ratio="1"></v-img>
                  <p class="item-name">{{ employee.name }}</p>
                  <p class="item-info">{{ employee.job }}</p>
                </div>
              </div>
              <div class="selected-item">
                <p class="select-item-name font-text">Empleado seleccionado</p>
                <div class="item">
                  <p class="item-info">{{ selectedEmployee["job"] }}</p>
                  <img class="item-img" :src="selectedEmployee['img']" aspect-ratio="1" />
                  <p class="item-name">{{ selectedEmployee['name'] }}</p>
                </div>
              </div>
            </div>

            <!-- custom content -->
            <div class="content" v-if="index==1">
              <!-- list jobs -->
              <p class="text step-title">Seleccione el servicio que desee realizar</p>
               <!-- promos  -->
              <div class="items-list">
                <p class="text step-title">Promociones</p>
                <div
                  class="item"
                  v-for="(job,index) in data.works.promos"
                  :key="index"
                  @click="selectJob(job)"
                  data-aos="fade-down"
                  data-aos-duration="600"
                >
                  <p class="item-info">{{ job.name }}</p>
                  <v-img class="item-img-big" :src="job.img" aspect-ratio="1"></v-img>
                  <p class="item-cost">{{ "$"+job.cost }}</p>
                </div>
              </div>
              
              <!-- jobs  -->
              <div class="items-list">
                <p class="text step-title">Trabajos</p>
                <div
                  class="item"
                  v-for="(job,index) in getWorksByTypeEmployee()"
                  :key="index"
                  @click="selectJob(job)"
                  data-aos="fade-down"
                  data-aos-duration="600"
                >
                  <p class="item-info">{{ job.name }}</p>
                  <v-img class="item-img-big" :src="job.img" aspect-ratio="1"></v-img>
                  <p class="item-cost">{{ "$"+job.cost }}</p>
                </div>
              </div>
              <div class="selected-item">
                <p class="select-item-name font-text">Servicio seleccionado</p>
                <div class="item">
                  <p class="item-info">{{ selectedJob["name"] }}</p>
                  <img class="item-img" :src="selectedJob['img']" aspect-ratio="1" />
                </div>
              </div>
            </div>

            <!-- automatic content -->
            <div class="content" v-if="step.title!='custom'">
              <p class="text step-title">{{step.title}}</p>

              <div class="automatic-box">
                <v-layout row wrap class="layout-box">
                  <v-flex
                    v-for="(field,index) in step.fields"
                    :key="index"
                    xs12
                    sm12
                    lg12
                    class="pb-3 px-4"
                  >
                    <component
                      v-if="field.is != 'date' && field.is != 'hour'"
                      v-model="reservation[field.name]"
                      :is="getFieldType(field.is)"
                      :type="field.type"
                      :items="(field.data || {}).items"
                      :item-text="(field.data || {}).text"
                      :item-value="(field.data || {}).value"
                      :error="errors && errorField(field)"
                      :rules="field.rules"
                      :label="field.label"
                      :prepend-icon="field.icon"
                      :selectable="field.selectable"
                      color="x-theme__color"
                    ></component>

                    <!-- Hours BOX -->
                    <div v-if="field.is == 'hour'" class="hours-item">
                      <div
                        class="hours-box"
                        v-if="getDayNumber(reservation.startDate) != 6 && reservation.startDate"
                      >
                        <p class="font-text hours-name">Semana</p>
                        <v-btn
                          :text="!hour.selected"
                          small
                          class="hour-item font-text"
                          v-for="(hour,i) in getHours(false)"
                          :key="i"
                          @click="selectHour(hour)"
                        >{{ hour["hour"] }}</v-btn>
                      </div>

                      <div
                        class="hours-box"
                        v-if="getDayNumber(reservation.startDate) == 6 && reservation.startDate"
                      >
                        <p class="font-text hours-name">Sabados</p>
                        <v-btn 
                          :text="!hour.selected"
                          small
                          class="hour-item font-text"
                          v-for="(hour,i) in getHours(true)"
                          :key="i"
                          @click="selectHour(hour)"
                        >{{ hour["hour"] }}</v-btn>
                      </div>
                    </div>

                    <!-- Date Field -->
                    <v-dialog
                      v-if="field.is == 'date'"
                      :ref="'dialog'+(index+1)"
                      v-model="field.modal['dialog'+(index+1)]"
                      :return-value.sync="field.date"
                      width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="reservation[field.name]"
                          :label="field.label"
                          :prepend-icon="field.icon"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <!-- :allowed-dates="getDaysExceptWednesday()" -->
                      <v-date-picker
                        :min="new Date().toISOString().substr(0, 10)"
                        locale="es"
                        color="black"
                        v-model="field.date"
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="primary"
                          @click="reservation[field.name] = field.date; 
                          field.modal['dialog'+(index+1)] = false"
                        >OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-flex>
                </v-layout>
              </div>
            </div>

            <!-- footer -->
            <div class="footer-dialog">
              <v-btn
                v-if="steps.length == index+1"
                class="footer-button"
                v-bind:v-model="reservation"
                :disabled="checkSuccessStep()"
                @click.native="event"
                text
                small
              >{{ buttonText }}</v-btn>

              <v-btn
                v-if="wizard != steps.length"
                text
                small
                class="footer-button"
                v-bind:v-model="reservation"
                :disabled="checkSuccessStep()"
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
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </div>
  </v-dialog>
</template>

<script lang="ts">
import { Prop, Watch, Component } from "vue-property-decorator";
import { VSelect, VTextField, VCheckbox } from "vuetify/lib";  

import ReservationDialogCode from "./ReservationDialogCode";
import "./ReservationDialogStyle.scss";
import "../../../styles/fonts.scss";

@Component({})
export default class ReservationDialog extends ReservationDialogCode {
  @Prop({ default: "Crear" }) buttonText: any;
  @Prop({ default: false }) value!: boolean;
}
</script>
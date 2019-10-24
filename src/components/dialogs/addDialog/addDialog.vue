<template>
  <v-dialog v-model="model" transition="slide-x-transition">
    <div class="add-dialog">
      <v-stepper v-model="wizard">
        <v-stepper-items>
          <v-stepper-content v-for="(step,index) in steps" :key="index+1" :step="index+1">
            <!-- automatic content -->
            <slot :name="'step'+(index+1)" :data="data" :selectedBarber="selectedBarber">
              <div class="content">
                <p class="text title-emplyees">{{step.title}}</p>

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
                        v-model="item[field.name]"
                        :is="getFieldType(field.is)"
                        :type="field.type"
                        :items="(field.data || {}).items"
                        :item-text="(field.data || {}).text"
                        :item-value="(field.data || {}).value"
                        :error="errors && errorField(field)"
                        :rules="field.rules"
                        :label="$i18n.t(field.label)"
                        :prepend-icon="field.icon"
                        :selectable="field.selectable"
                        color="x-theme__color"
                      ></component>

                      <!-- Hours BOX -->
                      <div v-if="field.is == 'hour'" class="hours-item">
                        <div class="hours-box">
                          <p class="font-text hours-name">Manana</p>
                          <v-btn
                            small
                            text
                            class="hour-item font-text"
                            v-for="(hour,i) in getHours(field.workTime).slice(0,5)"
                            :key="i"
                          >{{ hour }}</v-btn>
                        </div>
                        <div class="hours-box">
                          <p class="font-text hours-name">Tarde</p>
                          <v-btn
                            small
                            text
                            class="hour-item font-text"
                            v-for="(hour,i) in getHours(field.workTime).slice(5)"
                            :key="i"
                          >{{ hour }}</v-btn>
                        </div>
                      </div>

                      <!-- Date Field -->
                      <v-dialog
                        v-if="field.is == 'date'"
                        :ref="'dialog'+(index+1)"
                        v-model="modals['dialog'+(index+1)]"
                        :return-value.sync="date"
                        lazy
                        full-width
                        width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="item[field.name]"
                            :label="field.label"
                            :prepend-icon="field.icon"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker color="black" v-model="date" scrollable>
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="item[field.name] = date; 
                          modals['dialog'+(index+1)] = false"
                          >OK</v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-flex>
                  </v-layout>
                </div>
              </div>
            </slot>

            <!-- footer -->
            <div class="footer-dialog">
              <v-btn
                v-if="steps.length == index+1"
                text
                small
                class="footer-button"
                @click.native="event"
              >{{ buttonText }}</v-btn>

              <v-btn
                v-if="wizard != steps.length"
                text
                small
                class="footer-button"
                @click.native="wizard += 1"
              >{{ $i18n.t('GENERAL.next') }}</v-btn>

              <v-btn
                v-if="wizard > 1"
                text
                small
                class="footer-button"
                @click.native="wizard -= 1"
              >{{ $i18n.t('GENERAL.prev') }}</v-btn>
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

import AddDialogCode from "./addDialogCode";
import "./addDialogStyle.scss";
import "../../../styles/fonts.scss";

@Component({})
export default class AddDialog extends AddDialogCode {
  @Prop({ default: "Crear" }) buttonText: any;
  @Prop({ default: false }) value!: boolean;
  @Prop({
    default: () => [
      {
        title: "Step 1",
        fields: [
          {
            type: "input",
            name: "first",
            label: "My first input"
          }
        ]
      },
      {
        title: "Step 2",
        fields: [
          {
            type: "input",
            name: "second",
            label: "My second input"
          }
        ]
      }
    ]
  })
  steps: any;
}
</script>
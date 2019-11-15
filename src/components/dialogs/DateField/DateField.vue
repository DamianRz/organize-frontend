<template>
  <!-- Date Field -->
  <v-dialog :ref="dialog1" v-model="value" :return-value.sync="field.date" width="290px">
    <template v-slot:activator="{ on }">
      <v-text-field
        class="date-field"
        dark
        v-model="dateToSend"
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
        @click="dateToSend = field.date; 
                value = false"
      >OK</v-btn>
    </v-date-picker>
  </v-dialog>
</template> 

<script lang="ts">
import { Prop, Watch, Component } from "vue-property-decorator";
import DateFieldCode from "./DateFieldCode";
import "./DateFieldStyle.scss";

@Component({})
export default class DateField extends DateFieldCode {
  @Prop({ default: false }) value!: false;
  @Prop({ default: "" }) date!: string;
}
</script>

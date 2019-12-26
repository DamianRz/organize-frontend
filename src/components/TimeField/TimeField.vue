<template>
  <div>
    <v-dialog
      v-if="type == 'hour'"
      ref="dialogHour"
      v-model="modal2"
      :return-value.sync="time"
      persistent
      width="290px"
    >
      <template v-slot:activator="{ on }">
        <div class="field-date__box">
          <v-text-field
            v-model="time"
            :error="error"
            :error-messages="errorMessage"
            :label="label"
            readonly
            v-on="on"
          ></v-text-field>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                @click="setTodayHour()"
                text
                color="green"
                v-on="on"
                class="btn-date"
                fab
                small
              >
                <v-icon>alarm</v-icon>
              </v-btn>
            </template>
            <span>pegar hora actual</span>
          </v-tooltip>
        </div>
      </template>
      <v-time-picker v-model="time" full-width scrollable :locale="lang">
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
        <v-btn text color="primary" @click="$refs.dialogHour.save(time)">OK</v-btn>
      </v-time-picker>
    </v-dialog>

    <!-- Date Dialog  -->
    <v-dialog
      v-else
      ref="dialogDate"
      v-model="modal2"
      :return-value.sync="time"
      persistent
      width="290px"
    >
      <template v-slot:activator="{ on }">
        <div class="field-date__box">
          <v-text-field
            v-model="simpleDate"
            :error="error"
            :error-messages="errorMessage"
            :label="label"
            readonly
            v-on="on"
          ></v-text-field>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                @click="setTodayDate()"
                text
                color="green"
                v-on="on"
                class="btn-date"
                fab
                small
              >
                <v-icon>calendar_today</v-icon>
              </v-btn>
            </template>
            <span>pegar fecha actual</span>
          </v-tooltip>
        </div>
      </template>
      <v-date-picker v-model="time" scrollable :min="min" :locale="lang">
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
        <v-btn text color="primary" @click="$refs.dialogDate.save(time)">OK</v-btn>
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Prop, Watch, Component } from "vue-property-decorator";
import TimeFieldCode from "./TimeFieldCode";
import Datetime from "../../utils/DateTime";
import "./TimeFieldStyle.scss";

@Component({})
export default class TimeField extends TimeFieldCode {
  @Prop({ default: "" }) value!: string;
  @Prop({ default: "date" }) type!: string;
  @Prop({ default: "es" }) lang!: string;
  @Prop({ default: "" }) label!: string;
  // @Prop({ default: "" }) icon!: string;
  @Prop({ default: "" }) error!: string;
  @Prop({ default: "" }) min!: string;
  @Prop({ default: "" }) errorMessage!: string;

  @Watch("time")
  updateTime() {
    if (this.time.indexOf(":") == -1) {
      this.simpleDate = this.getDate(this.time);
    }
    this.$emit("input", this.time);
  }

  @Watch("value")
  updateValue() {
    if (this.time.indexOf(":") == -1) {
      this.simpleDate = this.getDate(this.time);
    }
  }

  created() {
    this.time = this.value;
  }
}
</script>
<style lang="scss">
.field-date__box {
  display: flex;

  .btn-date {
    position: relative;
    margin-top: 20px;
  }
}
</style>


<template>
  <div id="events-page">
    <v-btn @click="getEvents()">Load events</v-btn>
    <v-data-table 
    :headers="headers" 
    :items="events" 
    :items-per-page="5" 
    class="elevation-1">
    </v-data-table>
  </div>
</template>
 
<script lang='ts'>
import EventsCode from "./EventsCode";
import "../../styles/fonts.scss";
import "./EventsStyle.scss";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    // CustomTable
  }
})
export default class Home extends EventsCode {}
</script>
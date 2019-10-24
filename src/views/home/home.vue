
<template>
  <div>
    <v-data-table 
    :headers="headers" 
    :items="events" 
    :items-per-page="5" 
    class="elevation-1">
    </v-data-table>
  </div>
</template>
 
<script lang='ts'>
import HomeCode from "./homeCode";
import "../../styles/fonts.scss";
import { Component, Vue } from "vue-property-decorator";
// import CustomTable from "@/components/CustomTable/CustomTable.vue";

@Component({
  components: {
    // CustomTable
  }
})
export default class Home extends HomeCode {}
</script>
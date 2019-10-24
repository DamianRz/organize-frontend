<template v-cloak>
  <v-navigation-drawer
    id="drawer-left" 
    dark
    temporary
    fixed
    left
    v-model="drawer"
    color="rgba(0, 0, 0, 0.6)"
  >
    <!-- custom item list Reservation -->
    <v-list-item @click="drawer=false;reservationDialog=true" class="list-item"> 
      <v-list-item-content class="list-item-content">
        <v-list-item-title>RESERVAR</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <!-- list item of menu items  -->
    <v-list-item
      v-for="(item, index) in filteredConf"
      :key="index"
      @click="drawer = false"
      :href="item.href"
      class="list-item"
    >
      <v-list-item-content class="list-item-content">
        <!-- <v-list-item-avatar>
          <v-icon color="#DDDDDD">{{ item.icon }}</v-icon>
        </v-list-item-avatar>-->
        <v-list-item-title>{{ item.name }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-btn small fab class="settings" v-if="false">
      <v-icon color="#BDBDBD">settings</v-icon>
    </v-btn>

    <!-- dialogs -->
    <reservation-dialog v-model="reservationDialog"></reservation-dialog>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vuetify from "vuetify/lib";
import { Watch, Component } from "vue-property-decorator";
import LeftMenuCode from "./leftMenuCode";
import "./leftMenuStyle.scss";
import ReservationDialog from "../dialogs/ReservationDialog/ReservationDialog.vue";

@Component({
  components: {
    ReservationDialog
  }
})
export default class LeftMenu extends LeftMenuCode {}
</script>

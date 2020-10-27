<template v-cloak>
  <v-navigation-drawer
    id="drawer-left"
    dark
    fixed
    temporary
    left
    v-model="drawer"
    color="rgba(0, 0, 0, 0.6)"
  >
    <!-- list item of menu items  -->
    <v-list-item
      v-for="(item, index) in filteredConf"
      :key="index"
      @click="pageRouter(item.route)"
      :href="item.href"
      class="list-item"
    >
      <v-list-item-content class="list-item-content">
        <v-list-item-title>{{ item.name }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-btn small fab class="settings" v-if="false">
      <v-icon color="#BDBDBD">settings</v-icon>
    </v-btn>

    <!-- dialogs -->
    <!-- <reservation-dialog v-model="reservationDialog"></reservation-dialog> -->
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Prop, Watch, Component } from "vue-property-decorator";
import { LeftMenuLogic } from "../leftMenu/index";
import "./LeftMenu.scss";

export class LeftMenu extends LeftMenuLogic {}
</script>

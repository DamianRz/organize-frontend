<template>
  <v-app id="app">
    <Toolbar v-if="$store.state.userInfo" class="toolbar-app-fixed"></Toolbar>
    <LeftMenu class="left_menu-app-fixed"></LeftMenu>
    <v-content class="content">
      <v-container fluid class="container">
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { AppLogic } from "./index";
import "./app.scss";
@Component({})
export default class App extends AppLogic {}
</script>

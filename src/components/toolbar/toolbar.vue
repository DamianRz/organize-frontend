<template v-cloak>
  <v-toolbar id="toolbar" fixed dark height="65px" v-if="!$store.state.drawer.left && !$store.getters.userLogged">
    <!-- LEFT MENU - BUTTON  -->
    <!-- <v-btn
      class="left-menu-btn d-flex d-sm-none"
      @click.native.stop="$store.commit('setLeftDrawer', true)"
      fab
      text
      small
    >
      <v-icon>menu</v-icon>
    </v-btn> -->

    <!-- LOGO  -->
    <v-toolbar-title @click.stop="pageRouter('/')">
      <!-- <img class="logo" src="@/assets/logo.png" @click.stop="pageRouter('/')" alt="Avatar" /> -->
      <h2 class="toolbar-title">Organize</h2>
    </v-toolbar-title>

    <div class="flex-grow-1"></div>

    <v-toolbar-items class="toolbar-items hidden-xs-only">
      <v-btn
        text
        small
        class="toolbar-button"
        v-for="(item, index) in filteredConf"
        :key="index"
        :href="item.href"
        :v-if="item.toolbar"
        @click="pageRouter(item.route)"
      >
        <v-icon>{{ item.icon }}</v-icon>
        <span>{{ item.name }}</span>
      </v-btn>
    </v-toolbar-items>

    <div class="right-box">
    </div>
  </v-toolbar>
</template>

<script lang="ts">
import ToolbarAction from "./toolbar.actions";
import "./toolbar.scss";
import { Watch, Component } from "vue-property-decorator";

@Component({
  components: {
  }
})
export default class Toolbar extends ToolbarAction {}
</script>

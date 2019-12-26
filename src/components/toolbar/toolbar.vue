<template v-cloak>
  <v-toolbar
    id="toolbar"
    fixed
    flat
    height="65px"
    v-if="$store.getters.userLogged"
  >
    <v-btn
      v-if="$store.getters.userLogged"
      class="left-menu-btn d-flex d-sm-none"
      small
      color="rgb(39, 39, 39)"
      dark
      fab
      @click.native.stop="$store.commit('setLeftDrawer', true)"
    >
      <v-icon v-if="$store.getters.drawer">close</v-icon>
      <v-icon v-else>menu</v-icon>
    </v-btn>

    <v-toolbar-title>
      <h2 class="toolbar-title">Organize</h2>
    </v-toolbar-title>

    <v-toolbar-items class="toolbar-items hidden-xs-only">
      <v-btn
        text
        dark
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

  </v-toolbar>
</template>

<script lang="ts">
import ToolbarAction from "./Toolbar.actions";
import "./Toolbar.scss";
import { Watch, Component } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Toolbar extends ToolbarAction {}
</script>

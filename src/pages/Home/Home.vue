<template transition="slide-x-transition">
  <div id="home-page">
    <img
      class="img-back"
      src="https://raw.githubusercontent.com/DamianRz/organize-frontend/master/src/assets/banner.jpg"
    />
    <login
      @onSignIn="
        (value) => {
          signIn(value);
        }
      "
      @onSignUp="
        (value) => {
          signUp(value);
        }
      "
    />
  </div>
</template>

<script lang="ts">
import { HomeLogic } from "./index";
import "./Home.scss";
import "../../styles/Organize.scss";
import { Component } from "vue-property-decorator";
import Login from "../../components/Login/Login.vue";

@Component({
  components: {
    Login,
  },
})
export default class Home extends HomeLogic {}
</script>

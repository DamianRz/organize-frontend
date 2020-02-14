<template transition="slide-x-transition">
  <div id="home-page">
    <img class="img-back" src="https://i.pinimg.com/originals/9c/d1/a0/9cd1a09bb5c3d5a6774128147c96b18b.gif">
    <login @onSignIn="(value)=>{signIn(value)}" @onSignUp="(value)=>{signUp(value)}"/>
  </div>
</template>

<script lang="ts">
import HomeActions from "./Home.actions";
import "./Home.scss";
import "../../styles/Organize.scss";
import { Component } from "vue-property-decorator";
import Login from "../../components/Login/Login.vue";

@Component({
  components: {
    Login
  }
})
export default class Home extends HomeActions {}
</script>

<template>
  <div id="home">
    <div class="info-box">
      <h1 class="welcome font-title">Bienvenido a Oganize!</h1>
      <p class="welcome font-text">Crea y unete a los eventos que realizan tus amigos</p>
      <v-btn class="button-access" dark outlined @click="dialogs.signIn = true">Acceder</v-btn>
      <v-btn class="button-access" dark outlined @click="dialogs.signUp = true">Registrarse</v-btn>
    </div>
    <v-img height="100%" :aspect-ratio="16/9" :src="require('../../assets/banner.jpg')"></v-img>

    <!-- register dialog -->
    <v-dialog class="register-dialog" v-model="dialogs.signUp" width="500">
      <v-card>
        <v-card-title>Cree una cuenta para iniciar en Organize</v-card-title>
        <v-card-text>
          <div class="login-fields">
            <v-text-field v-model="signUpData.email" class="field" label="email"></v-text-field>
            <v-text-field v-model="signUpData.username" class="field" label="username"></v-text-field>
            <v-text-field v-model="signUpData.password" class="field" label="password"></v-text-field>
          </div>
          <p class="font-error">{{ signUpErrors }}</p>
          <div class="login-footer">
            <v-btn @click="register()" class="button">Crear cuenta</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- login dialog  -->
    <v-dialog class="login-dialog" v-model="dialogs.signIn" width="500">
      <v-card>
        <v-card-title>Acceda para utilizar Organize</v-card-title>
        <v-card-text>
          <div class="login-fields">
            <v-text-field v-model="signInData.email" class="field" label="email"></v-text-field>
            <v-text-field v-model="signInData.password" class="field" label="password"></v-text-field>
          </div>
          <p class="font-error">{{ signInErrors }}</p>
          <div class="login-footer">
            <v-btn @click="login()" class="button">Acceder</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

  </div>
</template>
<script lang='ts'>
import HomeCode from "./homeCode";
import "./homeStyle.scss";
import "../../styles/fonts.scss";
import { Component } from "vue-property-decorator";
import { required, minLength, between } from 'vuelidate/lib/validators';

@Component({
  components: {}
})
export default class Home extends HomeCode {
}
</script>
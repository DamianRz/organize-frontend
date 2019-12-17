<template transition="slide-x-transition">
  <div id="homePage">
    <v-stepper v-model="wizard" class="stepper">
      <v-stepper-items>
        <v-stepper-content step="1">
          <!-- SIGN IN -->
          <v-img
            class="back-img"
            height="100%"
            :aspect-ratio="16/9"
            :src="require('../../assets/banner.jpg')"
          ></v-img>
          <div class="box-access">
            <h4 class="font-title title">Acceda para utilizar Organize</h4>
            <v-text-field
              v-model="newUser.email"
              :error="v.get('newUser.email') != ''"
              :error-messages="v.get('newUser.email')"
              class="field"
              label="Email"
            ></v-text-field>
            <v-text-field
              v-model="newUser.password"
              :error="v.get('newUser.password') != ''"
              :error-messages="v.get('newUser.password')"
              class="field"
              type="password"
              label="Contraseña"
            ></v-text-field>

            <div class="footer">
              <v-btn @click="signIn()" class="button" color="#bc7b3c">Acceder</v-btn>
            </div>

            <div class="signup-button">
              <p>No tiene cuenta? Registrese aqui</p>
              <v-btn @click="goToStep(2)" color="#bc7b3c">
                Registrase Aqui
                <v-icon>people</v-icon>
              </v-btn>
            </div>
          </div>
        </v-stepper-content>

        <v-stepper-content step="2">
          <!-- SIGN UP -->
          <v-img
            class="back-img"
            height="100%"
            :aspect-ratio="16/9"
            :src="require('../../assets/banner.jpg')"
          ></v-img>
          <div class="box-access register-box">
            <div class="login-fields">
              <h4 class="font-title title">Registrese Aqui</h4>

              <v-text-field
                v-model="newUser.username"
                :error="v.get('newUser.username') != ''"
                :error-messages="v.get('newUser.username')"
                class="field"
                label="Nombre de Usuario"
              ></v-text-field>

              <v-text-field
                v-model="newUser.email"
                :error="v.get('newUser.email') != ''"
                :error-messages="v.get('newUser.email')"
                class="field"
                label="Email"
              ></v-text-field>

              <v-text-field
                v-model="newUser.password"
                :error="v.get('newUser.password') != ''"
                :error-messages="v.get('newUser.password')"
                class="field"
                label="Contraseña"
                type="password"
              ></v-text-field>

              <v-text-field
                v-model="newUser.password2"
                :error="v.get('newUser.password2') != ''"
                :error-messages="v.get('newUser.password2')"
                class="field"
                label="Repita contraseña"
                type="password"
              ></v-text-field>
            </div>
            <!-- <p class="font-error font-text">{{ signUpErrors }}</p> -->
            <div class="footer">
              <v-btn small @click="goToStep(1)" color="#bc7b3c" class="mr-3">
                <v-icon>arrow_back</v-icon>Volver
              </v-btn>
              <v-btn @click="signUp()" color="#bc7b3c" class="button">Registrarse</v-btn>
            </div>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script lang="ts">
import HomeActions from "./Home.actions";
import "./Home.scss";
import "../../styles/fonts.scss";
import { Component } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Home extends HomeActions {}
</script>

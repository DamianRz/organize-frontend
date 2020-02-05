<template>
  <div id="login-box">
    <h1 class="mb-6 organize__font-title">Login</h1>
    <v-form :ref="ON_SIGNIN">
      <v-text-field
        v-model="userSignIn.email"
        :rules="fieldRules"
        class="organize__text-field"
        label="email"
        dense
      />
      <v-text-field
        v-model="userSignIn.password"
        :rules="fieldRules"
        class="organize__text-field organize__text-field_button"
        label="constraseña"
        type="password"
        dense
      >
        <template v-slot:append-outer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                @click="signIn()"
                v-on="on"
                class="text-field__internal-btn"
                dark
                color="#B6158C"
                small
                fab
                depressed
              >
                <v-icon>arrow_right</v-icon>
              </v-btn>
            </template>
            <span>Accede Aqui</span>
          </v-tooltip>
        </template>
      </v-text-field>
    </v-form>

    <h2 class="mb-6 organize__font-title">registrese aqui</h2>

    <v-form :ref="ON_SIGNUP">
      <v-text-field
        v-model="userSignUp.username"
        :rules="fieldRules"
        class="organize__text-field"
        label="nombre de usuario"
        dense
      />
      <v-text-field
        v-model="userSignUp.email"
        :rules="emailRules"
        class="organize__text-field"
        label="email"
        dense
      />

      <v-text-field
        v-model="userSignUp.password"
        :rules="fieldRules"
        class="organize__text-field"
        label="contraseña"
        type="password"
        dense
      />
      <v-text-field
        v-model="userSignUp.repeatPassword"
        :rules="passwordRules"
        class="organize__text-field"
        label="repita contraseña"
        type="password"
        dense
      />
      <v-btn @click="signUp()" class="mt-4 organize__button" dark color="#B6158C" depressed>Registrarse</v-btn>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import LoginActions from "./Login.actions";
import "./Login.scss";

@Component({})
export default class Login extends LoginActions {}
</script>

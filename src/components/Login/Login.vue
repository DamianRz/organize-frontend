<template>
  <div id="login-box">
    <h1 class="mb-3 organize__font-title">Accede a WeCollab</h1>
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
      />

      <v-btn
        @click="signIn()"
        class="text-field__internal-btn"
        dark
        color="#999"
        small
        depressed
      >
        Acceder
      </v-btn>
    </v-form>

    <h2 class="mb-6 organize__font-title">Registrese aqui</h2>

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
      <v-btn
        @click="signUp()"
        class="text-field__internal-btn"
        dark
        color="#999"
        small
        depressed
      >
        Registrarse
      </v-btn>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { LoginLogic } from "./index";
import "./Login.scss";

@Component({})
export default class Login extends LoginLogic {}
</script>

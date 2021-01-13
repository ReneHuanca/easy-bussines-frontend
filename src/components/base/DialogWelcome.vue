<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Bienvenido!</v-card-title>

        <v-card-text>
          Sistema de Gestion de Negocios
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="closeDialog"
          >
            CONTINUAR
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
    export default {
        name: 'DialogWelcome',

        data () {
            return {
                notifications: false,
                sound: true,
                widgets: false,
                open: false,
            }
        },

        computed: {
          dialog() {
            return this.$store.state.welcomeDialog;
          }
        },

        methods: {
          closeDialog() {
            this.$store.commit('SET_WELCOME_DIALOG', false)
          },
        },
    }
</script>
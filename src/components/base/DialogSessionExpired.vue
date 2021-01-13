<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="450"
    >
      <v-card>
        <v-card-title class="headline">
          Su Sesión ha expirado
        </v-card-title>
        <v-card-text>Por motivos de seguridad la sesion ha expirado. Para cambiar el tiempo de sesion debe ir a configuración.</v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    computed: {
        dialog: {
            get() {
                return this.$store.state.sessionExpiredModal;
            },
            set (value) {
                this.$store.commit('SET_SESSION_EXPIRED_MODAL', value)
            }
        }
    },
  }
</script>
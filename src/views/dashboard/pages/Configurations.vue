<template>
  <v-container id="regular-tables" fluid tag="section">
    <!-- breadcrum -->
    <!-- <v-breadcrumbs :items="breadcrumb_items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs> -->

    <base-material-card
      color="primary"
      icon="mdi-cog"
      title="CONFIGURACIÓN GENERAL"
      class="px-5 py-3"
    >
      <!-- alerts -->
      <base-material-snackbar
        v-model="alert.state"
        :type="alert.color"
        v-bind="{
          [alert.x]: true,
          [alert.y]: true
        }"
      >
        {{ alert.text }}
      </base-material-snackbar>

      <v-form @submit.prevent="updateConfiguration()">
        <v-container class="py-0">
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                color="indigo"
                prepend-icon="mdi-currency-usd"
                v-model="setting.currency"
                label="Moneda"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                color="indigo"
                prepend-icon="mdi-watch"
                v-model="setting.time_jwt"
                label="Tiempo de Sesión(token)"
              ></v-text-field>
            </v-col>

            <!-- alert to showErrors No dissmisible  -->
            <v-col cols="12" v-if="showErrors">
              <v-alert border="left" color="red" type="warning">
                <ul>
                  <li v-for="(error, index) in errors" :key="index">
                    {{ error[0] }}
                    <!-- mostrarmos un error de cada elemento -->
                  </li>
                </ul>
              </v-alert>
            </v-col>

            <v-col cols="12" class="text-left">
              <v-btn color="indigo" type="submit">
                <v-icon left>mdi-content-save</v-icon>
                Guardar
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </base-material-card>
  </v-container>
</template>

<script>
import configurationService from '@/services/configuration.service'
import auth from '@/mixins/auth'

export default {
  mixins: [auth],

  data() {
    return {
      setting: {},

      alert: {
        state: false,
        color: "success",
        text: "ÉXITO : La tarea se completo",
        x: "right",
        y: "top"
      },
      // validation in backend
      showErrors: false,
      errors: {},
    };
  },

  methods: {
    async getOneConfiguration () {
      try {
        const response = await configurationService.getOneConfiguration(1);
        this.setting = response.data.setting;
      } catch (error) {
        this.showSessionExpiredModal();
      }
    },

    async updateConfiguration() {
      try {
        const response = await configurationService.updateConfiguration(1, this.setting);
        this.alert.state = true;
        this.alert.text = 'ÉXITO : La configuración se actualizó';
      } catch (error) {
        // this.showSessionExpiredModal(error);
        this.alert.state = true;
        this.alert.text = 'ERROR : No se pudo guardar';
        this.alert.color = 'error';
        console.log(error);
      }
    }
  },

  mounted() {
    this.getOneConfiguration();
  },
};
</script>

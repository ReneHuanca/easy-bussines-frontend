<template>
  <v-container id="customer-profile" fluid tag="section">
    <!-- to alerts -->
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

    <v-row justify="center">
      <v-col cols="12" md="7">
        <base-material-card color="warning">
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              EDITAR
            </div>
            <div class="subtitle-1 font-weight-light">
              Editar Cliente
            </div>
          </template>

          <v-form @submit.prevent="updateCustomer()">
            <v-container class="py-0">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    color="warning"
                    prepend-icon="mdi-face"
                    v-model="customer.name"
                    label="Nombre del Cliente"
                    autofocus
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    color="warning"
                    prepend-icon="mdi-email"
                    type="email"
                    v-model="customer.email"
                    label="Correo electrónico"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    color="warning"
                    prepend-icon="mdi-phone"
                    v-model="customer.phone"
                    label="Telefono"
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    color="warning"
                    prepend-icon="mdi-domain"
                    v-model="customer.company"
                    label="Empresa"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    color="warning"
                    prepend-icon="mdi-earth"
                    v-model="customer.country"
                    label="Pais"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    color="warning"
                    prepend-icon="mdi-city"
                    v-model="customer.city"
                    label="Cuidad"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    color="warning"
                    prepend-icon="mdi-monitor"
                    v-model="customer.website"
                    label="Pagina Web"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    color="warning"
                    prepend-icon="mdi-web"
                    v-model="customer.social"
                    label="Redes Sociales"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    color="warning"
                    prepend-icon="mdi-history"
                    outlined
                    name="input-7-4"
                    label="Cuenta una historia sobre el cliente"
                    v-model="customer.history"
                  ></v-textarea>
                </v-col>

                <!-- alert to showErrors No dissmisible  -->
                <v-col cols="12" v-if="showErrors">
                  <v-alert border="left"  type="error">
                    <ul>
                      <li v-for="(error, index) in errors" :key="index">
                        {{ error[0] }}
                        <!-- mostrarmos un error de cada elemento -->
                      </li>
                    </ul>
                  </v-alert>
                </v-col>

                <v-col cols="12" class="text-right">
                  <v-btn color="warning" type="submit">
                    <v-icon left>mdi-content-save</v-icon>
                    Guardar
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Customer from "@/models/Customer";
import CustomerService from "@/services/customer.service";
import Auth from "@/mixins/auth"

export default {
  mixins: [Auth],

  data: () => ({
    customer: new Customer("", "", "", "", "", "", "", "", "", "", "", 0),
    alert: {
      state: false,
      color: "success",
      text: "ÉXITO : La tarea se completo",
      x: "right",
      y: "top"
    },
    // validation in backend
    showErrors: false,
    errors: {}
  }),

  methods: {
    async getOneCustomer() {
      try {
        const response = await CustomerService.getOneCustomer(
          this.$route.params.id
        );
        this.customer = response.data.customer;
      } catch (error) {
        this.showSessionExpiredModal(error);
        this.alert.state = true;
        this.alert.color = "error";
        this.alert.text = "ERROR : No encontrado";
        setTimeout(() => {
          this.$router.push("/dashboard/customers");
        }, 1000);
      }
    },

    async updateCustomer() {
      try {
        const response = await CustomerService.updateCustomer(
          this.$route.params.id,
          this.customer
        );
        this.alert.state = true;
        this.alert.color = "success";
        this.alert.text = "ÉXITO : Se guardaron los datos correctamente";
        setTimeout(() => {
          this.$router.push("/dashboard/customers");
        }, 1000);
      } catch (error) {
        // if error.response.status = 422, unprocessable entity VALIDATION
        if (error.response.status === 422) {
          this.showErrors = true;
          this.errors = error.response.data;
          return;
        }
        this.showSessionExpiredModal(error);
        this.alert.state = true;
        this.alert.color = "error";
        this.alert.text = "ERROR : No se pudo guardar";
      }
    }
  },

  mounted() {
    this.getOneCustomer();
  }
};
</script>

<template>
  <v-container id="sale-profile" fluid tag="section">
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
        <base-material-card color="indigo">
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              AGREGAR
            </div>
            <div class="subtitle-1 font-weight-light">
              Agregar Nueva Venta
            </div>
          </template>

          <v-form @submit.prevent="addSale()">
            <v-container class="py-0">
              <v-row>
                <v-col cols="12" sm="12">
                  <v-autocomplete
                    v-model="product"
                    :items="products" 
                    item-text="name"
                    item-value="id"
                    return-object
                    label="Selecciona el Producto"
                    prepend-icon="mdi-chart-bubble"
                    color="indigo"
                    autofocus
                  >
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    color="indigo"
                    prepend-icon="mdi-currency-usd-circle"
                    type="text"
                    
                    label="Precio Unitario"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    color="indigo"
                    prepend-icon="mdi-counter"
                    v-model="sale.quantity"
                    label="Cantidad"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field
                    color="indigo"
                    prepend-icon="mdi-currency-usd-circle"
                    v-model="sale.total"
                    label="Total a pagar"
                    type="text"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-autocomplete 
                    v-model="customer"
                    :items="customers" 
                    item-text="name"
                    item-value="id"
                    return-object
                    label="Selecciona el Cliente"
                    prepend-icon="mdi-account"
                    color="indigo"
                  >
                  </v-autocomplete>
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

                <v-col cols="12" class="text-right">
                  <v-btn color="indigo" type="submit">
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
import Sale from "@/models/Sale";
import SaleService from "@/services/sale.service";
import ProductService from "@/services/product.service";
import CustomerService from "@/services/customer.service";
import Auth from "@/mixins/auth";

export default {
  mixins: [Auth],

  data: () => ({
    sale: new Sale("", "", "", "", "", "", ""),
    alert: {
      state: false,
      color: "success",
      text: "ÉXITO : La tarea se completo",
      x: "right",
      y: "top"
    },
    // validation in backend
    showErrors: false, errors: {},

    sessionExpiredModal: false,

    products: [], product: {},
    customers: [], customer: {},
  }),

  methods: {
    async loadProductsAndCustomers() {
      try {
        const res = await ProductService.getAllProducts();
        this.products = res.data.products;
        const response = await CustomerService.getAllCustomers();
        this.customers = response.data.customers;
      } catch (error) {
        this.showSessionExpiredModal(error);
      }
    },

    async addSale() {
      try {
        this.sale.product_id = this.product.id;
        this.sale.customer_id = this.customer.id;
        const response = await SaleService.addSale(this.sale);
        this.alert.state = true;
        this.alert.color = "success";
        this.alert.text = "ÉXITO : Se guardaron los datos correctamente";
        // para que se pueda ver el mensaje
        setTimeout(() => {
          this.$router.push("/dashboard/sales");
        }, 1000);
      } catch (error) {
        // if error.response.status = 422, unprocessable entity to VALIDATION
        if (error.response.status === 422) {
          this.showErrors = true;
          this.errors = error.response.data;
        }
        this.showSessionExpiredModal(error);
        this.alert.state = true;
        this.alert.color = "error";
        this.alert.text = "ERROR : No se pudo guardar";
      }
    }
  },

  mounted() {
    this.loadProductsAndCustomers();
  }
};
</script>

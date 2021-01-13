<template>
  <v-container id="product-profile" fluid tag="section">
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
              Editar Producto
            </div>
          </template>

          <v-form @submit.prevent="updateProduct()">
            <v-container class="py-0">
              <v-row>
                <v-col cols="12" sm="12">
                  <v-text-field
                    color="indigo"
                    prepend-icon="mdi-cart"
                    v-model="product.name"
                    label="Nombre del producto"
                    autofocus
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    color="indigo"
                    prepend-icon="mdi-counter"
                    type="number"
                    v-model="product.quantity"
                    label="Cantidad Stock"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    color="indigo"
                    prepend-icon="mdi-currency-usd-circle-outline"
                    v-model="product.unit_price"
                    label="Precio Unitario"
                    type="text"
                    messages="Ejemplo 0.00"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field
                    color="indigo"
                    prepend-icon="mdi-home-currency-usd"
                    v-model="product.total_in_stock"
                    label="Total en stock"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-select
                    v-model="product.category_id"
                    :items="items"
                    item-text="name"
                    item-value="id"
                    label="Seleccione una categoria"
                    persistent-hint
                    return-object
                    single-line
                    prepend-icon="mdi-apps"
                  ></v-select>
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
import Product from "@/models/Product";
import ProductService from "@/services/product.service";
import CategoryService from "@/services/category.service";
import Auth from "@/mixins/auth"

export default {
  mixins: [Auth],

  data: () => ({
    product: new Product("", "", "", "", ""),

    // select
    items: [],

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
    async loadCategories () {
      try {
        const response = await CategoryService.getAllCategories();
        this.items = response.data.categories;
      } catch (error) {
        this.showSessionExpiredModal(error);
        this.alert.state = true;
        this.alert.color = "error";
        this.alert.text = "ERROR : No se pudo Obtener las categorias";
      }
    },

    async getOneProduct() {
      try {
        const response = await ProductService.getOneProduct(
          this.$route.params.id
        );
        this.product = response.data.product;
      } catch (error) {
        this.showSessionExpiredModal(error);
        this.alert.state = true;
        this.alert.color = "error";
        this.alert.text = "ERROR : No encontrado";
        setTimeout(() => {
          this.$router.push("/dashboard/products");
        }, 1000);
      }
    },

    async updateProduct() {
      try {
        if (typeof(this.product.category_id) === 'object') {
          this.product.category_id = this.product.category_id.id;
        }
          console.log(this.product);
        const response = await ProductService.updateProduct(
          this.$route.params.id,
          this.product
        );
        this.alert.state = true;
        this.alert.color = "success";
        this.alert.text = "ÉXITO : Se guardaron los datos correctamente";
        setTimeout(() => {
          this.$router.push("/dashboard/products");
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

  watch: {

  },

  mounted() {
    this.loadCategories();
    this.getOneProduct();
  }
};
</script>

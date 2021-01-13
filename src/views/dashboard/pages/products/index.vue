<template>
  <v-container id="regular-tables" fluid tag="section">
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

    <base-v-component
      heading="Administrar Productos"
      link="components/simple-tables"
    />

    <base-material-card
      color="primary"
      icon="mdi-chart-bubble"
      title="PRODUCTOS"
      class="px-5 py-3"
    >
      <v-data-table
        :headers="headers"
        :items="products"
        :search="search"
        id="dtProducts"
      >
        <template v-slot:top>
          <!-- Toolbar-->
          <v-toolbar class="mt-6 toolbar" flat>
            <v-spacer></v-spacer>
            <!-- search input -->
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>

            <v-spacer></v-spacer>
            <v-btn color="indigo" to="/dashboard/products/create">
              <v-icon color="white" left>mdi-plus</v-icon>
              AGREGAR
            </v-btn>
          </v-toolbar>
        </template>

        
        <!-- columns modifications -->
         <template v-slot:item.unit_price="{ item }">
            {{ item.unit_price }} <span class="font-weight-bold" >{{ currency }}</span>
        </template>
         <template v-slot:item.total_in_stock="{ item }">
            {{ item.total_in_stock }} <span class="font-weight-bold" >{{ currency }}</span>
        </template>

        <!-- actions buttons -->
        <template v-slot:item.actions="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="elevation-2 info mx-2"
                v-bind="attrs"
                v-on="on"
                small
                @click="showProduct(item)"
              >
                <v-icon>
                  mdi-eye
                </v-icon>
              </v-btn>
            </template>
            <span>Mostrar</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="elevation-2 mx-2"
                color="orange"
                v-bind="attrs"
                v-on="on"
                small
                :to="`/dashboard/products/edit/${item.id}`"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Editar</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="elevation-2 mx-2"
                color="red"
                v-bind="attrs"
                v-on="on"
                small
                @click="openModalDelete(item.id)"
              >
                <v-icon>
                  mdi-delete
                </v-icon>
              </v-btn>
            </template>
            <span>Eliminar</span>
          </v-tooltip>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="loadProducts">Actualizar</v-btn>
        </template>
      </v-data-table>
    </base-material-card>

    <!-- modal show -->
    <v-dialog v-model="showModal" max-width="500px">
      <show :product="product" @closeShowModal="closeShowModal"></show>
    </v-dialog>

    <!-- modal delete -->
    <v-dialog v-model="deleteModal" max-width="380">
      <v-card>
        <v-card-title>
          ¿Estas Seguro?

          <v-spacer />

          <v-icon aria-label="Close" @click="deleteModal = false">
            mdi-close
          </v-icon>
        </v-card-title>

        <v-card-text class="pb-2 pt-2 text-center">
          <v-row>
            <v-col cols="12">
              <v-icon color="warning" style="font-size: 100px; opacity: .5;"
                >mdi-alert-circle-outline</v-icon
              >
              <br />
              ¡No podrás revertir esto!
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6">
              <v-btn color="red" class="mr-3" @click="deleteModal = false">
                <v-icon left>mdi-cancel</v-icon>
                Cancelar
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6">
              <v-btn color="indigo" @click="deleteProduct()">
                <v-icon left>mdi-delete</v-icon>
                Si, Eliminar
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import ProductService from "@/services/product.service";
import configurationService from '@/services/configuration.service'
import Product from "@/models/Product";
import show from "./show.vue";
import Auth from "@/mixins/auth";

export default {
  components: { show },

  mixins: [Auth],

  data: () => ({
    search: "",
    headers: [
      { text: "ID", value: "id" },
      { text: "Nombre", align: "start", sortable: true, value: "name" },
      { text: "Stock", value: "quantity" },
      { text: "Precio Unitario", align: "right", value: "unit_price" },
      { text: "Total en stock", align: "right", value: "total_in_stock" },
      { text: "categoria", value: "category_name" },
      { text: "Acción", value: "actions", sortable: false }
    ],
    products: [],
    product: new Product("", "", "", "", ""),
    productId: null,
    showModal: false,
    deleteModal: false,
    alert: {
      state: false,
      color: "success",
      text: "",
      x: "right",
      y: "top"
    },
    currency: null,
  }),

  methods: {
    showProduct(product) {
      Object.assign(this.product, product);
      this.showModal = true;
    },

    closeShowModal() {
      this.showModal = false;
    },

    openModalDelete(id) {
      this.deleteModal = true;
      this.productId = id;
    },

    async loadProducts() {
      try {
        const response = await ProductService.getAllProducts();
        this.products = response.data.products;
        // configuration
        const res = await configurationService.getOneConfiguration(1);
        this.currency = res.data.setting.currency;
      } catch (error) {
        this.showSessionExpiredModal(error);
      }
    },

    async deleteProduct() {
      try {
        const response = await ProductService.deleteProduct(this.productId);
        this.deleteModal = false;
        this.loadProducts();
        this.alert.color = "success";
        this.alert.text = `ÉXITO : Se eliminó correctamente`;
        this.alert.state = true;
      } catch (error) {
        this.showSessionExpiredModal(error);
        this.alert.color = "error";
        this.alert.text = `ERROR : No se pudo eliminar`;
        this.alert.state = true;
      }
    }
  },

  mounted() {
    this.loadProducts();
  }
};
</script>

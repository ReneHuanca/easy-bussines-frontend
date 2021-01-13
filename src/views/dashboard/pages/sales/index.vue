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
      heading="Administrar Ventas"
      link="components/simple-tables"
    />

    <base-material-card
      color="primary"
      icon="mdi-currency-usd-circle"
      title="VENTAS"
      class="px-5 py-3"
    >
      <v-data-table
        :headers="headers"
        :items="sales"
        :search="search"
        id="dtSales"
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
            <v-btn color="indigo" to="/dashboard/sales/create">
              <v-icon color="white" left>mdi-plus</v-icon>
              REALIZAR VENTA
            </v-btn>
          </v-toolbar>
        </template>

        <!-- columns modifications -->
         <template v-slot:item.unit_price="{ item }">
            {{ item.unit_price }} <span class="font-weight-bold" >{{ currency }}</span>
        </template>
         <template v-slot:item.total="{ item }">
            {{ item.total }} <span class="font-weight-bold" >{{ currency }}</span>
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
                @click="showSale(item)"
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
          <v-btn color="primary" @click="loadSales">Actualizar</v-btn>
        </template>
      </v-data-table>
    </base-material-card>

    <!-- modal show -->
    <v-dialog v-model="showModal" max-width="500px">
      <show :sale="sale" @closeShowModal="closeShowModal"></show>
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
              <v-btn color="indigo" @click="deleteSale()">
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
import SaleService from "@/services/sale.service";
import configurationService from '@/services/configuration.service'
import Sale from "@/models/Sale";
import show from "./show.vue";
import Auth from "@/mixins/auth";

export default {
  components: { show },

  mixins: [Auth],

  data: () => ({
    search: "",
    headers: [
      { text: "ID", value: "id" },
      { text: "Nombre Producto", align: "start", sortable: true, value: "product_name" },
      { text: "Precio Unitario", align: "right", value: "unit_price" },
      { text: "Cantidad", value: "quantity" },
      { text: "Nombre Cliente", value: "customer_name" },
      { text: "Fecha", value: "created_at" },
      { text: "Total",  align: "right", value: "total" },
      { text: "Acción", value: "actions", sortable: false }
    ],
    sales: [],
    sale: new Sale("", "", "", "", "", "", ""),
    saleId: null,
    showModal: false,
    deleteModal: false,
    alert: {
      state: false,
      color: "success",
      text: "",
      x: "right",
      y: "top"
    },
    currency: '',
  }),

  methods: {
    showSale(sale) {
      Object.assign(this.sale, sale);
      this.showModal = true;
    },

    closeShowModal() {
      this.showModal = false;
    },

    openModalDelete(id) {
      this.deleteModal = true;
      this.saleId = id;
    },

    async loadSales() {
      try {
        const response = await SaleService.getAllSales();
        this.sales = response.data.sales;
        // configuration
        const res = await configurationService.getOneConfiguration(1);
        this.currency = res.data.setting.currency;
      } catch (error) {
        this.showSessionExpiredModal(error);
      }
    },

    async deleteSale() {
      try {
        const response = await SaleService.deleteSale(this.saleId);
        this.deleteModal = false;
        this.loadSales();
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
    this.loadSales();
  }
};
</script>

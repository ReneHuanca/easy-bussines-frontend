<template>
  <!-- Card Of show modal-->
  <v-card>
    <v-card-title>
      <span class="headline">MOSTRANDO CLIENTE</span>
    </v-card-title>
    <v-card-text>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="info">
            mdi-chart-bubble
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ sale.product_name }}</v-list-item-title>
          <v-list-item-subtitle>Producto</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="info">
            mdi-currency-usd-circle
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ sale.unit_price }}</v-list-item-title>
          <v-list-item-subtitle>Precio Unitario</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="info">
            mdi-counter
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ sale.quantity }}</v-list-item-title>
          <v-list-item-subtitle>Cantidad</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="info">
            mdi-currency-usd-circle
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ sale.total }}</v-list-item-title>
          <v-list-item-subtitle>Total a pagar</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="info">
            mdi-account-group
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ sale.customer_name }}</v-list-item-title>
          <v-list-item-subtitle>Cliente</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="info">
            mdi-date
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ sale.created_at }}</v-list-item-title>
          <v-list-item-subtitle>Fecha de la venta</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      
    </v-card-text>
    <v-card-actions>
      <v-btn color="muted" class="ml-3" @click="closeShowModal">
        <v-icon left>mdi-cancel</v-icon>
        CERRAR
      </v-btn>
      <v-spacer></v-spacer>
      <!-- <v-btn color="warning" :to="`/dashboard/sales/edit/${sale.id}`">
        <v-icon left>mdi-pencil</v-icon>
        EDITAR
      </v-btn> -->
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    sale: Object
  },

  methods: {
      closeShowModal() {
          this.$emit("closeShowModal");
      }
  }
};
</script>

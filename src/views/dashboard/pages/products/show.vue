<template>
  <!-- Card Of show modal-->
  <v-card>
    <v-card-title>
      <span class="headline">MOSTRANDO PRODUCTO</span>
    </v-card-title>
    <v-card-text>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="info">
            mdi-cart
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ product.name }}</v-list-item-title>
          <v-list-item-subtitle>Nombre</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="info">
            mdi-counter
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ product.quantity }}</v-list-item-title>
          <v-list-item-subtitle>Cantidad</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="info">
            mdi-currency-usd-circle-outline
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ product.unit_price }}</v-list-item-title>
          <v-list-item-subtitle>Precio Unitario</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="info">
            mdi-home-currency-usd
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ product.total_in_stock }}</v-list-item-title>
          <v-list-item-subtitle>Total en stock</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="info">
            mdi-apps
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ product.category_name }}</v-list-item-title>
          <v-list-item-subtitle>Categoria</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card-text>
    <v-card-actions>
      <v-btn color="muted" class="ml-3" @click="closeShowModal">
        <v-icon left>mdi-cancel</v-icon>
        CERRAR
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="warning" :to="`/dashboard/products/edit/${product.id}`">
        <v-icon left>mdi-pencil</v-icon>
        EDITAR
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    product: Object
  },

  methods: {
      closeShowModal() {
          this.$emit("closeShowModal");
      }
  }
};
</script>

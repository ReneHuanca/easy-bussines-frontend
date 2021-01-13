<template>
  <!-- Card Of show modal-->
  <v-card>
    <v-card-title>
      <span class="headline">MOSTRANDO CATEGORIA</span>
    </v-card-title>
    <v-card-text>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="info">
            mdi-apps
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ category.name }}</v-list-item-title>
          <v-list-item-subtitle>Nombre</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card-text>
    <v-card-actions>
      <v-btn color="muted" class="ml-3" @click="closeShowModal">
        <v-icon left>mdi-cancel</v-icon>
        CERRAR
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="warning" :to="`/dashboard/categories/edit/${category.id}`">
        <v-icon left>mdi-pencil</v-icon>
        EDITAR
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    category: Object
  },

  methods: {
      closeShowModal() {
          this.$emit("closeShowModal");
      }
  }
};
</script>

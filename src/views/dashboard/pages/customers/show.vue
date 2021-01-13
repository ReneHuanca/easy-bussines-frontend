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
            mdi-face
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ customer.name }}</v-list-item-title>
          <v-list-item-subtitle>Nombre</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="info">
            mdi-email
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ customer.email }}</v-list-item-title>
          <v-list-item-subtitle>Email</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="info">
            mdi-phone
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ customer.phone }}</v-list-item-title>
          <v-list-item-subtitle>Telefono</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="info">
            mdi-domain
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ customer.company }}</v-list-item-title>
          <v-list-item-subtitle>Compania</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="info">
            mdi-earth
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ customer.country }}</v-list-item-title>
          <v-list-item-subtitle>Pais</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="info">
            mdi-city
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ customer.city }}</v-list-item-title>
          <v-list-item-subtitle>Ciudad</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="info">
            mdi-monitor
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ customer.website }}</v-list-item-title>
          <v-list-item-subtitle>Sitio Web</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="info">
            mdi-web
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ customer.social }}</v-list-item-title>
          <v-list-item-subtitle>Redes Sociales</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="info">
            mdi-history
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <p>{{ customer.history }}</p>
          <v-list-item-subtitle>Historial del cliente</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card-text>
    <v-card-actions>
      <v-btn color="muted" class="ml-3" @click="closeShowModal">
        <v-icon left>mdi-cancel</v-icon>
        CERRAR
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="warning" :to="`/dashboard/customers/edit/${customer.id}`">
        <v-icon left>mdi-pencil</v-icon>
        EDITAR
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    customer: Object
  },

  methods: {
      closeShowModal() {
          this.$emit("closeShowModal");
      }
  }
};
</script>

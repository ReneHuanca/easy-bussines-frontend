<template>
  <v-container id="categorie-edit" fluid tag="section">
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
              Editar Categoria
            </div>
          </template>

          <v-form @submit.prevent="updateCategory()">
            <v-container class="py-0">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    color="warning"
                    prepend-icon="mdi-face"
                    v-model="category.name"
                    label="Nombre de la Categoria"
                    autofocus
                  ></v-text-field>
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
import Category from "@/models/Category";
import CategoryService from "@/services/category.service";
import Auth from "@/mixins/auth"

export default {
  mixins: [Auth],

  data: () => ({
    category: new Category(""),
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
    async getOneCategory() {
      try {
        const response = await CategoryService.getOneCategory(
          this.$route.params.id
        );
        this.category = response.data.category;
      } catch (error) {
        this.showSessionExpiredModal(error);
        this.alert.state = true;
        this.alert.color = "error";
        this.alert.text = "ERROR : No encontrado";
        setTimeout(() => {
          this.$router.push("/dashboard/categories");
        }, 1000);
      }
    },

    async updateCategory() {
      try {
        const response = await CategoryService.updateCategory(
          this.$route.params.id,
          this.category
        );
        this.alert.state = true;
        this.alert.color = "success";
        this.alert.text = "ÉXITO : Se guardaron los datos correctamente";
        setTimeout(() => {
          this.$router.push("/dashboard/categories");
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
    this.getOneCategory();
  }
};
</script>

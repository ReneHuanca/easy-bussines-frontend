<template>
  <v-container id="category" fluid tag="section">
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
              Agregar Nuevo Categoria
            </div>
          </template>

          <v-form @submit.prevent="addCategory()">
            <v-container class="py-0">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    color="indigo"
                    prepend-icon="mdi-face"
                    v-model="category.name"
                    label="Nombre del Categoria"
                    autofocus
                  ></v-text-field>
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
    errors: {},

    sessionExpiredModal: false
  }),

  methods: {
    async addCategory() {
      try {
        const response = await CategoryService.addCategory(this.category);
        this.alert.state = true;
        this.alert.color = "success";
        this.alert.text = "ÉXITO : Se guardaron los datos correctamente";
        // para que se pueda ver el mensaje
        setTimeout(() => {
          this.$router.push("/dashboard/categories");
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
    },
  },
};
</script>

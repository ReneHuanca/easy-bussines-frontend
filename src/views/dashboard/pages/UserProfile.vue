<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="7">
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

        <base-material-card color="green">
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Mi Perfil
            </div>

            <div class="subtitle-1 font-weight-light">
              Completa tu perfil
            </div>
          </template>

          <v-form @submit.prevent="updateUser()">
            <v-container class="py-0">
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    class="purple-input"
                    label="Nombre de Usuario"
                    v-model="user.name"
                  />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    label="Nombres"
                    class="purple-input"
                    v-model="user.first_name"
                  />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    label="Apellidos"
                    class="purple-input"
                    v-model="user.last_name"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    label="Correo Electronico"
                    class="purple-input"
                    v-model="user.email"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    label="Dirección"
                    class="purple-input"
                    v-model="user.address"
                  />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    label="Cuidad"
                    class="purple-input"
                    v-model="user.city"
                  />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    label="Pais"
                    class="purple-input"
                    v-model="user.country"
                  />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    class="purple-input"
                    label="Telefono / celular"
                    type="number"
                    v-model="user.phone"
                  />
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    class="purple-input"
                    label="Acerca de mí o frase favorita"
                    v-model="user.about_me"
                    rows="5"
                  />
                </v-col>

                <!-- Errors -->
                <!-- <v-col
                  cols="12"
                >
                  <v-alert
                    border="left"
                    dismissible
                    type="error"
                  >
                    error
                  </v-alert>
                </v-col> -->

                <v-col cols="12" class="text-right">
                  <v-btn color="success" class="mr-0" type="submit">
                    Guardar cambios
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>

        <!-- Card change password -->
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Cambiar Contraseña
            </div>

            <div class="subtitle-1 font-weight-light">
              Guarde su contraseña en un sitio seguro
            </div>
          </template>

          <v-form @submit.prevent="changePassword()">
            <v-container class="py-0">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    class="purple-input input-group--focused"
                    label="Nueva Contraseña"
                    v-model="user.password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    name="password"
                    hint="Al menos 8 caracteres"
                    @click:append="show1 = !show1"
                    required
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    class="purple-input"
                    label="Repetir Contraseña"
                    v-model="user.password_confirmation"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    name="password_confirmed"
                    hint="Al menos 8 caracteres"
                    @click:append="show2 = !show2"
                    required
                  />
                </v-col>

                <v-col cols="12" class="text-right">
                  <v-btn color="primary" class="mr-0" type="submit">
                    Cambiar Contraseña
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>

      <v-col cols="12" md="5">
        <base-material-card
          class="v-card-profile"
          avatar="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
        >
          <v-card-text>
            <div  class="text-center">
              <h6 class="display-1 mb-1 grey--text">
                {{ user.email }}
              </h6>
              
              <h4 class="display-2 font-weight-light mb-3 black--text">
                {{ user.first_name }} {{ user.last_name }}
              </h4>
              
              <p class="font-weight-light grey--text">
                {{ user.about_me }}
              </p>
            </div>
            
            <v-divider class="mb-2" />

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="info">
                  mdi-home
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <p>{{ user.address }}</p>
                <v-list-item-subtitle
                  >Dirección</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="info">
                  mdi-city
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <p>{{ user.city }}</p>
                <v-list-item-subtitle
                  >Ciudad</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="info">
                  mdi-earth
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <p>{{ user.country }}</p>
                <v-list-item-subtitle
                  >País</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="info">
                  mdi-phone
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <p>{{ user.phone }}</p>
                <v-list-item-subtitle
                  >Telefono</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import User from "@/models/User";
import AuthService from "@/services/auth.service";
import UserService from "@/services/user.service";
import Auth from "@/mixins/auth"

export default {
  mixins: [Auth],
  name: "UserProfile",

  data: () => ({
    user: new User("", "", ""),
    show1: false,
    show2: false,
    alert: {
      state: false,
      color: "success",
      text: "",
      x: "right",
      y: "top"
    }
  }),

  methods: {
    async me() {
      try {
        const response = await AuthService.me();
        this.user = response.data;
      } catch (error) {
        this.showSessionExpiredModal(error);
      }
    },
    async updateUser() {
      try {
        this.user.last_user = this.user.id;
        const response = await UserService.updateUser(this.user.id, this.user);
        if (response) {
          this.alert.state = true;
          this.alert.color = "success";
          this.alert.text = "ÉXITO : Se guardaron los datos correctamente";
        }
      } catch (error) {
        this.showSessionExpiredModal(error);
        this.alert.state = true;
        this.alert.color = "error";
        this.alert.text = "ERROR : Datos incorrectos, no se pudo actualizar";
        console.log(error.response.data);
      }
    },
    async changePassword() {
      try {
        const response = await AuthService.changePassword(this.user);
        if (response) {
          this.alert.state = true;
          this.alert.color = "success";
          this.alert.text = "ÉXITO : La contraseña se modificó correctamente";
        }
      } catch (error) {
        this.showSessionExpiredModal(error);
        this.alert.state = true;
        this.alert.color = "error";
        this.alert.text = "ERROR : Contraseña no válida";
      }
    }
  },

  mounted() {
    this.me();
  }
};
</script>

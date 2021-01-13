<template>
  <v-app id="inspire">
    <v-main>
      <v-container
        class="fill-height"
      >
        <v-row
          align="center"
          justify="center"
		  no-gutters
        >
          <v-col
            cols="12"
            md="4"
          >
            <v-card 
				class="mx-auto elevation-0 pa-4 rounded-xl " 
				max-width="480"
			>
				<h1 class="text-center">Welcome</h1>
				<v-card-text>
					<v-row
						justify="center"
						align="center"
						class="pa-4"
					>
						<svg id="457bf273-24a3-4fd8-a857-e9b918267d6a" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="110" height="110" viewBox="0 0 698 698"><defs><linearGradient id="b247946c-c62f-4d08-994a-4c3d64e1e98f" x1="349" y1="698" x2="349" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="gray" stop-opacity="0.25"/><stop offset="0.54" stop-color="gray" stop-opacity="0.12"/><stop offset="1" stop-color="gray" stop-opacity="0.1"/></linearGradient></defs><title>profile pic</title><g opacity="0.5"><circle cx="349" cy="349" r="349" fill="url(#b247946c-c62f-4d08-994a-4c3d64e1e98f)"/></g><circle cx="349.68" cy="346.77" r="341.64" fill="#f5f5f5"/><path d="M601,790.76a340,340,0,0,0,187.79-56.2c-12.59-68.8-60.5-72.72-60.5-72.72H464.09s-45.21,3.71-59.33,67A340.07,340.07,0,0,0,601,790.76Z" transform="translate(-251 -101)" fill="#00bfa6"/><circle cx="346.37" cy="339.57" r="164.9" fill="#333"/><path d="M293.15,476.92H398.81a0,0,0,0,1,0,0v84.53A52.83,52.83,0,0,1,346,614.28h0a52.83,52.83,0,0,1-52.83-52.83V476.92a0,0,0,0,1,0,0Z" opacity="0.1"/><path d="M296.5,473h99a3.35,3.35,0,0,1,3.35,3.35v81.18A52.83,52.83,0,0,1,346,610.37h0a52.83,52.83,0,0,1-52.83-52.83V476.35A3.35,3.35,0,0,1,296.5,473Z" fill="#fdb797"/><path d="M544.34,617.82a152.07,152.07,0,0,0,105.66.29v-13H544.34Z" transform="translate(-251 -101)" opacity="0.1"/><circle cx="346.37" cy="372.44" r="151.45" fill="#fdb797"/><path d="M489.49,335.68S553.32,465.24,733.37,390l-41.92-65.73-74.31-26.67Z" transform="translate(-251 -101)" opacity="0.1"/><path d="M489.49,333.78s63.83,129.56,243.88,54.3l-41.92-65.73-74.31-26.67Z" transform="translate(-251 -101)" fill="#333"/><path d="M488.93,325a87.49,87.49,0,0,1,21.69-35.27c29.79-29.45,78.63-35.66,103.68-69.24,6,9.32,1.36,23.65-9,27.65,24-.16,51.81-2.26,65.38-22a44.89,44.89,0,0,1-7.57,47.4c21.27,1,44,15.4,45.34,36.65.92,14.16-8,27.56-19.59,35.68s-25.71,11.85-39.56,14.9C608.86,369.7,462.54,407.07,488.93,325Z" transform="translate(-251 -101)" fill="#333"/><ellipse cx="194.86" cy="372.3" rx="14.09" ry="26.42" fill="#fdb797"/><ellipse cx="497.8" cy="372.3" rx="14.09" ry="26.42" fill="#fdb797"/></svg>
					</v-row>

					<validation-observer
						ref="observerLogin"
					>
						<v-form @submit.prevent="handleLogin">
						<validation-provider
							v-slot="{ errors }"
							name="email"
							rules="required|email"
						>
						<v-text-field
							ref="email"
							label="Email"
							prepend-icon="mdi-email"
							type="email"
							v-model="user.email"
							:error-messages="errors"
							required
						></v-text-field>
						</validation-provider>

						<v-text-field
							id="password"
							label="Contraseña"
							prepend-icon="mdi-lock"
							v-model="user.password"
							:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
							:type="showPassword ? 'text' : 'password'"
							@click:append="showPassword = !showPassword"
						></v-text-field>
						<v-spacer></v-spacer> 
						<v-alert
							v-if="message"
							transition="scale-transition"
							class="py-2"
							type="error"
							>
							{{ message }}
						</v-alert>
						<v-spacer v-if="!message" class="my-5"></v-spacer>
						<v-btn block type="submit" color="primary" rounded>
							<v-icon v-if="!loading" class="mr-2">mdi-import</v-icon>
							<span v-if="!loading">INGRESAR</span> 
							<v-progress-circular
								v-if="loading"
								:indeterminate="loading"
								:value="100"
							></v-progress-circular>
						</v-btn>
						</v-form>
					</validation-observer>
				</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
	// vee-validate
	import { required, email, max } from 'vee-validate/dist/rules'
	import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

	setInteractionMode('eager')

	extend('required', {
		...required,
		message: 'El {_field_} no puede ser vacio',
	})

	extend('max', {
		...max,
		message: 'El {_field_} no puede tener más de {length} caracteres',
	})

	extend('email', {
		...email,
		message: 'El email debe ser válido',
	})	
	// end vee-validate


	import User from '@/models/User'
	import AuthService from '@/services/auth.service'
	import { mapState } from 'vuex'

  	export default {
		components: {
			ValidationProvider,
			ValidationObserver,
		},

		name: 'Login',

		data: () => ({
			user: new User('', 'rene@gmail.com', 'rene123'),
			message: '',
			errors: '',
			loading: false,
			showPassword: false,
		}),

		computed: {
			...mapState('auth', ['status'])
		},

		methods: {
			async handleLogin() {
				this.$refs.observerLogin.validate();
				this.loading = true;
				try {
					await this.$store.dispatch('auth/login', this.user)
					this.$router.push('/dashboard')
				} catch (error) {
					this.loading = false
					this.message = "Datos incorrectos"
					// this.user = new User('', '', '')
					this.$refs.email.focus();

					console.log('Unauthorized: ',error.response)
				} 
			},
		},

		watch: {
			message: function(newValue, oldValue){
				setTimeout(() => {
					if(newValue != '') {
						this.message = ''
					}
				}, 5000)
			}
		},

		created() {
			if(this.status.loggedIn) {
				this.$router.push('/dashboard')
			}
		},
  	}
</script>

<style lang="scss">
	#inspire {
		background-image: linear-gradient(to top, #37ecba 0%, #72afd3 100%);
	}
</style>


import AuthService from '../services/auth.service'

const auth = {
    data: () => ({

    }),

    methods: {
        // Unauthorized
        showSessionExpiredModal(error) {
            try {
                if (error.response.status === 401) {
                    this.$store.commit("SET_SESSION_EXPIRED_MODAL", true);
                    setTimeout(() => {
                        this.$store.commit("SET_SESSION_EXPIRED_MODAL", false);
                        this.$store.dispatch("auth/logout");
                        this.$router.push("/login");  
                    }, 5000);
                } else {
                    console.log("error: ",error)
                }
            } catch (e) {
                console.log("El error en mixin/auth es : ",e);
                console.error("\nEL ERROR VERDADERO ES: ", error);
            }
        }
    },
    
    computed: {

    },


}

export default auth
<template>
    <!-- modal delete -->
      <v-dialog :value="dialog" @input="$emit('deleteItem')" max-width="380">
        <v-card>
          <v-card-title>
            ¿Estas Seguro?

            <v-spacer />

            <v-icon aria-label="Close" @click="dialog = false">
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
                <v-btn color="red" class="mr-3" @click="dialog = false">
                  <v-icon left>mdi-cancel</v-icon>
                  Cancelar
                </v-btn>
              </v-col>
              <v-col cols="12" sm="6">
                <v-btn color="indigo" @click="deleteItem()">
                  <v-icon left>mdi-delete</v-icon>
                  Si, Eliminar
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
</template>

<script>
export default {
    name: 'DialogDelete',

    props: {
        dialog: {
            type: Boolean,
            default: false,
        }
    },

    methods: {
        deleteItem() {
            this.$emit('deleteItem');
        },
    },
    
}
</script>
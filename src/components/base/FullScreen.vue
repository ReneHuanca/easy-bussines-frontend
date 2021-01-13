<template>
    <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="ml-2"
            min-width="0"
            text
            v-bind="attrs"
            v-on="on"
            @click="toggleFullScreen"
          >
            <v-icon>
                {{ iconFullScreen }}
            </v-icon>
          </v-btn>
        </template>
        <span>{{ tooltipFullScreen }}</span>
    </v-tooltip>
</template>

<script>
export default {
    name: 'FullScreen',

    data: () => ({
        isFullScreen: false,
        iconFullScreen: 'mdi-fullscreen',
        tooltipFullScreen: 'Pantalla Completa'
    }),

    methods: {
        launchFullScreen(element) {
            if(!element.fullscreenElement){
                if(element.requestFullScreen) {
                    element.requestFullScreen();
                } else if(element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if(element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                }
            }
        },
        cancelFullScreen() {
            if(document.fullscreenElement){
                if(document.cancelFullScreen) {
                    document.cancelFullScreen();
                } else if(document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if(document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                }
            }
        },
        toggleFullScreen() {
            if(this.isFullScreen) {
                this.iconFullScreen = 'mdi-fullscreen';
                this.tooltipFullScreen = 'Pantalla completa';
                this.cancelFullScreen();
            } else {
                this.iconFullScreen = 'mdi-fullscreen-exit';
                this.tooltipFullScreen = 'Salir pantalla completa';
                this.launchFullScreen(document.documentElement);
            }
            this.isFullScreen = !this.isFullScreen;
        }
    },
}
</script>
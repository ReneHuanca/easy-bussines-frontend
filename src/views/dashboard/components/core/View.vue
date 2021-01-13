<template>
  <v-content>
    <!-- modal sesión expired -->
    <base-dialog-session-expired />

    <router-view />
    <dashboard-core-footer />
  </v-content>
</template>

<script>
  import AuthService from '@/services/auth.service';

  export default {
    name: 'DashboardCoreView',

    components: {
      DashboardCoreFooter: () => import('./Footer'),
    },
  }
</script>

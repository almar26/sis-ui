<template>
  <div>
    <BaseBreadcrumb
      :title="page.title"
      :icon="page.icon"
      :breadcrumbs="breadcrumbs"
    ></BaseBreadcrumb>
   
    <div class="d-flex align-center justify-center" style="height: 60vh">
      <v-card class="elevation-0 text-center py-16" color="transparent">
      <!-- <v-icon size="80" color="warning">mdi-alert-outline</v-icon> -->
      <v-img src="/public/maintenance.png" class="mx-auto" :width="130"></v-img>
      <div class="service-notif">Service Unavailable</div>
    </v-card>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const page = ref({
  title: "List of Classes",
});
const breadcrumbs = ref([
  {
    title: "Dashboard",
    disabled: false,
    to: "/",
  },

  {
    title: "Teachers",
    disabled: true,
  },
]);
</script>

<style scoped>
.service-notif {
  font-size: 20px;
  color: grey;
}
</style>


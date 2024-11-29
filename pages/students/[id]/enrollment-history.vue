<template>
  <div>
    <BaseBreadcrumb
      :title="page.title"
      :icon="page.icon"
      :breadcrumbs="breadcrumbs"
    ></BaseBreadcrumb>
    <v-row v-if="isEmpty">
      <h1>No Record Found</h1>
    </v-row>
    <v-row dense v-else>
      <v-col cols="12" md="2">
        <StudentSideBar />
      </v-col>
      <v-col cols="12" md="10">
        <v-card class="elevation-0 text-center py-16">
          <v-icon size="80" color="warning">mdi-alert-outline</v-icon>
          <div class="service-notif">Service Unavailable</div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
const route = useRoute();
const page = ref({
  title: "Enrollment History",
});
const breadcrumbs = ref([
  {
    title: "Dashboard",
    disabled: false,
    to: "/",
  },
  {
    title: "Students",
    disabled: false,
    to: "/students",
  },
  {
    title: "Details",
    disabled: false,
    to: `/students/${route.params.id}`,
  },
  {
    title: "Enrollment History",
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

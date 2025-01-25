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
        <StudentSideBar :studentDetails="studentDetails"/>
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
  title: "Subjects",
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
    title: "Subjects",
    disabled: true,
  },
]);
const items = ref([
  {
    icon: "mdi-account-circle",
    title: "Account",
    to: `/students/${route.params.id}`,
  },
  {
    icon: "mdi-book-multiple",
    title: "Subjects",
    to: `/students/${route.params.id}/subjects`,
  },
  {
    icon: "mdi-calendar-clock-outline",
    title: "Enrollment History",
    to: `/students/${route.params.id}/enrollment-history`,
  },
]);
const studentDetails = ref({});
const isEmpty = ref(false);

async function initialize() {
  try {
    let result = await $fetch(`/api/student/${route.params.id}`);
    //console.log(result);
    if (result) {
      studentDetails.value = result[0];
      if (result.length == 0) {
        //console.log("Empty Data")
        isEmpty.value = true;
      } else {
        // console.log("has data")
        isEmpty.value = false;
      }
    }
  } catch (err) {
    console.error("Failed to fetch data: ", err);
    throw err;
  }
}

onMounted(() => {
  initialize();
});
</script>

<style scoped>

.service-notif {
  font-size: 20px;
  color: grey
}


</style>


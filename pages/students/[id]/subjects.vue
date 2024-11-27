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
        <v-card class="elevation-0">
          <v-list density="compact" nav>
            <v-list-subheader color="green" class="label-header"
              >GENERAL</v-list-subheader
            >
            <!-- <v-list-item
          prepend-icon="mdi-account-circle"
          title="Account"
          :to="`/students/${route.params.id}`" 
        ></v-list-item>

        <v-list-item
          prepend-icon="mdi-book-multiple"
          title="Subjects"
     
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-calendar-clock-outline"
          title="Enrollment History"
        ></v-list-item> -->

            <v-list-item
              v-for="(link, i) in items"
              :key="i"
              :to="link.to"
              :title="link.title"
              :prepend-icon="link.icon"
            >
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-card-actions class="my-1">
            <!-- <v-btn color="primary" variant="flat" class="text-capitalize px-4"
              ><v-icon start>mdi-pencil</v-icon> Edit</v-btn
            > -->
            <v-spacer></v-spacer>
            <v-btn color="red" variant="tonal" block class="text-capitalize px-4"
              ><v-icon start>mdi-delete</v-icon> Delete Account</v-btn
            >
          </v-card-actions>
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

<style scoped lang="scss">
.v-application--is-ltr
  .v-list--dense.v-list--nav
  .v-list-group--no-action
  > .v-list-group__items
  > .v-list-item {
  padding: 0 0 9x 8px;
  color: #fff;
}
#main-sidebar {
  box-shadow: 1px 0 20px rgba(0, 0, 0, 0.08);
  -webkit-box-shadow: 1px 0 20px rgba(0, 0, 0, 0.08);
  .v-navigation-drawer__border {
    display: none;
  }
}
.label-header {
  font-size: 15px !important;
  font-weight: bold;
  margin-bottom: 15px;
}
.border {
  margin: 5px 8px 5px 8px;
  background: #4caf50;
  border-radius: 10px;
  text-decoration: none;
}
// .logout-border {
//   margin: 5px 8px 5px 8px;
//   border-radius: 10px;
//   text-decoration: none;
// }

.v-list-item-group .v-list-item--active {
  color: white !important;
}
.theme--light.v-list-item--active .v-list-item__subtitle {
  color: white !important;
}
</style>


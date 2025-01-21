<template>
  <div>
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>

    <!-- <div class="d-flex align-center justify-center" style="height: 60vh">
      <v-card class="elevation-0 text-center py-16" color="transparent">
      <v-img src="/public/maintenance.png" class="mx-auto" :width="130"></v-img>
      <div class="service-notif">Service Unavailable</div>
    </v-card>
    </div> -->

    <v-row>
      <v-col>
        <v-card elevation="0">
          <v-card-title class="d-flex align-center pe-2">
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>

            <v-text-field v-model="search" density="compact" label="Search" prepend-inner-icon="mdi-magnify"
              variant="solo-filled" flat hide-details single-line></v-text-field>
          </v-card-title>
          <v-divider></v-divider>
          <v-data-table density="compact" :search="search" :headers="headers" :items="teachersAccountList" :loading="loadingTable">
            <template v-slot:loadingTable>
              <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
            </template>
            <template v-slot:[`item.classes`]="{ item }">
              <v-btn variant="tonal" class="my-1" color="blue" :to="`/teachers/classes/${item.teacher_id}`"><v-icon
                  start>mdi-google-classroom</v-icon> View</v-btn>
            </template>
            <!-- <template v-slot:[`item.actions`]="{ item }">
            <v-tooltip text="Edit Account" location="top">
              <template v-slot:activator="{ props }">
                <v-btn size="medium" class="mr-2" variant="text" v-bind="props" icon="mdi-pencil"
                  @click="showUpdateTechearAccountDialog(item)" color="orange"></v-btn>
              </template>
            </v-tooltip>
           
          </template> -->
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
const route = useRoute();
const page = ref({
  title: "List of Teachers",
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
const headers = ref([
  { title: "Faculty No", sortable: false, align: "start", key: "faculty_no" },
  { title: "Lastname", sortable: true, key: "last_name" },
  { title: "Firstname", sortable: false, key: "first_name" },
  { title: "Middlename", sortable: false, key: "middle_name" },
  { title: "Email", sortable: false, key: "email" },
  { title: "Department", sortable: true, key: "department" },
  { title: "Gender", sortable: false, key: "gender" },
  { title: "Classes", sortable: false, key: "classes" },
  // { title: "", sortable: false, key: "actions" },
]);
const search = ref(null);
const loadingTable = ref(true);
const teachersAccountList = ref([]);

async function initialize() {
  try {
    let result = await $fetch(`/api/teacher-account/teachers-list`);
    if (result) {
      teachersAccountList.value = result;
      loadingTable.value = false;
      console.log(result)
    }
  } catch (err) {
    console.error("Failed to fetch data: ", err);
    throw err;
  }
}

onMounted(async () => {
  await initialize();
})
</script>

<style scoped>
.service-notif {
  font-size: 20px;
  color: grey;
}

:root {
  --v-border-color: grey;
  --v-border-opacity: 0.5;
}

:deep() .v-table .v-table__wrapper>table>thead>tr>th {
  border-right: thin solid rgba(var(--v-border-color), var(--v-border-opacity)) !important;
  border-bottom: thick solid rgba(var(--v-border-color), var(--v-border-opacity));
  font-weight: bold;
  /* background-color: #04aa6d;
  color: white; */
}

:deep() .v-table .v-table__wrapper>table>tbody>tr>td:not(:last-child),
.v-table .v-table__wrapper>table>tbody>tr>th:not(:last-child) {
  border-right: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
}

:deep() .v-table .v-table__wrapper>table>tbody>tr:nth-child(even) {
  background-color: #f2f2f2;
}

:deep() .v-table .v-table__wrapper>table>tbody>tr:hover {
  background-color: #f2f2f2;
}
</style>

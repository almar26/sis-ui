<template>
  <div>
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row v-if="isEmpty">
      <h1>No Record Found</h1>
    </v-row>
    <v-row dense v-else>
      <v-col cols="12" md="2">
        <StudentSideBar :studentDetails="studentDetails" />
      </v-col>
      <v-col cols="12" md="10">
        <v-card class="elevation-0">
          <v-toolbar color="white">
            <v-toolbar-title>List of Subjects</v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- <v-btn color="primary" class="mr-4" variant="outlined" @click="updateStudentSYHistoryDialog = true"><v-icon
                start>mdi-calendar-clock-outline</v-icon>
              Enroll</v-btn> -->
          </v-toolbar>
          <v-divider></v-divider>

          <v-data-table density="compact" :items="studentSubjects" :headers="headers" :loading="loading">
            <template v-slot:loading>
              <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
            </template>
            <template v-slot:[`item.teacher`]="{ item }">
              <v-menu location="top">
                <template v-slot:activator="{ props: menu }">
                  <v-tooltip text="Show Teacher" location="top">
                    <template v-slot:activator="{ props: tooltip }">
                      <v-btn size="small" class="mr-2" variant="outlined" v-bind="mergeProps(menu, tooltip)"
                        color="info">
                        <v-icon>mdi-account</v-icon></v-btn>
                    </template>
                  </v-tooltip>
                </template>
                <v-card>
                  <v-card-text>
                    <div class="mx-auto text-center">
                      <v-avatar color="green">
                        <v-icon icon="mdi-account-circle"></v-icon>
                      </v-avatar>
                      <h3 class="mt-2 text-caption">{{ item.teacher_details.faculty_no }}</h3>
                      <h4 class="mt-1">{{ item.teacher_details.first_name }} {{ item.teacher_details.last_name }}</h4>
                      <p class="text-caption mt-1">Department: {{ item.teacher_details.department }}</p>

                    </div>
                  </v-card-text>
                </v-card>
              </v-menu>
            </template>
            <!-- <template v-slot:[`item.teacher`]="{ item }">
                
                <v-btn variant="outlined" class="my-1" color="primary">{{ item.teacher_details?.first_name }} {{ item.teacher_details?.last_name }}</v-btn>
              </template> -->
          </v-data-table>

          <!-- <v-icon size="80" color="warning">mdi-alert-outline</v-icon>
         <div class="service-notif">Service Unavailable</div> -->
        </v-card>
      </v-col>
    </v-row>

  </div>
</template>

<script setup>
const route = useRoute();
import { mergeProps } from "vue";
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
const headers = ref([
  { title: "Code", key: "subject_code", sortable: false },
  { title: "Description", key: "title", sortable: false },
  { title: "Units", key: "unit", sortable: false },
  { title: "Grade", sortable: false, key: "grade" },
  { title: "Numeric Grade", key: "numeric_grade", sortable: false },
  { title: "Remarks", key: "remarks", sortable: false },
  { title: "School Year", key: "school_year", sortable: false },
  { title: "Semester", key: "semester", sortable: false },
  { title: "Teacher", key: "teacher", sortable: false },

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
const loading = ref(true);
const studentSubjects = ref([]);

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
};
async function showTeacher(teacherid) {
  //console.log(teacherid)
}
async function getStudentSubjects() {
  try {
    let result = await $fetch(`/api/student-subject/all-subjects/${route.params.id}`);
    if (result) {
      studentSubjects.value = result;
      loading.value = false;
    }
  } catch (err) {
    loading.value = false;
    console.error("Failed to fetch data: ", err);
    throw err;
  }
}

onMounted(async () => {
  await initialize();
  await getStudentSubjects();
});
</script>

<style scoped>
.service-notif {
  font-size: 20px;
  color: grey
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

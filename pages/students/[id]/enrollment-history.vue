<template>
  <div>
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row v-if="isEmpty">
      <h1>No Record Found</h1>
    </v-row>
    <v-row dense v-else>
      <v-col cols="12" md="2">
        <StudentSideBar :studentDetails="studentDetails"/>
      </v-col>
      <v-col cols="12" md="10">
        <v-card class="elevation-0">
          <v-toolbar color="white">
            <v-toolbar-title>Enrollment History</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="mr-4" variant="outlined" @click="updateStudentSYHistoryDialog = true"><v-icon
                start>mdi-calendar-clock-outline</v-icon>
              Enroll</v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-data-table density="compact" :items="enrollmentHistory" :headers="headers" :loading="loading">
            <template v-slot:loading>
              <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- DIALOG BOX -->
    <!-- Update Student  School Year -->
    <v-dialog v-model="updateStudentSYHistoryDialog" width="570" persistent>
      <v-card>
        <v-toolbar color="primary" density="comfortable">
          <v-toolbar-title><v-icon start size="small">mdi-calendar-clock-outline</v-icon> Enroll New School
            Year</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon="mdi-close" @click="updateStudentSYHistoryDialog = false"></v-btn>
        </v-toolbar>
        <!-- <v-divider></v-divider> -->
        <v-card-text class="mx-5 text-center">
          <!-- <v-icon size="80" color="warning">mdi-alert-outline</v-icon>
          <div class="service-notif">Service Unavailable</div> -->
          <v-form v-model="valid" ref="updateStudentCourseForm" lazy-validation>
            <v-row no-gutters>
              <v-col cols="12" md="12" sm="12">
                <!-- <label class="label text-grey-darken-2" for="email">Course</label> -->
                <v-select color="primary" :items="courses" item-title="code" item-value="code" label="Course*"
                  v-model="courseCode" variant="outlined" return-object required></v-select>
              </v-col>
              <v-col cols="12" md="12" sm="12">
                <v-text-field variant="outlined" label="School Year" v-model="schoolYear"></v-text-field>
              </v-col>
              <v-col cols="12" md="12" sm="12">
                <!-- <v-text-field variant="outlined" label="Semester"></v-text-field> -->
                <v-select :items="semesterList" label="Semester*" v-model="semester" :rules="rules.semester"
                  variant="outlined" required></v-select>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="mx-9 my-2">
          <v-btn block color="green" text="Enroll" class="font-weight-bold" prepend-icon="mdi-calendar-clock-outline"
            size="large" variant="flat" :loading="loadingUpdateSY" @click="updateSY()"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useMyAuthStore } from "~/stores/auth";
import { useToast } from "vue-toastification";
const { activeSY } = storeToRefs(useMyAuthStore());
const active_sy = ref(activeSY?.value);
const route = useRoute();
const toast = useToast();
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
const headers = ref([
  { title: "School Year", key: "school_year", sortable: false },
  { title: "Semester", key: "semester", sortable: false },
  { title: "Course Code", sortable: false, key: "course_code"},
  { title: "Course Description", key: "course_description", sortable: false },

]);
const rules = ref({
  course: [(v) => !!v || "Course is required"],
  semester: [(v) => !!v || "Semester is required"],
  schoolyearstart: [(v) => !!v || "School Year Start is required"],
  schoolyearend: [(v) => !!v || "School Year End is required"],
});
const isEmpty = ref(false);
const loading = ref(true);
const valid = ref(true);
const enrollmentHistory = ref([]);
const updateStudentSYHistoryDialog = ref(false);
const loadingUpdateSY = ref(false);
const studentId = ref("");
const courses = ref([]);
const courseCode = ref("")
const courseDesc = ref("");
const major = ref("");
const courseType = ref("");
const studentDetails = ref({})
const schoolYear = ref("");
const semester = ref("");
const semesterList = ref(["1st Semester", "2nd Semester", "Summer"]);

async function initialize() {
  try {
    let result = await $fetch(`/api/student/${route.params.id}`);

    if (result) {
      studentDetails.value = result[0]
      studentId.value = result[0].documentId;
      courseCode.value = result[0].course_code;
      courseDesc.value = result[0].course;
      major.value = result[0].major
      courseType.value = result[0].course_type
      schoolYear.value = active_sy.value?.school_year;
      semester.value = active_sy.value?.semester;
      //console.log(active_sy.value)
    }
  } catch (err) {
    console.error("Failed to fetch data: ", err);
    throw err;
  }
}

async function getStudentSYHistory() {
  try {
    let result = await $fetch(`/api/student-sy-history/${route.params.id}`);
    if (result) {
      //console.log(result);
      enrollmentHistory.value = result
      loading.value = false;
    }
  } catch (err) {
    loading.value = false;
    console.error("Failed to fetch data: ", err);
    throw err;
  }
}

async function getCoursesList() {
  try {
    let result = await $fetch("/api/course/getCourseList");
    if (result) {
      courses.value = result;
    }
  } catch (err) {
    console.error("Failed ot fetch data: ", err);
    throw err;
  }
}

async function updateSY() {
  let course_code_update;
  let course_desc_update;
  let major_update;
  let course_type_update;

  loadingUpdateSY.value = true;
  if (courseCode.value?.code === undefined) {
    course_code_update = courseCode.value;
    course_desc_update = courseDesc.value;
    major_update = major.value
    course_type_update = courseType.value;
  } else {
    course_code_update = courseCode.value?.code;
    course_desc_update = courseCode.value?.description;
    major_update = courseCode.value?.major;
    course_type_update = courseCode.value?.course_type;
  }
  let payload = {
    student_id: studentId.value,
    course_code: course_code_update,
    course_desc: course_desc_update,
    major: major_update,
    course_type: course_type_update,
    school_year: schoolYear.value,
    semester: semester.value
  }
  //console.log(payload);
  await $fetch(`/api/student-sy-history/create`, {
    method: "POST",
    body: payload,
  })
    .then(response => {
      //console.log("Response: ", response);
      if (response.status == "fail") {
        loadingUpdateSY.value = false;
        toast.error(response.message);
      } else {
        loadingUpdateSY.value = false;
        updateStudentSYHistoryDialog.value = false
        toast.success("Successfully Enrolled")
        getStudentSYHistory();
      }
    })
}

watch([updateStudentSYHistoryDialog], async () => {
  if (updateStudentSYHistoryDialog.value == false) {
    courseCode.value = studentDetails.value.course_code
    courseDesc.value = studentDetails.value.course
    major.value = studentDetails.value.major
    schoolYear.value = active_sy.value?.school_year;
    semester.value = active_sy.value?.semester;
  }
})

onMounted(async () => {
  await initialize();
  await getStudentSYHistory();
  await getCoursesList();
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

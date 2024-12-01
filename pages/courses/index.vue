<template>
  <div>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <!-- <h1>Courses Page</h1> -->
    <v-row>
      <v-col>
        
        
        <v-card elevation="0">
          <v-card-title class="d-flex align-center pe-2">
            <!-- <v-icon icon="mdi-book"></v-icon> &nbsp; List of Courses -->

            <v-spacer></v-spacer>
            <v-btn class="mb-3 text-capitalize" color="primary" @click="dialog = true" prepend-icon="mdi-plus">Create</v-btn>
           
          </v-card-title>

          <v-divider></v-divider>
          <v-data-table density="compact" class="custom-grid" :items="courseList" :headers="headers" :loading="loading">
            <template v-slot:loading>
              <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
              <v-tooltip text="View Course" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn size="medium" :to="`/courses/${item.documentId}`" variant="text" v-bind="props"
                    icon="mdi-open-in-new" color="green">
                  </v-btn>
                </template>
              </v-tooltip>
              <!-- <v-tooltip text="Delete Course" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn size="medium" icon="mdi-delete" v-bind="props" variant="text" color="red"></v-btn>
                </template>
              </v-tooltip> -->
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- DIALOG BOX -->
    <v-dialog max-width="500" v-model="dialog" scrollable persistent>
      <v-card>
        <!-- <v-card-title><v-icon>mdi-book</v-icon> Add Course <v-spacer></v-spacer> <v-icon>mdi-close</v-icon></v-card-title> -->
        <v-toolbar>
          <v-icon class="ml-4">mdi-book</v-icon>
          <v-toolbar-title>Create New Course</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="mx-5">
          <v-form v-model="valid" ref="createCourseForm" lazy-validation>
            <v-row dense>
              <v-col cols="12">
                <!-- <label class="label text-grey-darken-2" for="email">Course</label> -->
                <v-text-field label="Course Code*" v-model="courseCode" variant="outlined" :rules="rules.courseCode"
                  required></v-text-field>
              </v-col>

              <v-col cols="12">
                <!-- <label class="label mb-4" for="email">Student No</label> -->
                <v-text-field label="Course Description*" v-model="courseDesc" variant="outlined"
                  :rules="rules.courseDesc" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <!-- <label class="label mb-4" for="email">Student No</label> -->
                <v-text-field label="Major" v-model="major" variant="outlined" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <!-- <label class="label mb-4" for="email">Student No</label> -->
                <v-text-field label="Year" v-model="year" variant="outlined" :rules="rules.year" type="number"
                  required></v-text-field>
              </v-col>
              <v-col>
                <v-select color="primary" v-model="course_type" :items="['ched', 'tesda']" variant="outlined"
                  :rules="rules.courseType" label="Course Type*" required></v-select>
              </v-col>
            </v-row>

            <small class="text-caption text-medium-emphasis">*indicates required field</small>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="mx-5 my-2">
          <v-btn block color="green" text="Save" variant="flat" @click="createCourse()"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useMyAuthStore } from "~/stores/auth";
import { useToast } from "vue-toastification";
const { userInfo } = storeToRefs(useMyAuthStore());
const userData = ref(userInfo?.value.user);
const dialog = ref(false);
const valid = ref(true);
const loading = ref(false);
const createCourseForm = ref(null);
const search = ref(null);
const courseCode = ref("");
const courseDesc = ref("");
const major = ref("");
const year = ref(0);
const course_type = ref("");
const toast = useToast();
const courseList = ref([]);
const page = ref({
  title: `${userData.value.role_view} Courses`,
});
const breadcrumbs = ref([
  {
    title: "Dashboard",
    disabled: false,
    to: "/",
  },
  {
    title: "Courses",
    disabled: true,
  },
]);
const headers = ref([
  {
    title: "Course Code",
    sortable: false,
    key: "code",
  },
  { title: "Course Description", key: "description", sortable: false },
  { title: "Major", key: "major", sortable: false },
  { title: "Year", key: "year", sortable: false },
  { title: "Type", key: "course_type", sortable: false },
  { title: "Status", key: "course_status", sortable: false },

  { title: "", key: "actions", sortable: false, },
]);

const rules = ref({
  courseCode: [(v) => !!v || "Course code is required"],
  courseDesc: [(v) => !!v || "Course description is required"],
  year: [(v) => !!v || "Year is required"],
  courseType: [(v) => !!v || "Course type is required"]
});

async function initialize() {
  try {
    let result = await $fetch("/api/course/getCourseList");
    if (result) {
      courseList.value = result;
    }
  } catch (err) {
    console.error("Failed ot fetch data: ", err);
    throw err;
  }
}

async function createCourse() {
  const { valid, errors } = await createCourseForm.value?.validate();

  if (valid) {
    const payload = {
      course_code: courseCode.value,
      course_description: courseDesc.value,
      major: major.value,
      year: year.value,
      course_type: course_type.value
    };
    await $fetch(`/api/course/createCourse`, {
      method: "POST",
      body: payload,
    })
      .then(response => {
        if (response.status == 'fail') {
          toast.error(response.message);
        } else {
          initialize();
          dialog.value = false;
          createCourseForm.value?.reset();
          toast.success("Successfully created!");
          console.log("Created a Course!", payload);
        }
      })

  } else {
    console.log(errors[0].errorMessages[0]);
  }
}

onMounted(() => {
  initialize();
});
</script>

<style scoped>
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

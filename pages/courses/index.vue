<template>
  <div>
    <h1>Courses Page</h1>
    <v-row>
      <v-col>
        <v-btn class="mb-3" color="primary" @click="dialog = true"
          >Add Record</v-btn
        >
        <v-card elevation="0">
          <v-card-title class="d-flex align-center pe-2">
            <v-icon icon="mdi-account"></v-icon> &nbsp; Student List

            <v-spacer></v-spacer>

           
          </v-card-title>

          <v-divider></v-divider>
          <v-data-table
          :items="courseList"
            :headers="headers"
            :loading="loading"
          >
            <template v-slot:loading>
              <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
              <v-tooltip text="View Profile" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn
                    :to="`/students/${item.documentId}`"
                    variant="plain"
                    v-bind="props"
                    icon="mdi-open-in-new"
                    color="green"
                  >
                  </v-btn>
                </template>
              </v-tooltip>
              <v-tooltip text="Delete Profile" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn
                    icon="mdi-delete"
                    v-bind="props"
                    variant="plain"
                  ></v-btn>
                </template>
              </v-tooltip>
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
          <v-toolbar-title>Add Course</v-toolbar-title>
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
                <v-text-field
                  label="Course Code*"
                  v-model="courseCode"
                  variant="outlined"
                  :rules="rules.courseCode"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <!-- <label class="label mb-4" for="email">Student No</label> -->
                <v-text-field
                  label="Course Description*"
                  v-model="courseDesc"
                  variant="outlined"
                  :rules="rules.courseDesc"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <!-- <label class="label mb-4" for="email">Student No</label> -->
                <v-text-field
                  label="Major"
                  v-model="major"
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <small class="text-caption text-medium-emphasis"
              >*indicates required field</small
            >
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

<script lang="ts" setup>
//@ts-ignore
import { useToast } from "vue-toastification"
const dialog = ref(false);
const valid = ref(true);
const loading = ref(false);
const createCourseForm = ref(null);
const search = ref(null);
const courseCode = ref("");
const courseDesc = ref("");
const major = ref("");
const toast = useToast();
const courseList = ref([]);
const headers = ref([
  {
    title: "Course Code",
    sortable: true,
    key: "code",
  },
  { title: "Course Description", key: "description", sortable: false },
  { title: "Major", key: "major", sortable: false },
  { title: "Status", key: "course_status", sortable: false },
 
  { title: "", key: "actions", sortable: false },
]);

const rules = ref({
  courseCode: [(v) => !!v || "Course code is required"],
  courseDesc: [(v) => !!v || "Course description is required"]
})

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
};

async function createCourse() {
  const { valid, errors } = await createCourseForm.value?.validate();

  if (valid) {
    const payload = {
      course_code: courseCode.value,
      course_description: courseDesc.value,
      major: major.value
    };
    await $fetch(`/api/course/createCourse`, {
      method: "POST",
      body: payload
    })
    dialog.value = false
    createCourseForm.value?.reset();
    toast.success("Successfully created!");
    console.log("Created a Course!", payload);
  } else {
    console.log(errors[0].errorMessages[0]);
  }
}

onMounted(() => {
  initialize();
})
</script>

<style></style>

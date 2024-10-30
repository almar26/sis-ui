<template>
  <div>
    <BaseBreadcrumb
      :title="page.title"
      :icon="page.icon"
      :breadcrumbs="breadcrumbs"
    ></BaseBreadcrumb>
    <v-row>
      <v-col>
        <v-btn class="mb-3" color="primary" @click="dialog = true"
          >Add Record</v-btn
        >
        <v-card elevation="0">
          <v-card-title class="d-flex align-center pe-2">
           
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>

            <v-text-field
              v-model="search"
              density="compact"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="solo-filled"
              flat
              hide-details
              single-line
            ></v-text-field>
          </v-card-title>

          <v-divider></v-divider>
          <v-data-table
            v-model:search="search"
            :items="studentList"
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
    <v-dialog max-width="800" v-model="dialog" scrollable>
      <v-card prepend-icon="mdi-account" title="Add Student">
        <v-divider></v-divider>
        <v-card-text class="mx-5">
          <v-form v-model="valid" ref="loginForm" lazy-validation>
            <p class="text-button font-weight-bold text-green mb-4">
              PERSONAL INFORMATION
            </p>
            <v-row dense>
              <v-col cols="4" md="4" sm="6">
                <!-- <label class="label text-grey-darken-2" for="email">Course</label> -->
                <v-select
                  :items="semesterList"
                  label="Semester*"
                  v-model="semester"
                  :rules="rules.semester"
                  variant="outlined"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" md="2"></v-col>
              <v-col cols="12" md="3" sm="6">
                <!-- <label class="label mb-4" for="email">Student No</label> -->
                <v-text-field
                  label="School Year Start*"
                  :rules="rules.schoolyearstart"
                  v-model="schoolyearstart"
                  type="number"
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3" sm="6">
                <!-- <label class="label mb-4" for="email">Student No</label> -->
                <v-text-field
                  label="School Year End*"
                  type="number"
                  :rules="rules.schoolyearend"
                  v-model="schoolyearend"
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12" md="4" sm="6">
                <!-- <label class="label mb-4" for="email">Student No</label> -->
                <v-text-field
                  color="primary"
                  label="Student No.*"
                  :rules="rules.studentno"
                  v-model="studentno"
                  variant="outlined"
                  retu
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="8" sm="6">
                <!-- <label class="label text-grey-darken-2" for="email">Course</label> -->
                <v-select
                  color="primary"
                  :items="courses"
                  item-title="description"
                  item-value="code"
                  label="Course*"
                  v-model="course"
                  :rules="rules.course"
                  variant="outlined"
                  required
                ></v-select>
                <v-select
                  v-if="selectedBA"
                  color="primary"
                  :items="majorList"
                  item-title="major_desc"
                  item-value="major_code"
                  label="Major"
                  v-model="major"
                  variant="outlined"
                ></v-select>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12" md="4" sm="6">
                <v-text-field
                  color="primary"
                  v-model="lastname"
                  :rules="rules.lastname"
                  variant="outlined"
                  label="Last name*"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4" sm="6">
                <v-text-field
                  color="primary"
                  label="First name*"
                  :rules="rules.firstname"
                  v-model="firstname"
                  variant="outlined"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-text-field
                  color="primary"
                  label="Middle name*"
                  v-model="middlename"
                  :rules="rules.middlename"
                  variant="outlined"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col>
                <v-textarea
                  v-model="address"
                  color="primary"
                  label="Address"
                  rows="1"
                  variant="outlined"
                  :rules="rules.address"
                  auto-grow
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12" md="4" sm="6">
                <v-select
                  color="primary"
                  v-model="gender"
                  :items="['male', 'female']"
                  variant="outlined"
                  :rules="rules.gender"
                  label="Gender*"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <date-picker
                  v-model="bday"
                  clearable
                  color="primary"
                  variant="outlined"
                  label="Birthday"
                ></date-picker>
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-text-field
                  color="primary"
                  label="Age"
                  v-model="age"
                  variant="outlined"
                  persistent-hint
                  required
                  type="number"
                ></v-text-field>
              </v-col>
            </v-row>

            <small class="text-caption text-medium-emphasis"
              >*indicates required field</small
            >
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>

          <v-btn
            color="green"
            text="Save"
            variant="tonal"
            @click="createStudent()"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
const token = useCookie("token");
import { useToast } from "vue-toastification"
useHead({
  title: "Account",
});

const page = ref({
  title: "Student List"
});
const breadcrumbs = ref([
  {
    title: "Dashboard",
    disabled: false,
    to: "/"
  },
  {
    title: "Students",
    disabled: true
  }
])

const toast = useToast();
const dialog = ref(false);
const valid = ref(true);
const loading = ref(false);
const search = ref(null);
const loginForm = ref(null);
const studentList = ref([]);
const selectedBA = ref(false)

const studentno = ref("");
const lastname = ref("");
const firstname = ref("");
const middlename = ref("");
const course = ref("");
const major = ref("")
const address = ref("");
const gender = ref("");
const bday = ref("");
const age = ref(null);
const semester = ref("");
const schoolyearstart = ref(null);
const schoolyearend = ref(null);

const courses = ref([]);
const majorList = ref([{
  major_code: 'FM',
  major_desc: 'Financial Management'
},
{
  major_code: 'MM',
  major_desc: 'Marketing Management'
}
])

const semesterList = ref(["1st Semester", "2nd Semester", "Summer"]);

const headers = ref([
  {
    title: "Student #",
    sortable: true,
    key: "student_no",
  },
  { title: "Lastname", key: "last_name", sortable: false },
  { title: "Firstname", key: "first_name", sortable: false },
  { title: "Middlename", key: "middle_name", sortable: false },
  { title: "Course", key: "course", sortable: false },
  { title: "Major", key: "major", sortable: false },
  { title: "Gender", key: "gender", sortable: false },
  { title: "", key: "actions", align: "end", sortable: false },
]);
const rules = ref({
  studentno: [(v) => !!v || "Student no is required"],
  lastname: [(v) => !!v || "Lastname is required"],
  firstname: [(v) => !!v || "Firstname is required"],
  middlename: [(v) => !!v || "Middlename is required"],
  course: [(v) => !!v || "Course is required"],
  address: [(v) => !!v || "Address is required"],
  gender: [(v) => !!v || "Gender is required"],
  birthday: [(v) => !!v || "Birthday is required"],
  age: [(v) => !!v || "Age is required"],
  semester: [(v) => !!v || "Semester is required"],
  schoolyearstart: [(v) => !!v || "School Year Start is required"],
  schoolyearend: [(v) => !!v || "School Year End is required"],
});

async function createStudent() {
  const { valid, errors } = await loginForm.value?.validate();

  if (valid) {
    const payload = {
      student_no: studentno.value,
      last_name: lastname.value,
      first_name: firstname.value,
      middle_name: middlename.value,
      course: course.value,
      major: major.value,
      address: address.value,
      gender: gender.value,
      birthday: bday.value,
      age: age.value,
      schoolyearstart: schoolyearstart.value,
      schoolyearend: schoolyearend.value,
      semester: semester.value,
    };
    console.log(payload);
    await $fetch(`/api/student/createStudent`, {
      method: "POST",
      body: payload,
    });
    dialog.value = false;
    loginForm.value?.reset();
    toast.success("Successfully created!");
    initialize();
  } else {
    console.log(errors[0].errorMessages[0]);
  }
}

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

async function initialize() {
  try {
    let result = await $fetch("/api/student/getStudentList");
    if (result) {
      studentList.value = result;
    }
  } catch (err) {
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

watch([course, bday], async () => {
  console.log(course.value);
  if (course.value === 'BSBA') {
    selectedBA.value = true
  } else {
    selectedBA.value = false
    major.value = ""
  }
  console.log(bday.value);
  if (bday.value === null) {
    age.value = null;
  } else {
    age.value = getAge(bday.value);
  }
});

onMounted(async () => {
  await initialize();
  getCoursesList();
  //console.log("age: ", +getAge("1990/10/08"));
});
</script>

<style scoped>
.v-field__outline__start {
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
}
.v-field__outline__end {
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
}
</style>

<template>
  <div>
    <BaseBreadcrumb
      :title="page.title"
      :icon="page.icon"
      :breadcrumbs="breadcrumbs"
    ></BaseBreadcrumb>
    <!-- <h1>{{ userData }}</h1> -->
    <v-row>
      <v-col>
        
        <v-card elevation="0">
          <v-card-title class="d-flex align-center pe-2">
            <v-btn class="mb-3 text-capitalize" color="primary" prepend-icon="mdi-plus" @click="openCreateDialog()"
          >Create</v-btn
        >
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
            density="compact"
            :search="search"
            :items="studentList"
            :headers="headers"
            :loading="loading"
          >
            <template v-slot:loading>
              <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
            </template>
            <template v-slot:[`item.sy`]="{ item }">
              {{ item.school_year_start }}-{{ item.school_year_end }}
            </template>

            <template v-slot:[`item.actions`]="{ item }">
              <v-tooltip text="View Profile" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn
                    size="medium"
                    :to="`/students/${item.documentId}`"
                    class="mr-1"
                    variant="text"
                    v-bind="props"
                    icon="mdi-open-in-new"
                    color="green"
                  >
                  </v-btn>
                </template>
              </v-tooltip>
              <!-- <v-tooltip text="Delete Profile" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn
                    size="medium"
                    icon="mdi-delete"
                    color="red"
                    v-bind="props"
                    variant="plain"
                  ></v-btn>
                </template>
              </v-tooltip> -->
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- DIALOG BOX -->
    <v-dialog max-width="800" v-model="dialog" scrollable>
      <v-card>
        <v-toolbar>
          <v-icon class="ml-4">mdi-account</v-icon>
          <v-toolbar-title>Create New Student</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="mx-5">
          <v-form v-model="valid" ref="createStudentForm" lazy-validation>
            <p class="text-button font-weight-bold text-green mb-4">
              PERSONAL INFORMATION
            </p>
            <v-row dense>
              <v-col cols="12" md="4" sm="6">
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
                  item-title="code"
                  item-value="code"
                  label="Course*"
                  v-model="course"
                  :rules="rules.course"
                  variant="outlined"
                  return-object
                  required
                ></v-select>
                <!-- <v-select
                  v-if="selectedBA"
                  color="primary"
                  :items="majorList"
                  item-title="major_desc"
                  item-value="major_code"
                  label="Major"
                  v-model="major"
                  variant="outlined"
                ></v-select> -->
                <v-text-field v-if="selectedBA"
                color="primary"
                label="Major"
                  v-model="major"
                  variant="outlined"
                >
                  
                </v-text-field>
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
                  @input="lastname = lastname.toUpperCase()"
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
                  @input="firstname = firstname.toUpperCase()"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-text-field
                  color="primary"
                  label="Middle name"
                  v-model="middlename"
                  variant="outlined"
                  persistent-hint
                  @input="middlename = middlename.toUpperCase()"
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
                  @input="address = address.toUpperCase()"
                  auto-grow
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12" md="4" sm="6">
                <v-select
                  color="primary"
                  v-model="gender"
                  :items="['MALE', 'FEMALE']"
                  variant="outlined"
                  label="Gender"
                  required
                ></v-select>

                <!-- <v-select v-model="selected" :items="courses" :item-title="courses" >
                  </v-select> -->
                <!-- <v-select color="primary" :items="courses" item-title="description" item-value="code" label="Course*"
                  v-model="course" :rules="rules.course" variant="outlined" return-object required></v-select> -->
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

          <!-- <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn> -->

          <v-btn
            color="green"
            text="Save"
            variant="flat"
            width="140"
            :loading="loadingCreateStudent"
            @click="createStudent()"
            prepend-icon="mdi-content-save"
          ></v-btn>
          <v-spacer></v-spacer>
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
const token = useCookie("token");
const userData = ref(userInfo?.value.user);

useHead({
  title: "Account",
});

const page = ref({
  title: "Student List",
});
const breadcrumbs = ref([
  {
    title: "Dashboard",
    disabled: false,
    to: "/",
  },
  {
    title: "Students",
    disabled: true,
  },
]);

const toast = useToast();
const dialog = ref(false);
const valid = ref(true);
const loading = ref(true);
const loadingCreateStudent = ref(false);
const search = ref(null);
const loginForm = ref(null);
const createStudentForm = ref(null);
const studentList = ref([]);
const selectedBA = ref(false);

const studentno = ref("");
const lastname = ref("");
const firstname = ref("");
const middlename = ref("");
const course = ref("");
const course_code = ref("");
const major = ref("");
const address = ref("");
const gender = ref("");
const bday = ref("");
const age = ref(null);
const semester = ref("");
const schoolyearstart = ref(null);
const schoolyearend = ref(null);

const courses = ref([]);
const majorList = ref([
  {
    major_code: "FM",
    major_desc: "Financial Management",
  },
  {
    major_code: "MM",
    major_desc: "Marketing Management",
  },
]);

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
  { title: "School Year", key: "sy", sortable: false },
  { title: "Semester", key: "semester", sortable: false },
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

// Open Create Student Dialog box
async function openCreateDialog() {
dialog.value = true;
getCoursesList()
}

async function createStudent() {
  const { valid, errors } = await createStudentForm.value?.validate();
  console.log("Selected: ", course.value);
  loadingCreateStudent.value = true;
  if (valid) {
    const payload = {
      student_no: studentno.value,
      last_name: lastname.value,
      first_name: firstname.value,
      middle_name: middlename.value,
      course: course.value.description,
      course_code: course.value.code,
      major: major.value,
      address: address.value,
      gender: gender.value,
      birthday: bday.value,
      age: age.value,
      schoolyearstart: schoolyearstart.value,
      schoolyearend: schoolyearend.value,
      semester: semester.value,
      course_type: userData.value.role_view,
    };
    console.log(payload);
    await $fetch(`/api/student/createStudent`, {
      method: "POST",
      body: payload,
    }).then((response) => {
      console.log("Response: ", response);
      if (response.status == "fail") {
        loadingCreateStudent.value = false;
        toast.error(response.message);
      } else {
        //dialog.value = false;
        loadingCreateStudent.value = false;
        createStudentForm.value?.reset();
        toast.success("Successfully created!");
        initialize();
      }
    });
  } else {
    console.log(errors[0].errorMessages[0]);
    loadingCreateStudent.value = false;
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
    let result = await $fetch(`/api/student/list/${userData.value.role_view}`);
    if (result) {
      studentList.value = result;
      loading.value = false;
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

watch([course, bday, dialog], async () => {
  //console.log("Courses", course.value);
  if (course.value?.code === "BSBA(MM)" || course.value?.code === "BSBA(FM)") {
    selectedBA.value = true;
    if (course.value?.code === "BSBA(MM)") {
      major.value = "MARKETING MANAGEMENT"
    } else if (course.value?.code === "BSBA(FM)") {
      major.value = "FINANCIAL MANAGEMENT"
    }
  } else {
    selectedBA.value = false;
    major.value = "";
  }
  //console.log(bday.value);
  if (bday.value === null) {
    age.value = null;
  } else {
    age.value = getAge(bday.value);
  }

  if (dialog.value == false) {
    console.log("Create student dialog box closed");
    createStudentForm.value?.reset();
    loadingCreateStudent.value = false;
    bday.value = null;
  }
});

onMounted(async () => {
  await initialize();
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

:deep() .v-table .v-table__wrapper > table > thead > tr > th {
  border-right: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-bottom: thick solid
    rgba(var(--v-border-color), var(--v-border-opacity));
  font-weight: bold;
  /* background-color: #04aa6d;
  color: white; */
}

:deep() .v-table .v-table__wrapper > table > tbody > tr > td:not(:last-child),
.v-table .v-table__wrapper > table > tbody > tr > th:not(:last-child) {
  border-right: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
}

:deep() .v-table .v-table__wrapper > table > tbody > tr:nth-child(even) {
  background-color: #f2f2f2;
}

:deep() .v-table .v-table__wrapper > table > tbody > tr:hover {
  background-color: #f2f2f2;
}
</style>

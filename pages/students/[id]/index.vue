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
        <!-- <v-card class="elevation-0">
          <v-list density="compact" nav>
            <v-list-subheader color="green" class="label-header"
              >GENERAL</v-list-subheader
            >
           

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
            <v-spacer></v-spacer>
            <v-btn
              color="red"
              variant="tonal"
              block
              class="text-none"
              @click="deleteStudentDialog = true"
              ><v-icon start>mdi-delete</v-icon> Delete Account</v-btn
            >
          </v-card-actions>
        </v-card> -->
      </v-col>
      <v-col cols="12" md="10">
        <v-card class="elevation-0">
          <!-- <div class="text-button font-weight-bold text-green mx-5">
            <v-icon>mdi-account</v-icon> Personal Information
          </div>
          
          <v-divider class="mb-4 mt-3"></v-divider> -->
          <v-toolbar color="transparent">
            <v-tabs
              v-model="tab"
              align-tabs="start"
              bg-color="white"
              color="primary"
            >
              <v-tab prepend-icon="mdi-account" :value="1">Information</v-tab>
              <v-tab prepend-icon="mdi-school" :value="2">Education</v-tab>
            </v-tabs>
            <v-spacer></v-spacer>

            <v-btn
              color="blue"
              variant="tonal"
              class="text-capitalize mr-2"
              @click="updateInfoDialog = true"
            >
              <v-icon start>mdi-pencil</v-icon> Update Info
            </v-btn>
            <v-btn
              color="purple"
              variant="tonal"
              class="text-capitalize mr-10"
              @click="updateCourseDialog = true"
            >
              <v-icon start>mdi-book</v-icon> Update Course
            </v-btn>
            <!-- <v-btn color="red" variant="tonal" class="text-capitalize mr-10">
              <v-icon start>mdi-delete</v-icon> Delete
            </v-btn> -->
          </v-toolbar>
          <v-divider></v-divider>

          <v-tabs-window v-model="tab">
            <v-tabs-window-item :value="1">
              <v-card elevation="0">
                <v-card-text>
                  <div class="mx-5 pb-9 pt-3">
                    <v-row v-if="studentDetails.major != ''"
                      ><v-col cols="12" md="3">
                        <v-text-field
                          label="Student No"
                          color="primary"
                          :model-value="studentDetails.student_no"
                          readonly
                          variant="outlined"
                          hide-details="auto"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="5">
                        <v-text-field
                          color="primary"
                          variant="outlined"
                          :model-value="studentDetails.course"
                          label="Course"
                          readonly
                          hide-details="auto"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          color="primary"
                          variant="outlined"
                          :model-value="studentDetails.major"
                          label="Major"
                          readonly
                          hide-details="auto"
                        ></v-text-field>
                      </v-col>
                      <!-- <v-col cols="12" md="2">
                        <v-text-field color="primary" variant="outlined" :model-value="studentDetails.section"
                          label="Section" readonly hide-details="auto"></v-text-field>
                      </v-col> -->
                    </v-row>

                    <v-row v-else
                      ><v-col cols="12" md="4">
                        <v-text-field
                          label="Student No"
                          color="primary"
                          :model-value="studentDetails.student_no"
                          readonly
                          variant="outlined"
                          hide-details="auto"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="8">
                        <v-text-field
                          color="primary"
                          variant="outlined"
                          :model-value="studentDetails.course"
                          label="Course"
                          readonly
                          hide-details="auto"
                        ></v-text-field>
                      </v-col>
                      <!-- <v-col cols="12" md="2">
                        <v-text-field color="primary" variant="outlined" :model-value="studentDetails.section"
                          label="Section" readonly hide-details="auto"></v-text-field>
                      </v-col> -->
                    </v-row>

                    <v-row
                      ><v-col cols="12" md="4">
                        <v-text-field
                          color="primary"
                          variant="outlined"
                          label="Last Name"
                          hide-details="auto"
                          readonly
                          :model-value="studentDetails.last_name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          color="primary"
                          variant="outlined"
                          label="First Name"
                          :model-value="studentDetails.first_name"
                          readonly
                          hide-details="auto"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          color="primary"
                          variant="outlined"
                          label="Middle Name"
                          hide-details="auto"
                          readonly
                          :model-value="studentDetails.middle_name"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-textarea
                          color="primary"
                          variant="outlined"
                          label="Address"
                          :model-value="studentDetails.address"
                          rows="1"
                          readonly
                          hide-details="auto"
                        >
                        </v-textarea>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="4">
                        <v-text-field
                          color="primary"
                          variant="outlined"
                          label="Gender"
                          readonly
                          :model-value="studentDetails.gender"
                          hide-details="auto"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          color="primary"
                          variant="outlined"
                          label="Birthday (YYYY-MM-DD)"
                          readonly
                          :model-value="studentDetails.birthday"
                          hide-details="auto"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          color="primary"
                          variant="outlined"
                          label="Age"
                          readonly
                          :model-value="studentDetails.age"
                          hide-details="auto"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </div>
                </v-card-text>
              </v-card>
            </v-tabs-window-item>

            <v-tabs-window-item :value="2">
              <v-card class="elevation-0 text-center py-16">
                <v-icon size="80" color="warning">mdi-alert-outline</v-icon>
                <div class="service-notif">Service Unavailable</div>
              </v-card>
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card>
      </v-col>
    </v-row>

    <!-- START DIALOG BOX -->
    <!-- Update Student Information -->
    <v-dialog v-model="updateInfoDialog" width="auto" scrollable>
      <v-card prepend-icon="mdi-account" title="Update Personal Information">
        <v-divider></v-divider>
        <v-card-text class="mx-5">
          <v-form v-model="valid" ref="updateDetailsForm" lazy-validation>
            <!-- <p class="text-button font-weight-bold text-green mb-4">
             UPDATE PERSONAL INFORMATION
            </p> -->
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
            <v-row dense v-if="studentDetails.major != ''">
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
              <v-col cols="12" md="4" sm="6">
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
                  disabled
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-if="selectedBA"
                  disabled
                  color="primary"
                  label="Major"
                  v-model="major"
                  variant="outlined"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row dense v-else>
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
                  disabled
                  required
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
                  label="Middle name*"
                  v-model="middlename"
                  :rules="rules.middlename"
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
        <v-card-actions class="my-2">
          <v-spacer></v-spacer>

          <v-btn
            text="Close"
            color="red"
            prepend-icon="mdi-close"
            variant="tonal"
            @click="updateInfoDialog = false"
          ></v-btn>

          <v-btn
            color="green"
            text="Update"
            prepend-icon="mdi-pencil"
            variant="tonal"
            :loading="loading2"
            @click="updateDetails()"
          ></v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Update Student  Course -->
    <v-dialog v-model="updateCourseDialog" width="auto">
      <v-card prepend-icon="mdi-account" title="Update Course">
        <v-divider></v-divider>
        <v-card-text class="mx-5 text-center">
          <v-icon size="80" color="warning">mdi-alert-outline</v-icon>
          <div class="service-notif">Service Unavailable</div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Delete Student Account -->
    <v-dialog v-model="deleteStudentDialog" width="auto">
      <v-card
        class="text-body-2"
        color="#263238"
        max-width="400"
        prepend-icon="mdi-delete"
        text="Are you sure you want to delete this account?"
        title="Delete Account"
      >
        <template v-slot:actions>
          <v-spacer></v-spacer>
          <v-btn
            class="text-none"
            :loading="loading"
            text="Delete"
            prepend-icon="mdi-delete"
            color="red"
            variant="tonal"
            @click="deleteAccount()"
          ></v-btn>
          <v-btn
            class="text-none"
            text="Cancel"
            prepend-icon="mdi-close"
            variant="tonal"
            @click="deleteStudentDialog = false"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>

    <!-- END DIALOG BOX -->
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";
const route = useRoute();
const toast = useToast();
const studentDetails = ref({});
const valid = ref(true);
const loading = ref(false);
const loading2 = ref(false);
const updateDetailsForm = ref(null);
const tab = ref(null);
const isEmpty = ref(false);
const updateInfoDialog = ref(false);
const updateCourseDialog = ref(false);
const deleteStudentDialog = ref(false);
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
const schoolyearstart = ref(0);
const schoolyearend = ref(0);
const semesterList = ref(["1st Semester", "2nd Semester", "Summer"]);
const selectedBA = ref(false);

const courses = ref([]);
const page = ref({
  title: "Student Details",
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
    disabled: true,
  },
]);
// const items = ref([
//   {
//     icon: "mdi-account-circle",
//     title: "Account",
//     to: `/students/${route.params.id}`,
//   },
//   {
//     icon: "mdi-book-multiple",
//     title: "Subjects",
//     to: `/students/${route.params.id}/subjects`,
//   },
//   {
//     icon: "mdi-calendar-clock-outline",
//     title: "Enrollment History",
//     to: `/students/${route.params.id}/enrollment-history`,
//   },
// ]);
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

async function initialize() {
  try {
    let result = await $fetch(`/api/student/${route.params.id}`);

    if (result) {
      studentDetails.value = result[0];
      if (result.length == 0) {
        //console.log("Empty Data")
        isEmpty.value = true;
      } else {
        // console.log("has data")
        isEmpty.value = false;
        semester.value = result[0].semester;
        schoolyearstart.value = result[0].school_year_start;
        schoolyearend.value = result[0].school_year_end;
        studentno.value = result[0].student_no;
        course.value = result[0].course_code;
        //major.value = result[0].major
        lastname.value = result[0].last_name;
        firstname.value = result[0].first_name;
        middlename.value = result[0].middle_name;
        address.value = result[0].address;
        gender.value = result[0].gender;
        bday.value = result[0].birthday;
        age.value = result[0].age;

        if (course.value == "BSBA(MM)") {
          major.value = "MARKETING MANAGEMENT";
          //console.log("BSBAMM");
        } else if (course.value == "BSBA(FM)") {
          major.value = "FINANCIAL MANAGEMENT";
        }
      }
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

async function updateDetails() {
  // let newCourse = course.value;
  // if (Object.prototype.toString.call(newCourse) === "[object String]") {
  //   console.log("variable is a string.");
  //   var updatedCourse = course.value;
  // } else {
  //   var updatedCourse = course.value;
  //   console.log("variable is not a string");
  // }
  const { valid, errors } = await updateDetailsForm.value?.validate();
  if (valid) {
    loading2.value = true;
    let payload = {
      semester: semester.value,
      school_year_start: parseInt(schoolyearstart.value),
      school_year_end: parseInt(schoolyearend.value),
      student_no: studentno.value,
      //course: updatedCourse,
      //course_code: course.value.code,
      //major: major.value,
      last_name: lastname.value,
      first_name: firstname.value,
      middle_name: middlename.value,
      address: address.value,
      gender: gender.value,
      birthday: bday.value,
      age: age.value,
    };
    console.log(payload);
    await $fetch(`/api/student/update/${route.params.id}`, {
      method: "PUT",
      body: payload,
    }).then((response) => {
      console.log("Update Response: ", response);
      if (response.status == "fail") {
        toast.error(response.message);
        loading2.value = false;
      } else {
        updateInfoDialog.value = false;
        loading2.value = false
        //updateDetailsForm.value?.reset();
        toast.success("Successfully updated!");
        initialize();
      }
    });
  } else {
    loading2.value = false;
    console.log(errors[0].errorMessages[0]);
  }
}

// Delete Student Account
async function deleteAccount() {
  try {
    loading.value = true;
    let result = await $fetch(`/api/student/delete/${route.params.id}`);
    if (result) {
      loading.value = false;
      deleteStudentDialog.value = false;
      toast.success("Student account deleted successfully!");
      navigateTo("/students");
    }
  } catch (err) {
    loading.value = false;
    console.error("Failed to fetch data: ", err);
    throw err;
  }
  // setTimeout(() => {
  //   loading.value = false
  //   deleteStudentDialog.value = false,
  //   toast.success("Student account deleted successfully!")
  //   navigateTo('/students')
  // }, 3000)
}

watch([course, bday, updateInfoDialog], async () => {
  //console.log("Courses", course.value);
  if (course.value?.code === "BSBA(MM)" || course.value?.code === "BSBA(FM)") {
    selectedBA.value = true;
    if (course.value?.code === "BSBA(MM)") {
      major.value = "MARKETING MANAGEMENT";
    } else if (course.value?.code === "BSBA(FM)") {
      major.value = "FINANCIAL MANAGEMENT";
    }
  } else {
    if (course.value === "BSBA(MM)") {
      selectedBA.value = true;
      major.value = "MARKETING MANAGEMENT";
    } else if (course.value === "BSBA(FM)") {
      selectedBA.value = true;
      major.value = "FINANCIAL MANAGEMENT";
    } else if (course.value === "BSBA") {
      selectedBA.value = true;
      major.value = studentDetails.value.major;
    } else {
      selectedBA.value = false;
      major.value = "";
    }
  }
  //console.log(bday.value);
  if (bday.value === null) {
    age.value = null;
  } else {
    age.value = getAge(bday.value);
  }

  if (updateInfoDialog.value == false) {
    loading2.value = false;
    initialize();
  }
});

onMounted(async () => {
  await initialize();
  getCoursesList();
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

.service-notif {
  font-size: 20px;
  color: grey;
}

.v-list-item-group .v-list-item--active {
  color: white !important;
}

.theme--light.v-list-item--active .v-list-item__subtitle {
  color: white !important;
}
</style>

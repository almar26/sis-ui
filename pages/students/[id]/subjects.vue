<template>
  <div>
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row v-if="isEmpty">
      <h1>No Record Found</h1>
    </v-row>
    <v-row dense v-else>
      <v-col cols="12" md="2">
        <StudentSideBar :studentDetails="studentDetails" :loading3="loading3"/>
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
            <template v-slot:[`item.actions`]="{ item }">
                <v-tooltip text="Input Grade" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn size="medium" variant="text" v-bind="props" @click="showUpdateGradeDialog(item)"
                    color="primary">
                    <v-icon size="30">mdi-text-box-check</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
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


    <!-- Add grade dialog -->
    <v-dialog max-width="500" v-model="updateGradeDialog" scrollable persistent>
      <v-card elevation="0">
        <v-toolbar color="primary" density="compact">
          <v-icon class="ml-4">mdi-text-box-check</v-icon>
          <v-toolbar-title> Update Grade</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="updateGradeDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <div class="mx-7 my-4">
          <v-row no-gutters>
            <v-col cols="3" class="text-uppercase font-weight-bold text-subtitle-2 text-green">Student No.</v-col>
            <v-col cols="1" class="font-weight-bold">:</v-col>
            <v-col cols="8" class="font-weight-bold">{{ studentno }}</v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="3" class="text-uppercase font-weight-bold text-subtitle-2 text-green">Name</v-col>
            <v-col cols="1" class="font-weight-bold">:</v-col>
            <v-col cols="8" class="font-weight-bold text-subtitle-3">{{ lastname }}, {{ firstname }} {{ middlename
              }}</v-col>
          </v-row>
        </div>
        <v-divider></v-divider>
        <v-card-text>
          <v-form v-model="valid" fast-fail ref="addGradeForm" lazy-validation>
            <v-row dense>
              <v-col cols="12">
                <!-- <label class="label mb-4" for="email">Student No</label> -->
                <v-text-field label="Grade" v-model="grade" variant="outlined" type="number" required></v-text-field>
              </v-col>

              <v-col cols="12">
                <!-- <label class="label mb-4" for="email">Student No</label> -->
                <v-text-field label="Numeric Grade" v-model="numericGrade" variant="outlined" required
                  readonly></v-text-field>
              </v-col>
              <v-col cols="12">
                <!-- <label class="label mb-4" for="email">Student No</label> -->
                <v-text-field label="Remarks" v-model="remarks" variant="outlined"
                  @input="remarks = remarks.toUpperCase()" required readonly></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <label class="label mb-4" for="email">Other Remarks</label>
                <v-row dense>
                  <v-col cols="12" md="4"><v-checkbox v-model="incomplete" color="green" label="Incomplete"
                      hide-details></v-checkbox>
                  </v-col>
                  <v-col cols="12" md="4"><v-checkbox v-model="fda" color="green" label="Failed due to absences"
                      hide-details></v-checkbox></v-col>
                  <v-col cols="12" md="4"><v-checkbox v-model="dropped" color="green" label="Dropped"
                      hide-details></v-checkbox></v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn block color="primary" :loading="loadingAddGrade" @click="submitGrade()">Submit</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

  </div>
</template>

<script setup>
const route = useRoute();
import { useToast } from "vue-toastification";
import { mergeProps } from "vue";
const toast = useToast();
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
  { title: "", key: "actions", sortable: false },

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
const loading3 = ref(true);
const studentSubjects = ref([]);
const updateGradeDialog = ref(false);
// Update student grade
const addGradeForm = ref(null);
const studentSubjID = ref(0);
const studentno = ref("");
const lastname = ref("");
const firstname = ref("");
const middlename = ref("");
const section = ref("");
const grade = ref(0);
const numeric_grade = ref(0);
const loadingAddGrade = ref(false);
const remarks = ref("");
const fda = ref(false);
const incomplete = ref(false);
const dropped = ref(false);

async function initialize() {
  try {
    let result = await $fetch(`/api/student/${route.params.id}`);
    //console.log(result);
    if (result) {
      studentDetails.value = result[0];
      loading3.value = false;
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
      //studentSubjID.value = result.document_id
      //studentno.value = result.student_no
      loading.value = false;
    }
  } catch (err) {
    loading.value = false;
    console.error("Failed to fetch data: ", err);
    throw err;
  }
}

async function showUpdateGradeDialog(item) {
  console.log("Update Grade: ", item);
  console.log("Student Details: ", studentDetails.value)
  updateGradeDialog.value = true;
  studentSubjID.value = item.document_id;
  studentno.value = item.student_no;
  lastname.value = studentDetails.value?.last_name;
  firstname.value = studentDetails.value?.first_name;
  middlename.value = studentDetails.value?.middle_name;
  grade.value = item.grade;
  numeric_grade.value = item.numeric_grade;
  remarks.value = item.remarks;
  incomplete.value = item.incomplete;
  fda.value = item.fda;
  dropped.value = item.dropped;
}

async function submitGrade() {
  const { valid, errors } = await addGradeForm.value?.validate();
  if (valid) {
    loadingAddGrade.value = true;
    if (grade.value === null || grade.value === "") {
      //console.log("Grade is empty");
      grade.value = 0;
    }
    let payload = {
      grade: parseInt(grade.value),
      numeric_grade: numericGrade.value,
      remarks: remarks.value,
      incomplete: incomplete.value,
      fda: fda.value,
      dropped: dropped.value,
    };
    
    await $fetch(`/api/student/subject/add-grade/${studentSubjID.value}`, {
      method: "PUT",
      body: payload,
    }).then((response) => {
      //console.log("Grade submitted: ", response);
      updateGradeDialog.value = false;
      loadingAddGrade.value = false;
      toast.success("Grade successfully updated!");
      getStudentSubjects()
      //getStudentSubjectList();
    });
  } else {
    console.log(errors[0].errorMessages[0]);
  }
}


const numericGrade = computed(() => {
  if (grade.value <= 100 && grade.value >= 98) {
    return Number(1.0).toFixed(2);
  } else if (grade.value <= 97 && grade.value >= 95) {
    return Number(1.25).toFixed(2);
  } else if (grade.value <= 94 && grade.value >= 92) {
    return Number(1.5).toFixed(2);
  } else if (grade.value <= 91 && grade.value >= 89) {
    return Number(1.75).toFixed(2);
  } else if (grade.value <= 88 && grade.value >= 86) {
    return Number(2.0).toFixed(2);
  } else if (grade.value <= 85 && grade.value >= 83) {
    return Number(2.25).toFixed(2);
  } else if (grade.value <= 82 && grade.value >= 80) {
    return Number(2.5).toFixed(2);
  } else if (grade.value <= 79 && grade.value >= 77) {
    return Number(2.75).toFixed(2);
  } else if (grade.value <= 76 && grade.value >= 75) {
    return Number(3.0).toFixed(2);
  } else if (grade.value <= 74 && grade.value > 0) {
    return Number(5.0).toFixed(2);
  } else if (grade.value > 100) {
    return Number(0.0).toFixed(2);
  } else if (grade.value == 0) {
    return Number(0.0).toFixed(2);
  }

});

watch(
  [

    updateGradeDialog,
    incomplete,
    fda,
    remarks,
    dropped,
    grade,
  ],
  async () => {


    if (incomplete.value == true) {
      fda.value = false;
      remarks.value = "INCOMPLETE";
      dropped.value = false;
      grade.value = 0;
      //numericGrade.value = "0.00";
    }
    if (fda.value == true) {
      grade.value = 0;
      incomplete.value = false;
      dropped.value = false;
      remarks.value = "FAILED DUE TO ABSENCES";
    }
    if (dropped.value == true) {
      grade.value = 0;
      incomplete.value = false;
      fda.value = false;
      remarks.value = "DROPPED";
    }
  
    if (updateGradeDialog.value == true) {
      //console.log("Update Grade Dialog box Opened");
      // if (remarks.value == "INCOMPLETE") {
      //   incomplete.value = true;
      // }
    } else if (updateGradeDialog.value == false) {
      //console.log("Update Grade Dialog Box Closed!");
      fda.value = false;
      incomplete.value = false;
      dropped.value = false;
    }

    if (grade.value <= 100 && grade.value >= 75) {
      remarks.value = "PASSED";
      incomplete.value = false;
      fda.value = false;
      dropped.value = false;
    } else if (grade.value <= 74 && grade.value > 0) {
      remarks.value = "FAILED";
    } else if (grade.value > 100) {
      remarks.value = "INVALID INPUT";
    } else if (
      grade.value == 0 &&
      incomplete.value == false &&
      fda.value == false &&
      dropped.value == false
    ) {
      remarks.value = "";
    }
   
  
  }
);

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

<template>
  <div>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>

    <!-- {{ route.params.id }} -->
    <v-row v-if="isEmpty" dense>
      <h1>No Record Found</h1>
    </v-row>
    <v-row dense v-else>
      <v-col cols="12" md="3">
        <v-row dense>
          <v-col cols="12">
            <v-card elevation="0">
              <!-- <v-card-title class="card-title text-body-1"
            >Details</v-card-title
          > -->
              <v-toolbar color="transparent" density="comfortable">
                <v-toolbar-title class="card-title text-body-1">Details
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="blue" icon="mdi-pencil" class="text-capitalize">
                </v-btn>
                <v-btn color="red" icon="mdi-delete" class="text-capitalize">
                </v-btn>
              </v-toolbar>
              <v-divider></v-divider>
              <v-list density="compact">
                <v-list-item>
                  <v-list-item-subtitle class="title">Code</v-list-item-subtitle>
                  <v-list-item-title class="desc">{{
                    courseDetails.code
                  }}</v-list-item-title>
                </v-list-item>

                <v-list-item>
                  <v-list-item-subtitle class="title">Description</v-list-item-subtitle>
                  <v-list-item-title class="desc">{{
                    courseDetails.description
                  }}</v-list-item-title>
                </v-list-item>

                <div v-if="courseDetails.major != ''">
                  <v-list-item>
                    <v-list-item-subtitle class="title">Major</v-list-item-subtitle>
                    <v-list-item-title class="desc">{{
                      courseDetails.major
                    }}</v-list-item-title>
                  </v-list-item>
                </div>

                <v-list-item>
                  <v-list-item-subtitle class="title">Year</v-list-item-subtitle>
                  <v-list-item-title class="desc">{{ courseDetails.year }} Year</v-list-item-title>
                </v-list-item>

                <v-list-item>
                  <v-list-item-subtitle class="title">Status</v-list-item-subtitle>
                  <v-list-item-title class="desc">{{
                    courseDetails.course_status
                  }}</v-list-item-title>
                </v-list-item>
              </v-list>
              <!-- <v-divider></v-divider>
              <v-card-actions class="py-3">
                <v-btn variant="flat" color="blue" class="text-capitalize px-4">
                  <v-icon start>mdi-pencil</v-icon>
                  Edit</v-btn
                >

                <v-spacer></v-spacer>
                <v-btn variant="flat" color="red" class="text-capitalize px-4">
                  <v-icon start>mdi-delete</v-icon>
                  Delete</v-btn
                >
              </v-card-actions> -->
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card variant="flat" class="pb-3">
              <v-toolbar color="transparent" density="comfortable" class="pr-3">
                <v-toolbar-title class="card-title text-body-1">Curriculum</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn variant="flat" density="compact" color="primary" icon="mdi-plus" class="text-capitalize"
                  @click="createCuriDialog = true">
                </v-btn>
              </v-toolbar>
              <v-divider></v-divider>

              <v-list density="compact">
                <div v-for="(item, i) in curriculumList" :key="i">
                  <v-list-item @click="selectedCurricula(item)">
                    <template v-slot:prepend>
                      <v-icon icon="mdi-card-text"></v-icon>
                    </template>
                    <v-list-item-title class="desc">{{
                      item.year
                    }}</v-list-item-title>
                    <v-list-item-subtitle class="title">Effective Date</v-list-item-subtitle>
                    <!-- <v-list-item-subtitle class="title">{{
                      $relative(item.createdAt)
                    }}</v-list-item-subtitle> -->
                    <template v-slot:append>
                      <v-menu>
                        <template v-slot:activator="{ props }">
                          <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
                        </template>

                        <v-list>
                          <v-list-item @click="selectedCurricula(item)">
                            <v-list-item-title>Edit</v-list-item-title>
                          </v-list-item>
                          <v-list-item @click="selectedCurricula(item)">
                            <v-list-item-title>Delete</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </template>
                  </v-list-item>
                  <!-- <v-card elevation="0" link class="mb-3">
                    <v-row>
                      <v-col cols="2"><v-icon>mdi-card-text</v-icon></v-col>
                      <v-col cols="6">
                        <v-row no-gutters>
                          <v-col cols="12">{{ item.year }}</v-col>
                          <v-col cols="12">{{
                            $relative(item.createdAt)
                          }}</v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="4"><v-icon>mdi-dots-vertical</v-icon></v-col>
                    </v-row>
                  </v-card> -->
                </div>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="9">
        <v-card variant="flat" v-if="isSelectedCurri">
          <v-toolbar color="transparent" class="pr-3" density="comfortable">
            <v-toolbar-title class="card-title text-body-1">Effective School Year: {{ curriculaYear }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn variant="flat" color="primary" class="text-capitalize px-4" @click="addSubjDialog = true">
              <v-icon start>mdi-plus</v-icon>Subject</v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <v-data-table :items="subjectList" :headers="headers" :loading="loading">
              <template v-slot:[`item.actions`]="{ item }">

               
                  <v-menu >
                    <template v-slot:activator="{ props }">
                      <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
                    </template>

                    <v-list>
                      <v-list-item >
                        <v-list-item-title>Edit</v-list-item-title>
                      </v-list-item>
                      <v-list-item >
                        <v-list-item-title>Delete</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>

              
                <!-- <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn> -->

              </template>

            </v-data-table>
          </v-card-text>
        </v-card>
        <v-card v-else variant="flat">
          <v-card-text> No Curriculum selected </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- DIALOG BOX -->
    <!-- Create Curriculum Dialog Box -->
    <v-dialog max-width="500" v-model="createCuriDialog" scrollable persistent>
      <v-card>
        <!-- <v-card-title><v-icon>mdi-book</v-icon> Add Course <v-spacer></v-spacer> <v-icon>mdi-close</v-icon></v-card-title> -->
        <v-toolbar>
          <v-icon class="ml-4">mdi-card-text</v-icon>
          <v-toolbar-title>Add Curriculum</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="createCuriDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="mx-5">
          <v-form v-model="valid" ref="createCurriForm" lazy-validation>
            <v-row dense>
              <v-col cols="12">
                <!-- <label class="label text-grey-darken-2" for="email">Course</label> -->
                <v-text-field label="Effective School Year*" v-model="effectiveSY" variant="outlined"
                  :rules="rules.effectiveSY" required></v-text-field>
              </v-col>
            </v-row>

            <small class="text-caption text-medium-emphasis">*indicates required field</small>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="mx-5 my-2">
          <v-btn block color="green" text="Save" variant="flat" @click="addCurriculum()"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Add Subject to curriculum -->
    <v-dialog max-width="500" v-model="addSubjDialog" scrollable persistent>
      <v-card>
        <!-- <v-card-title><v-icon>mdi-book</v-icon> Add Course <v-spacer></v-spacer> <v-icon>mdi-close</v-icon></v-card-title> -->
        <v-toolbar>
          <v-icon class="ml-4">mdi-card-text</v-icon>
          <v-toolbar-title>Add Subject</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="addSubjDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="mx-5">
          <v-form v-model="valid" ref="createSubjForm" lazy-validation>
            <v-row dense>
              <v-col cols="12">
                <!-- <label class="label text-grey-darken-2" for="email">Course</label> -->
                <v-text-field label="Subject Code*" v-model="subjCode" variant="outlined" :rules="rules.subjCode"
                  required></v-text-field>
              </v-col>

              <v-col cols="12">
                <!-- <label class="label mb-4" for="email">Student No</label> -->
                <v-text-field label="Subject Title*" v-model="subjTitle" variant="outlined" :rules="rules.subjTitle"
                  required></v-text-field>
              </v-col>
              <v-col cols="12">
                <!-- <label class="label mb-4" for="email">Student No</label> -->
                <v-text-field label="Year Level*" v-model="yearLevel" variant="outlined" :rules="rules.yearLevel"
                  required></v-text-field>
              </v-col>
              <v-col cols="12">
                <!-- <label class="label mb-4" for="email">Student No</label> -->
                <!-- <v-text-field
                  label="Semester*"
                  v-model="semester"
                  variant="outlined"
                  :rules="rules.semester"
                  required
                ></v-text-field> -->
                <v-select variant="outlined" label="Semester" v-model="semester" :rules="rules.semester"
                  :items="['1st Semester', '2nd Semester', 'Summer']"></v-select>
              </v-col>
              <v-col cols="12">
                <!-- <label class="label mb-4" for="email">Student No</label> -->
                <v-text-field label="Lec*" v-model="lec" variant="outlined" :rules="rules.lec" type="number"
                  required></v-text-field>
              </v-col>
              <v-col cols="12">
                <!-- <label class="label mb-4" for="email">Student No</label> -->
                <v-text-field label="Lab*" v-model="lab" variant="outlined" :rules="rules.lab" type="number"
                  required></v-text-field>
              </v-col>
              <v-col cols="12">
                <!-- <label class="label mb-4" for="email">Student No</label> -->
                <v-text-field label="Units*" v-model="units" variant="outlined" :rules="rules.units" type="number"
                  required></v-text-field>
              </v-col>
              <v-col cols="12">
                <!-- <label class="label mb-4" for="email">Student No</label> -->
                <v-text-field label="Resultant" v-model="resultant" variant="outlined" required></v-text-field>
              </v-col>
            </v-row>

            <small class="text-caption text-medium-emphasis">*indicates required field</small>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="mx-5 my-2">
          <v-btn block color="green" text="Save" variant="flat" @click="addSubject()"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";

const toast = useToast();
const route = useRoute();
const loading = ref(false);
const isEmpty = ref(false);
const courseDetails = ref({});
const curriculumList = ref([]);
const createCuriDialog = ref(false);
const addSubjDialog = ref(false);
const isSelectedCurri = ref(false);
const documentid = ref("");
const curriculaYear = ref("");

/// Create Curriculum Variables
const createCurriForm = ref(null);
const effectiveSY = ref("");

// Create Subject Variables
const createSubjForm = ref(null);
const valid = ref(true);
const subjCode = ref("");
const subjTitle = ref("");
const yearLevel = ref("");
const semester = ref("");
const lec = ref(0);
const lab = ref(0);
const units = ref(0);
const resultant = ref("None");
const subjectList = ref([]);

const page = ref({
  title: "Course Details",
});
const breadcrumbs = ref([
  {
    title: "Dashboard",
    disabled: false,
    to: "/",
  },
  {
    title: "Courses",
    disabled: false,
    to: "/courses",
  },
  {
    title: "Details",
    disabled: true,
  },
]);
const headers = ref([
  {
    title: "Subject Code",
    sortable: true,
    key: "code",
  },
  { title: "Title", key: "title", sortable: false },
  { title: "Year Level", key: "year_level", sortable: false },
  { title: "Semester", key: "semester", sortable: false },
  { title: "Lec", key: "lec", sortable: false },
  { title: "Lab", key: "lab", sortable: false },
  { title: "Units", key: "units", sortable: false },
  { title: "Resultant", key: "resultant", sortable: false },
  { title: "", key: "actions", align: "end", sortable: false },
]);

const rules = ref({
  subjCode: [(v) => !!v || "Subject code is required"],
  subjTitle: [(v) => !!v || "Subject title is required"],
  yearLevel: [(v) => !!v || "Year level is required"],
  semester: [(v) => !!v || "Semester is required"],
  lec: [(v) => !!v || "Lec is required"],
  lab: [(v) => !!v || "Lab is required"],
  units: [(v) => !!v || "Units is required"],
  effectiveSY: [(v) => !!v || "Effective School Year is required"],
});

const itemsCurri = ref([
  { id: 1, text: "2020-2021", createdAt: "10-01-2021", icon: "mdi-account" },
  { id: 2, text: "2023-2024", createdAt: "10-01-2023" },
]);

async function initialize() {
  try {
    let result = await $fetch(`/api/course/${route.params.id}`);
    //console.log(result);
    if (result) {
      courseDetails.value = result[0];
      // @ts-ignore
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

async function getCurriculumList() {
  try {
    let result = await $fetch(`/api/curriculum/course-list/${route.params.id}`);
    //console.log(result);
    if (result) {
      curriculumList.value = result;
    }
  } catch (err) {
    console.error("Failed to fetch data: ", err);
    throw err;
  }
}

async function addCurriculum(ctx) {
  const { valid, errors } = await createCurriForm.value?.validate();

  if (valid) {
    const payload = {
      course_code: courseDetails.value.code,
      course_desc: courseDetails.value.description,
      major: courseDetails.value.major,
      effective_sy: effectiveSY.value,
      course_id: courseDetails.value.documentId,
    };

    console.log(payload);
    await $fetch(`/api/curriculum/createCurriculum`, {
      method: "POST",
      body: payload,
    }).then(response => {
      console.log("response: ", response)
      if (response.status == 'fail') {
        toast.error(response.message);
      } else {
        createCuriDialog.value = false;
        createCurriForm.value?.reset();
        getCurriculumList();
        toast.success("Curriculum successfully created!");
      }
    })

  } else {
    console.log(errors[0].errorMessages[0]);
  }
}

async function selectedCurricula(curriculum) {
  console.log("Selected Curri", curriculum);
  getCuriSubject(curriculum.documentId);
  documentid.value = curriculum.documentId;
  curriculaYear.value = curriculum.year;
}

async function getCuriSubject(curriculumId) {
  console.log("list of subject: ", curriculumId);
  isSelectedCurri.value = true;
  try {
    let result = await $fetch(`/api/subject/${curriculumId}`);
    console.log(result);
    if (result) {
      subjectList.value = result;
    }
  } catch (err) {
    console.error("Failed to fetch data: ", err);
    throw err;
  }
}

async function addSubject() {
  const { valid, errors } = await createSubjForm.value?.validate();
  console.log("Document ID: ", documentid.value);

  if (valid) {
    const payload = {
      curri_id: documentid.value,
      subj_code: subjCode.value,
      subj_title: subjTitle.value,
      year_level: yearLevel.value,
      semester: semester.value,
      lec: lec.value,
      lab: lab.value,
      units: units.value,
      resultant: resultant.value,
    };
    console.log("Subject: ", payload);
    await $fetch(`/api/subject/createSubject`, {
      method: "POST",
      body: payload,
    }).then(response => {
      console.log("response: ", response.status)
      if (response.status == 'fail') {
        toast.error(response.message);
      } else {
        addSubjDialog.value = false;
        createSubjForm.value?.reset();
        resultant.value = "None";
        getCuriSubject(payload.curri_id);
        toast.success("Subject successfully created!");
      }

    })

  } else {
    console.log(errors[0].errorMessages[0]);
  }
}

onMounted(() => {
  initialize();
  getCurriculumList();
});
</script>

<style scoped>
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

.btn {
  text-transform: none !important;
}

.card-title {
  font-weight: bold;
}

.title {
  font-weight: bold;
  margin-bottom: 2px;
  font-size: 12px;
}

.desc {
  font-size: 14px;
  font-weight: bold;
}
</style>

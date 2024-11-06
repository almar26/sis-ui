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
      <v-col cols="2">
        <v-list density="compact" nav>
        <v-list-subheader color="green" class="label-header"
          >GENERAL</v-list-subheader
        >
        <!-- <v-list-item
          prepend-icon="mdi-account-circle"
          title="Account"
          :to="`/students/${route.params.id}`"
        ></v-list-item>

        <v-list-item
          prepend-icon="mdi-book-multiple"
          title="Subjects"
     
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-calendar-clock-outline"
          title="Enrollment History"
        ></v-list-item> -->

        <v-list-item v-for="(link, i) in items" :key="i" :to="link.to" :title="link.title" :prepend-icon="link.icon">

        </v-list-item>

        
          <!-- <v-list-item v-for="(link, i) in items" :key="i" active-class="border" class="logout-border" :to="link.to">
            <v-list-item-content>
              <v-icon>{{ link.icon  }}</v-icon>
              <v-list-item-subtitle>{{ link.title }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item> -->
          
      
      </v-list>
      </v-col>
      <v-col cols="10">
        <v-card class="elevation-0">
          <!-- <div class="text-button font-weight-bold text-green mx-5">
            <v-icon>mdi-account</v-icon> Personal Information
          </div>
          
          <v-divider class="mb-4 mt-3"></v-divider> -->

          <v-tabs
            v-model="tab"
            align-tabs="start"
            bg-color="white"
            color="primary"
          >
            <v-tab prepend-icon="mdi-account" :value="1">Information</v-tab>
            <v-tab prepend-icon="mdi-school" :value="2">Education {{  studentDetails.student_no }}</v-tab>
          </v-tabs>

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
                          hide-details="auto"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="2">
                        <v-text-field
                          color="primary"
                          variant="outlined"
                          :model-value="studentDetails.major"
                          label="Major"
                          hide-details="auto"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="2">
                        <v-text-field
                          color="primary"
                          variant="outlined"
                          :model-value="studentDetails.course"
                          label="Section"
                          hide-details="auto"
                        ></v-text-field>
                      </v-col>
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
                      <v-col cols="12" md="6">
                        <v-text-field
                          color="primary"
                          variant="outlined"
                          :model-value="studentDetails.course"
                          label="Course"
                          hide-details="auto"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="2">
                        <v-text-field
                          color="primary"
                          variant="outlined"
                          :model-value="studentDetails.course"
                          label="Section"
                          hide-details="auto"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    
                    <v-row
                      ><v-col cols="12" md="4">
                        <v-text-field
                          color="primary"
                          variant="outlined"
                          label="Last Name"
                          hide-details="auto"
                          :model-value="studentDetails.last_name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          color="primary"
                          variant="outlined"
                          label="First Name"
                          :model-value="studentDetails.first_name"
                          hide-details="auto"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          color="primary"
                          variant="outlined"
                          label="Middle Name"
                          hide-details="auto"
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
              <v-card elevation="0">
                <v-card-text> 123123 </v-card-text>
              </v-card>
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
const route = useRoute();
const studentDetails = ref({});
const tab = ref(null);
const ifMajor = ref(false)
const isEmpty = ref(false);
const page = ref({
  title: "Student Details"
});
const breadcrumbs = ref([
  {
    title: "Dashboard",
    disabled: false,
    to: "/"
  },
  {
    title: "Students",
    disabled: false,
    to: "/students"
  },
  {
    title: "Details",
    disabled: true
  }
])
const items = ref([
  {
    icon: 'mdi-account-circle',
    title: 'Account',
    to: `/students/${route.params.id}`,
  },
  {
    icon: 'mdi-book-multiple',
    title: 'Subjects',
    to: '/account'
  },
  {
    icon: 'mdi-calendar-clock-outline',
    title: 'Enrollment History',
    to: '/account'
  }
])

async function initialize() {
  try {
    let result = await $fetch(`/api/student/${route.params.id}`);
    console.log(result);
    if (result) {
      studentDetails.value = result[0];
      if (result.length == 0) {
        //console.log("Empty Data")
        isEmpty.value = true
      } else {
       // console.log("has data")
        isEmpty.value = false
      }
      
    }
  } catch (err) {
    console.error("Failed to fetch data: ", err);
    throw err;
  }
}

onMounted(() => {
  initialize();
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
  background: #4CAF50;
  border-radius: 10px;
  text-decoration: none;
}
// .logout-border {
//   margin: 5px 8px 5px 8px;
//   border-radius: 10px;
//   text-decoration: none;
// }

.v-list-item-group .v-list-item--active {
  color: white !important;
}
.theme--light.v-list-item--active .v-list-item__subtitle {
  color: white !important;
}
</style>

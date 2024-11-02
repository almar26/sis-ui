<template>
  <div>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>

    <!-- {{ route.params.id }} -->
    <v-row v-if="isEmpty" dense>
      <h1>No Record Found</h1>
    </v-row>
    <v-row dense v-else>
      <v-col cols="12" md="3">
        <v-card elevation="0">
          <v-card-title class="card-title text-body-1 my-2">Course Details</v-card-title>
          <v-divider></v-divider>
          <v-list>
            <v-list-item>
              <v-list-item-subtitle class="title">Code</v-list-item-subtitle>
              <v-list-item-title class="desc">{{ courseDetails.code }}</v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-subtitle class="title">Description</v-list-item-subtitle>
              <v-list-item-title class="desc">{{ courseDetails.description }}</v-list-item-title>
            </v-list-item>
          </v-list>
          <div v-if="courseDetails.major != ''">
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-subtitle class="title">Major</v-list-item-subtitle>
              <v-list-item-title class="desc">{{ courseDetails.major }}</v-list-item-title>
            </v-list-item>
          </div>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-subtitle class="title">Status</v-list-item-subtitle>
            <v-list-item-title class="desc">{{ courseDetails.course_status }}</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-card-actions class="py-3">
            <v-btn variant="flat" color="blue" class="text-capitalize px-4">
              <v-icon start>mdi-pencil</v-icon>
              Edit</v-btn>
           
            <v-spacer></v-spacer>
            <v-btn variant="flat" color="red" class="text-capitalize px-4">
              <v-icon start>mdi-delete</v-icon>
              Delete</v-btn>

          </v-card-actions>

        </v-card>
      </v-col>

      <v-col cols="12" md="9">
        <v-card variant="flat">
          <v-toolbar color="transparent" class="pr-3" density="comfortable">
            <v-toolbar-title class="card-title text-body-1">Curriculumn</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn variant="flat" color="primary" class="text-capitalize px-4"> <v-icon start>mdi-plus</v-icon>Curriculumn</v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <v-data-table :items="courseList"
            :headers="headers"
            :loading="loading"></v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const loading = ref(false);
const isEmpty = ref(false);
const courseDetails = ref({});
const page = ref({
  title: "Course Details"
});
const breadcrumbs = ref([
  {
    title: "Dashboard",
    disabled: false,
    to: "/"
  },
  {
    title: "Courses",
    disabled: false,
    to: "/courses"
  },
  {
    title: "Details",
    disabled: true
  }
])
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

async function initialize() {
  try {
    let result = await $fetch(`/api/course/${route.params.id}`);
    console.log(result);
    if (result) {
      courseDetails.value = result[0];
      // @ts-ignore
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
})

</script>

<style scoped>
.btn {
  text-transform: none !important;
}

.card-title {
  color: #4CAF50;
  font-weight: bold;
}

.title {
  font-weight: bold;
  margin-bottom: 2px;
  font-size: 14px;
}

.desc {
  font-size: 14px;
  font-weight: bold;

}
</style>
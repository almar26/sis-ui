<template>
  <div>
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>

    <!-- <div class="d-flex align-center justify-center" style="height: 60vh">
      <v-card class="elevation-0 text-center py-16" color="transparent">
      <v-img src="/public/maintenance.png" class="mx-auto" :width="130"></v-img>
      <div class="service-notif">Service Unavailable</div>
    </v-card>
    </div> -->

    <v-card class="elevation-0">
      <v-tabs v-model="tab">
        <v-tab value="finalized">Finalized</v-tab>
        <v-tab value="unfinalized">Unfinalized</v-tab>

      </v-tabs>
      <v-divider></v-divider>
      <v-card-text>

        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="finalized">
            <v-data-table density="compact" :items="finalizedClasses" :headers="headers" :loading="loading">
              <template v-slot:[`item.teacher`]="{ item }">
                <v-chip class="ma-2" color="blue" variant="outlined" label>
                  <v-icon icon="mdi-account"  start></v-icon>
                  {{ item.teacher_name }}
                </v-chip>
              </template>
              <template v-slot:[`item.course`]="{ item }">
                {{ item.course_code }}-{{ item.section }}
              </template>
              <template v-slot:[`item.status`]="{ item }">
                <v-chip class="ma-2" color="warning" label v-if="item.finalize == null || item.finalize == false">
                  <v-icon icon="mdi-information" start></v-icon>
                  Unfinalize
                </v-chip>
                <v-chip class="ma-2" color="green" label v-else>
                  <v-icon icon="mdi-check-circle" start></v-icon>
                  Finalized
                </v-chip>
              </template>
            </v-data-table>
          </v-tabs-window-item>

          <v-tabs-window-item value="unfinalized">
            <v-data-table density="compact" :items="unFinalizedClasses" :headers="headers" :loading="loading2">
              <template v-slot:[`item.teacher`]="{ item }">
                <v-chip class="ma-2" color="blue" variant="outlined" label>
                  <v-icon icon="mdi-account" start></v-icon>
                  {{ item.teacher_name }}
                </v-chip>
              </template>
              <template v-slot:[`item.course`]="{ item }">
                {{ item.course_code }}-{{ item.section }}
              </template>
              <template v-slot:[`item.status`]="{ item }">
                <v-chip class="ma-2" color="warning" label v-if="item.finalize == null || item.finalize == false">
                  <v-icon icon="mdi-information" start></v-icon>
                  Unfinalize
                </v-chip>
                <v-chip class="ma-2" color="green" label v-else>
                  <v-icon icon="mdi-check-circle" start></v-icon>
                  Finalized
                </v-chip>
              </template>
            </v-data-table>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </v-card>



  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useMyAuthStore } from "~/stores/auth";
import { mergeProps } from "vue";
const { activeSY } = storeToRefs(useMyAuthStore());
const active_sy = ref(activeSY?.value);
const route = useRoute();
const page = ref({
  title: "List of Classes",
});
const breadcrumbs = ref([
  {
    title: "Dashboard",
    disabled: false,
    to: "/",
  },

  {
    title: "Classes",
    disabled: true,
  },
]);
const tab = ref(null)
const headers = ref([
  {
    title: "Teacher",
    sortable: true,
    key: "teacher"
  },
  {
    title: "Subject Code",
    sortable: true,
    key: "subject_code",
  },
  { title: "Subject Description", key: "subject_description", sortable: false },
  { title: "Course & Section", key: "course", sortable: false },
  { title: "Semester", key: "semester", sortable: false },
  { title: "School Year", key: "school_year", sortable: false },
  { title: "Status", key: "status", sortable: false },
  // { title: "", key: "actions", align: "end", sortable: false },
]);

const loading = ref(true);
const loading2 = ref(true);
const finalizedClasses = ref([]);
const unFinalizedClasses = ref([]);

// Get Finalized Classes
async function getFinalizedClasses() {
  try {
    let result = await $fetch(`/api/class/getFinalizedClassList?sy=${active_sy.value.school_year}&semester=${active_sy.value.semester}`);
    if (result) {
      finalizedClasses.value = result;
      loading.value = false;
    }
  } catch (err) {
    console.error("Failed to fetch data: ", err);
    loading.value = false;
    throw err;
  }
}

// Get Unfinalized Classes
async function getUnfinalizedClasses() {
  try {
    let result = await $fetch(`/api/class/getUnfinalizedClassList?sy=${active_sy.value.school_year}&semester=${active_sy.value.semester}`);
    if (result) {
      unFinalizedClasses.value = result;
      loading2.value = false;

    }
  } catch (err) {
    console.error("Failed to fetch data: ", err);
    loading.value = false;
    throw err;
  }
}

onMounted(async () => {
  //await getActiveSchoolyear();
  await getFinalizedClasses()
  await getUnfinalizedClasses()
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

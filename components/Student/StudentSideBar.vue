<template>
  <div>
    <v-row>
      <v-col>
        <v-card elevation="0" class="py-3">
          <!-- <v-toolbar color="transparent" class="mx-3" density="compact"><v-icon size="20">mdi-arrow-left</v-icon></v-toolbar> -->
          <v-card-text class="text-center">
            <v-avatar size="100" color="#EEEEEE" class="mb-3">
              <v-icon icon="mdi-account-circle" color="grey" size="95"></v-icon>
            </v-avatar>
            <p class="student-no mb-2">{{ studentDetails.student_no }}</p>
            <p class="student-name">{{ studentDetails.first_name }} {{ studentDetails.last_name }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="">
        <v-card class="elevation-0">
          <v-list density="compact" nav>
            <v-list-subheader color="green" class="label-header">GENERAL</v-list-subheader>
            <v-list-item v-for="(link, i) in items" :key="i" :to="link.to" :title="link.title"
              :prepend-icon="link.icon">
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-card-actions class="my-1">
            <!-- <v-btn color="primary" variant="flat" class="text-capitalize px-4"
              ><v-icon start>mdi-pencil</v-icon> Edit</v-btn
            > -->
            <v-spacer></v-spacer>
            <v-btn color="red" variant="tonal" block class="text-none" @click="deleteStudentDialog = true"><v-icon
                start>mdi-delete</v-icon> Delete Account</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>


    <!-- Delete Student Account -->
    <v-dialog v-model="deleteStudentDialog" width="auto">
      <v-card class="text-body-2" color="#263238" max-width="400" prepend-icon="mdi-delete"
        text="Are you sure you want to delete this account?" title="Delete Account">
        <template v-slot:actions>
          <v-spacer></v-spacer>
          <v-btn class="text-none" :loading="loading" text="Delete" prepend-icon="mdi-delete" color="red"
            variant="tonal" @click="deleteAccount()"></v-btn>
          <v-btn class="text-none" text="Cancel" prepend-icon="mdi-close" variant="tonal"
            @click="deleteStudentDialog = false"></v-btn>
        </template>
      </v-card>
    </v-dialog>

  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";
const route = useRoute();
const toast = useToast();
const props = defineProps(['studentDetails'])
const loading = ref(false);
const deleteStudentDialog = ref(false);
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

// Delete Student Account
async function deleteAccount() {
  try {
    loading.value = true;
    let result = await $fetch(`/api/student/delete/${route.params.id}`);
    if (result) {
      loading.value = false;
      (deleteStudentDialog.value = false),
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
</script>

<style scoped lang="scss">
.label-header {
  font-size: 15px !important;
  font-weight: bold;
  margin-bottom: 15px;
}
.student-no {
  font-size: 16px;
  font-weight: bold;
}
.student-name {
  color: green;
  font-size: 18px;
  font-weight: bold;
}
</style>

<template>
  <div>
    <v-row class="page-breadcrumb">
      <v-col cols="12" sm="12" class="pa-0">
        <v-card class="" elevation="0">
          <!-- <v-toolbar density="compact" flat class=" pa-0" height="40px">
            <v-toolbar-title class="pt-3">
              <span class="text--primary">{{ title }}</span>
            </v-toolbar-title>
            <v-toolbar-title class="toolbar-extension pb-3" slot="extension">
              <v-breadcrumbs :items="breadcrumbs" class="pa-0">
                <template v-slot:divider v-if="breadcrumbs">
                  <v-icon>mdi-chevron-right</v-icon>
                </template>
</v-breadcrumbs>

<slot></slot>
</v-toolbar-title>
<v-spacer></v-spacer>
</v-toolbar> -->


          <v-card-text>
            <p class="breadcrumbs-title">{{ title }}</p>
            <v-breadcrumbs :items="breadcrumbs" class="breadcrumbs">
              <template v-slot:divider>
                <v-icon icon="mdi-chevron-right"></v-icon>
              </template>
            </v-breadcrumbs>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- <v-breadcrumbs :items="breadcrumbs">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs> -->
  </div>
</template>

<script setup>
// const { title, breadcrumbs, icon } = defineProps([
//   "title",
//   "breadcrumbs",
//   "icon"
// ])

defineProps({
  title: String,
  breadcrumbs: Array,
  icon: String
})
</script>

<style scoped>
.page-breadcrumb {
  margin: -15px -25px 20px -25px;
  
}
.breadcrumbs-title {
  margin-left: 12px;
  font-size: 24px;
  font-weight:600;
  text-transform: capitalize;
  color: rgb(78, 78, 78);
  /* color: #4CAF50; */
}
.breadcrumbs{
  padding: 0;
  margin-left: 10px;
  color: #4CAF50;
}
</style>
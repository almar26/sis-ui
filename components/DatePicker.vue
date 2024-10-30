<template v-if="formattedDate">
  <div>
    <v-menu v-model="menu" :close-on-content-click="false" location="center">
      <template v-slot:activator="{ props }">
        <v-text-field
          :color="color"
          v-model="formattedDate"
          :class="customClass"
          :density="density"
          :label="label"
          :rules="rules"
          :variant="variant"
          hide-details="auto"
          prepend-inner-icon="mdi-calendar"
          clearable
          v-bind="props"
          @clear:append="formattedDate = 1"
        />
      </template>
      <div class="position-relative">
        <v-date-picker
          v-model="model"
          :color="color"
          title=""
          @update:modelValue="handleDateChange"
        />
        <v-btn
          class="position-absolute top-0 right-0"
          color="white"
          icon="mdi-close"
          size="small"
          variant="text"
          @click="menu = false"
        ></v-btn>
      </div>
    </v-menu>
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify";

const model = defineModel();
const { width, height, xs } = useDisplay();

const { label, color, customClass, rules, variant, density } = defineProps([
  "label",
  "color",
  "customClass",
  "rules",
  "variant",
  "density",
]);
const menu = ref(false);
const formattedDate = ref(formatDate(model.value));

const handleDateChange = (newDate) => {
  model.value = newDate;
};
watch(
  () => model.value,
  (newVal) => {
    formattedDate.value = formatDate(newVal);
    menu.value = false;
  }
);
onMounted(() => {
  model.value = model.value ? new Date(model.value) : null;
});

function formatDate(inputDate) {
  if (!inputDate) return "";
  const parsedDate = new Date(inputDate);
  if (!parsedDate.getTime()) return "";

  const day = `0${parsedDate.getDate()}`.slice(-2);
  const month = `0${parsedDate.getMonth() + 1}`.slice(-2);
  const year = parsedDate.getFullYear();
  return `${day}/${month}/${year}`;
}
</script>

<style>
.v-overlay__content:has(> .v-date-picker) {
  min-width: auto !important;
}

.v-picker-title {
  padding: 0 !important;
}

@media only screen and (max-width: 600px) {
  .v-overlay__content:has(> .v-date-picker) {
    left: 0 !important;
  }
}
</style>

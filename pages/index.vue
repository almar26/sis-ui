<template>
  <div>
    <h1>Dashboard</h1>
    <v-btn @click="logout()"><v-icon>mdi-logout</v-icon> Logout</v-btn>

    <!-- <VRow no-gutters align="center" justify="center">
      <VCol cols="12" md="6">
        <h1>Sign In</h1>
        <p class="text-medium-emphasis">Enter your details to get started</p>

        <VForm class="mt-7">
          <div class="mt-1">
            <label class="label text-grey-darken-2" for="email">Email</label>
            <VTextField
              v-model="email"
              variant="outlined"
              id="email"
              name="email"
              type="email"
            />
          </div>
          <div class="mt-1">
            <label class="label text-grey-darken-2" for="password"
              >Password</label
            >
            <VTextField
              v-model="password"
              variant="outlined"
              id="password"
              name="password"
              type="password"
            />
          </div>
          <div class="mt-5">
            <VBtn type="submit" block min-height="44" class="gradient primary"
              >Sign In</VBtn
            >
          </div>
        </VForm>
        <p class="text-body-2 mt-10">
          <NuxtLink to="/reset-password" class="font-weight-bold text-primary"
            >Forgot password?</NuxtLink
          >
        </p>
        <p class="text-body-2 mt-4">
          <span
            >Don't have an account?
            <NuxtLink to="/signup" class="font-weight-bold text-primary"
              >Sign Up</NuxtLink
            ></span
          >
        </p>
      </VCol>
    </VRow> -->
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useMyAuthStore } from "~/stores/auth";

const router = useRouter();
const { logUserOut } = useMyAuthStore();
const { authenticated } = storeToRefs(useMyAuthStore());

const email = ref("");
const password = ref("");

const logout = () => {
  logUserOut();
  router.push("/auth/signin");
};
</script>

<template>
  <div>
    <h1>Dashboard</h1>
    <v-btn @click="logout()"><v-icon>mdi-logout</v-icon> Logout</v-btn>
  </div>
</template>

<script setup>
import { storeToRefs} from 'pinia';
import { useMyAuthStore } from '~/stores/auth';

const router = useRouter();
const { logUserOut } = useMyAuthStore();
const { authenticated } = storeToRefs(useMyAuthStore());

const logout = () => {
  logUserOut();
  router.push('/auth/signin');
}

</script>

<style>

</style>
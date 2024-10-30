<template>
  <v-app>
    <v-app-bar  color="green-darken-2" prominent scroll-behavior="elevate">
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
        class="d-flex d-sm-none"
      ></v-app-bar-nav-icon>
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="rail = !rail"
        class="d-none d-sm-flex"
      ></v-app-bar-nav-icon>



      <v-toolbar-title>Student Management System</v-toolbar-title>

      <v-spacer></v-spacer>
      <div class="mr-2">
        <v-menu min-width="200px" rounded>
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
              <v-avatar color="brown" size="large">
                <v-img
                  alt="John"
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                ></v-img>
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              <div class="mx-auto text-center">
                <v-avatar color="brown">
                  <v-img
                    alt="John"
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                  ></v-img>
                </v-avatar>
                <h3 class="mt-2">{{ userData.username}}</h3>
                <p class="text-caption mt-1">{{ userData.email}}</p>
                <v-divider class="my-3"></v-divider>
                <v-btn prepend-icon="mdi-pencil" variant="text" rounded> Edit Account </v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn prepend-icon="mdi-logout" variant="text" rounded> Logout </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-menu>
      </div>
    </v-app-bar>
    <v-navigation-drawer
     theme="dark"
      v-model="drawer"
      elevation="0"
      :rail="rail"
      @click="rail = false"
    
    >
      <div class="image-container">
        <v-img
          src="/SNC-Logo.png"
          alt="Centered Image"
          class="rounded-image"
        ></v-img>
      </div>

      <v-divider></v-divider>
      <v-list density="compact" nav>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :prepend-icon="item.icon"
          :title="item.title"
          :to="item.route"
          
        >
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-logout"
            title="Logout"
            @click="logout()"
          >
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    
    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useMyAuthStore } from "~/stores/auth";

const router = useRouter();
const { logUserOut } = useMyAuthStore();
const { authenticated } = storeToRefs(useMyAuthStore());
const { userInfo } = storeToRefs(useMyAuthStore());

//@ts-ignore
const userData = ref(userInfo?.value.user);
const cookie = useCookie("token");
const drawer = ref(true);
const rail = ref(false);
const items = ref([
  { title: "Dashboard", route: "/", icon: "mdi-view-dashboard" },
  { title: "Students", route: "/students", icon: "mdi-account" },
  { title: "Subject", route: "/users", icon: "mdi-book" },
  { title: "Teacher", route: "/settings", icon: "mdi-account-supervisor" },
  { title: "Curriculumn", route: "/settings", icon: "mdi-card-text" },
]);

const logout = () => {
  logUserOut();
  router.push("/auth/signin");
};
</script>

<style scoped>
.image-container {
  width: 40%;
  margin: 10px auto;
}
.rounded-image {
  border-radius: 50%;
}
</style>

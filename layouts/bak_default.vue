<template>
  <div>
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        color="primary"
      >
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            subtitle="sandra_a88@gmailcom"
            title="Sandra Adams"
          ></v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-folder"
            title="My Files"
            value="myfiles"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account-multiple"
            title="Shared with me"
            value="shared"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-star"
            title="Starred"
            value="starred"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar :elevation="0">
        <template v-slot:prepend>
          <v-app-bar-nav-icon
            variant="text"
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>Application Bar</v-app-bar-title>
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
                  <h3>John Doe</h3>
                  <p class="text-caption mt-1">john.doe@doe.com</p>
                  <v-divider class="my-3"></v-divider>
                  <v-btn variant="text" rounded> Edit Account </v-btn>
                  <v-divider class="my-3"></v-divider>
                  <v-btn variant="text" rounded> Disconnect </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-menu>
          <!-- <v-menu
            v-model="menu"
            :close-on-content-click="false"
            location="bottom"
          >
            <template v-slot:activator="{ props }">
              <v-avatar>
                <v-img
                  v-bind="props"
                  alt="John"
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                ></v-img>
              </v-avatar>
            </template>

            <v-card min-width="300">
              <v-list>
                <v-list-item
                  prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
                  subtitle="Founder of Vuetify"
                  title="John Leider"
                >
                  <template v-slot:append>
                    <v-btn
                      :class="fav ? 'text-red' : ''"
                      icon="mdi-heart"
                      variant="text"
                      @click="fav = !fav"
                    ></v-btn>
                  </template>
                </v-list-item>
              </v-list>
              <v-divider></v-divider>
              <v-list>
                <v-list-item> </v-list-item>
              </v-list>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn variant="text" @click="menu = false"> Cancel </v-btn>
                <v-btn color="primary" variant="text" @click="menu = false">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu> -->
        </div>
      </v-app-bar>
      <v-main>
        <v-container fluid>
          <slot />
        </v-container>
      </v-main>
    </v-layout>
  </div>
</template>

<script lang="ts" setup>
const drawer = ref(true);
const menu = ref(false);
const rail = ref(false);
</script>

<style>
</style>
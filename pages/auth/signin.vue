<template>
	<div class="d-flex align-center justify-center px-10" style="height: 100vh">
		<v-card width="450" class="mx-auto card-border elevation-0" outlined>
      <!-- <v-img src="assets/images/logo.png" max-height="150" contain></v-img> -->

			<!-- <v-card-text>
				<v-row>
					<v-col>
						<a href="https://prod-wd-snc-server-dq5acxrlua-df.a.run.app/api/connect/microsoft"
							><v-img src="/ms-symbollockup_signin_dark.svg"></v-img
						></a>
					</v-col>
				</v-row>
			</v-card-text> -->


			<v-form ref="loginForm" v-model="valid" lazy-validation class="mx-10 mt-4">
				<v-text-field v-model="user.identifier" :rules="emailRules" variant="outlined" label="Email"
					prepend-inner-icon="mdi-email" outlined required></v-text-field>
				<v-text-field v-model="user.password" :rules="passwordRules" variant="outlined" label="Password"
					type="password" prepend-inner-icon="mdi-lock" outlined required></v-text-field>

				<v-btn :disabled="!valid" color="#673AB7" size="large" block @click.prevent="login">
					Sign In
				</v-btn>
			</v-form>
			<div class="hr-sect mx-15 my-5">or sign in with</div>
			<v-row class="mx-15">
				<!-- <v-col>
					<a href="https://prod-wd-snc-server-dq5acxrlua-df.a.run.app/api/connect/microsoft"><v-img
							src="/ms-symbollockup_signin_dark.svg" height="40"></v-img></a>
				</v-col> -->
				<v-col cols="auto" class="mr-auto">
					<v-btn outlined color="#404040" block><v-icon color="red" start>mdi-google</v-icon> Google</v-btn>
				</v-col>
				<v-col cols="auto">
					<v-btn outlined color="#404040" block
						href="https://prod-wd-snc-server-dq5acxrlua-df.a.run.app/api/connect/microsoft"><v-icon
							color="blue" start>mdi-microsoft</v-icon> Microsoft</v-btn>
				</v-col>
			</v-row>
			<v-card-actions class="mb-10 text-center">
				<v-spacer></v-spacer>
				<NuxtLink to="/auth/signup" class="nuxt-link">Create an account</NuxtLink>
				<v-spacer></v-spacer>
			</v-card-actions>

		</v-card>

		<v-snackbar v-model="snackbar" location="top" color="red">
			{{ text }}

			<template v-slot:actions>
				<v-btn variant="icon" @click="snackbar = false">
					<v-icon>mdi-close</v-icon>
				</v-btn>
			</template>
		</v-snackbar>

	</div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useMyAuthStore } from '~/stores/auth';

definePageMeta({
	layout: "auth",
});
useHead({
	title: 'Log In'
})

const router = useRouter();
const { authenticateUser } = useMyAuthStore(); // use authenticateUser action from auth store
const { authenticated } = storeToRefs(useMyAuthStore()); // make authenticated state reactive with storeToRefs
const { userInfo } = storeToRefs(useMyAuthStore()); // make userInfo state reactive
const { errorLogin } = storeToRefs(useMyAuthStore()); // make errorLogin state reactive
const { errorMessage } = storeToRefs(useMyAuthStore()); // make errorMessage state reactive

const valid = ref(true);
const user = ref({
	identifier: '',
	password: ''
})
const loginForm = ref(null);
const emailRules = [
	(v) => !!v || 'Email is required',
	(v) => /.+@.+\..+/.test(v) || "E-mail must be valid"
];
const passwordRules = [(v) => !!v || 'Password is required'];
const snackbar = ref(false);
const text = ref("HHHHHH");


// FUNCTIONS
async function login() {
	const { valid, errors } = await loginForm.value?.validate()
	if (valid) {
		await authenticateUser(user.value); // call autheticateUser and pass the user object
		if (authenticated) {
			router.push('/');
		}
		if (errorLogin.value == true) {
			console.log(errorLogin.value)
			snackbar.value = true;
			text.value = errorMessage.value;
			//console.log("Error Signing in!", errorLogin.value);
		}
	}
}


</script>

<style scoped>
.nuxt-link {
	text-decoration: none;
	padding-top: 5px;
	color: #2196f3;
}

.card-border {
	border-radius: 20px;
	box-shadow: rgba(0, 0, 0, 0.3) 0px 7px 29px 0px;
}

.hr-sect {
	display: flex;
	flex-basis: 100%;
	align-items: center;
	color: rgba(0, 0, 0, 0.9);
	margin: 8px 0;
}

.hr-sect::before,
.hr-sect::after {
	content: "";
	flex-grow: 1;
	background: rgba(0, 0, 0, 0.15);
	height: 1px;
	font-size: 0;
	line-height: 0;
	margin: 0 8px;
}
</style>

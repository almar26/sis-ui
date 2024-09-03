export default defineNuxtRouteMiddleware((to, from) => {
    const { authenticated } = storeToRefs(useMyAuthStore()); // make authenticated state reactive
    const { userInfo } = storeToRefs(useMyAuthStore()); // make userInfo state reactive
    const token = useCookie('token'); // get token from cookies
    //@ts-ignore
    const user_info = JSON.parse(localStorage.getItem("user-info")); // get user-info from localStorage

    // const user_info = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user-info')) : null;
    // const _userinfo = ref(localStorage.getItem("user-info"));

    if (token.value) {
        // check if value exists
        authenticated.value = true; // update the state to authenticated
        userInfo.value = user_info; // update the userInfo state
    }

    // if token exists and layout is auth redirect to homepage
    if (token.value && to.meta.layout === 'auth') {
        return navigateTo('/');
    }

    // if token doesn't exist redirect to login page
    if (!token.value && to.meta.layout !== 'auth') {
        abortNavigation();
        return navigateTo('/auth/signin');
    }
})

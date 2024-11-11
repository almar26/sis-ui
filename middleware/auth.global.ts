export default defineNuxtRouteMiddleware((to, from) => {
  const { authenticated } = storeToRefs(useMyAuthStore()); // make authenticated state reactive
  const { userInfo } = storeToRefs(useMyAuthStore()); // make userInfo state reactive
  const token = useCookie("token"); // get token from cookies
  //@ts-ignore
  const user_info = JSON.parse(localStorage.getItem("user-info")); // get user-info from localStorage
  // console.log("user account: ", user_info);
  // console.log("Token: ", token)

  // const user_info = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user-info')) : null;
  // const _userinfo = ref(localStorage.getItem("user-info"));
  //console.log("Middleware Log: ", user_info);
  //const userRole = user_info.user.role_view;

  // if (token.value === null && user_info === null) {
  //   console.log("No user acount")
  //   //abortNavigation();
  //   // return console.log("No user acount")
 
  //   throw createError({
  //     statusCode: 500,
  //     statusMessage: 'Something bad happened on the server'
  //   })
  // }
  if(token.value == null && user_info) {
    localStorage.removeItem("user-info")
    // console.log("Token doesnt exist")
    console.log("Token doesnt exist but it has data")
  }
  // if (user_info) {
    
  //   console.log("Token doesnt exist but it has data")
  // }
  if (token.value && user_info === null) {
    console.log("Token exist but no user info details")
    localStorage.removeItem("user-info")
    token.value = null
    authenticated.value = false;
    //return authenticated.value = false;
  }
  if (token.value) {
    // check if value exists
    authenticated.value = true; // update the state to authenticated
    userInfo.value = user_info; // update the userInfo state

  // if (token.value && user_info.user.role_view === "admin") {
  //   console.log("Admin Account");
  //     if (token.value && to.path !== "/admin") {
  //     return navigateTo("/admin");
  //   }
  //   console.log("Admin Account 2");
  // } else if (token.value && user_info.user.role_view === "basic") {
  //   console.log("Basic Account");
  //   if (to.meta.layout === "admin" || to.meta.layout === "auth") {
  //     return navigateTo("/");
  //   }
  //   console.log("Basic Account 2");
  // }
    
  }

  // if (token.value && user_info.user.role_view === "admin") {
  //   console.log("Admin Account");
  //   if (to.meta.layout === "default" || to.meta.layout === "auth") {
  //     return navigateTo("/admin");
  //   }
  //   console.log("Admin Account 2");
  // } else if (token.value && user_info.user.role_view === "basic") {
  //   console.log("Basic Account");
  //   if (to.meta.layout === "admin" || to.meta.layout === "auth") {
  //     return navigateTo("/");
  //   }
  // }


  if (token.value && user_info.user.role_view === "admin") {
    console.log("Admin Account");
    if (token.value && to.path !== "/admin") {
      return navigateTo("/admin");
    }
  } else if (token.value && user_info.user.role_view === "basic") {
    console.log("Basic Account");

    if (to.meta.layout === 'admin' || to.meta.layout === 'auth' || to.meta.layout === 'student') {
      return navigateTo("/");
    }
    //console.log("Basic Account");
  } else if (token.value && user_info.user.role_view === 'student') {
    console.log("Student Account")
    // if (to.meta.layout === 'default' || to.meta.layout === 'auth' || to.meta.layout === 'admin') {
    //   return navigateTo("/admin2")
    // }
    if (to.path !== "/admin2") {
      return navigateTo("/admin2");
    }
    console.log("Student Account 2")
  }

  // // if token exists and layout is auth redirect to homepage
  // if (token.value && to.meta.layout === 'auth') {
  //     return navigateTo('/');
  // }

  // if token doesn't exist redirect to login page
  if (!token.value && to.meta.layout !== "auth") {
    abortNavigation();
    return navigateTo("/auth/signin");
  }
});

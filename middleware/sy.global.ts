export default defineNuxtRouteMiddleware((to, from) => {
  const { authenticated } = storeToRefs(useMyAuthStore());
  const { activeSY } = storeToRefs(useMyAuthStore());
  // const { activeSY } = storeToRefs(useMySyStore());
  const token = useCookie("token"); // get token from cookies

  const active_sy = JSON.parse(localStorage.getItem("active-sy"));

  if (token.value) {
    activeSY.value = active_sy;
    //console.log("active sy:", activeSY.value);
  }
});

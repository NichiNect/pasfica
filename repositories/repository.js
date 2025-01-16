/**
 * * If you will use the standard API token with the refresh token stuff, you can uncomment code bellow
 */

// import { useAuthStore } from "@/stores/auth";

const useApiFetch = async (method, url, options = {}, mode = "standard") => {
  const runtimeConfig = useRuntimeConfig();
  // const authStore = useAuthStore();

  // await checkTimeOut();

  const requestOptions = {
    ...options,
    method,
    baseURL: runtimeConfig.public.baseAPI,
    watch: false
  };

  if (mode == 'custom') {
    delete requestOptions.baseURL;
  }

  // if (authStore.tokenCookie) {
  //   requestOptions.headers = {
  //     ...requestOptions.headers,
  //     "Authorization": `Bearer ${authStore.tokenCookie}`
  //   }
  // }

  return useFetch(url, requestOptions);
}

// async function checkTimeOut() {

//   const authStore = useAuthStore();

//   const now = Date.now();

//   if (now >= new Date(authStore.expiredCookie).getTime()) {

//     await fetchRefreshToken(authStore.refreshTokenCookie);
//   }
// }

// async function fetchRefreshToken(refreshToken) {

//   const authStore = useAuthStore();
//   const config = useRuntimeConfig();

//   try {
//     const { data } = await useFetch('/auth/refresh-token', {
//       method: 'post',
//       baseURL: config.public.baseAPI,
//       body: {
//         refresh_token: refreshToken ?? null
//       },
//       headers: {
//         Authorization: `Bearer ${authStore.token}`
//       },
//       watch: false
//     });

//     const result = data.value;

//     authStore.setRefreshToken(result?.refresh_token);
//     authStore.login(result?.token?.token);
//     authStore.setUserData(result?.user);
//     authStore.setExpired(result?.token?.expires_at);
//   } catch (error) {
//   }
// }

export default useApiFetch;
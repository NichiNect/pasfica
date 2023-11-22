import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {

  const tokenCookie = useCookie('token');
  const refreshTokenCookie = useCookie('refreshToken');
  const expiredCookie = useCookie('expired');

  const userData = ref({});

  const isAuthenticated = computed(() => tokenCookie.value);

  // * Setters
  const setUserData = (data) => {
    userData.value = data;
  }
  const setToken =  (data) => {
    tokenCookie.value = data;
  }
  const setRefreshToken = (data) => {
    refreshTokenCookie.value = data;
  }
  const setExpired = (data) => {
    expiredCookie.value = data;
  }

  // * Actions
  const login = (token) => {
    setToken(token);
  }
  const logout = () => {
    setToken(null);
    setUserData(null);
    setRefreshToken(null);
    setExpired(null);

    navigateTo('/');
  }
  
  return {
    tokenCookie,
    refreshTokenCookie,
    expiredCookie,
    userData,
    isAuthenticated,
    setUserData,
    setToken,
    setRefreshToken,
    setExpired,
    login,
    logout
  }
});
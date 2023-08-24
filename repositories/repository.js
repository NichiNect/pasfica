const useApiFetch = (method, url, options = {}, mode = 'standard') => {
  const runtimeConfig = useRuntimeConfig();
  // const token = useCookie('token');

  const requestOptions = {
    ...options,
    method,
    baseURL: runtimeConfig.public.apiBase,
  };

  if (mode == 'custom') {
    delete requestOptions.baseURL;
  }

  // if (token) {
  //   requestOptions.headers = { Authorization: `Bearer ${authStore.token}` };
  // }
  return useFetch(url, requestOptions);
}

export default useApiFetch;
<script setup>
import { faSignIn } from '@fortawesome/free-solid-svg-icons';
import { useAuthStore } from "@/stores/auth";

const { $apiFetcher, $toast } = useNuxtApp();
const auth = useAuthStore();

/**
 * * Variables
 */
const isLoading = ref(false);
const formValue = ref({
  username: '',
  password: ''
});

/**
 * * Methods
 */
const onSubmitHandler = async () => {
  console.log('username:', formValue.value.username);
  console.log('password:', formValue.value.password);

  try {

    const { data } = await $apiFetcher.auth.login({
      body: formValue.value,
      onResponse({request, response, options}) {
        if (response.status == 422) {
          // validation errors
          $toast.error('Validation error. Failed to login');
        } else if (response.status == 401) {
          // Unauthorize/Invalid
          $toast.error(`Failed to login: ${response._data?.message}`);
        } else if (response.status == 500) {
          // Internal Backend Server Error
          $toast.error(`Failed to login: Internal Server Error (${response._data?.message})`);
        }
      }
    });

    auth.login(data.value?.token?.token);
    auth.setRefreshToken(data.value?.refresh_token);
    auth.setUserData(data.value?.user);
    auth.setExpired(data.value?.token?.expires_at);

    navigateTo('/admin');
  } catch(error) {
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="h-screen flex flex-col justify-center items-center">
    <div class="py-8 px-8 text-center">
      <h2 class="text-4xl text-gray-600">Your Awesome <span class="font-semibold">Application</span></h2>
      <p class="text-lg lg:text-xl/4 py-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, rerum!</p>
    </div>
    <div class="container w-5/6 lg:w-[780px] bg-white rounded-2xl shadow-lg pt-8 pb-10 px-8">
      <div class="flex flex-wrap items-center px-2">
        <div class="w-full lg:w-1/2 pr-2">
          <h4 class="text-gray-700 text-lg font-medium tracking-wider pb-6">
            New <span class="font-semibold">Awesome Application</span> Built by <span class="font-semibold">Awesome Starter</span>
          </h4>
          <p class="mb-3 text-sm">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis numquam tempore error eveniet quisquam, repellendus, blanditiis accusamus corrupti non sapiente asperiores ducimus at quis quod aliquid obcaecati aspernatur id nam!</p>
          <a href="#" class="text-blue-600 font-medium text-lg">Read more..</a>
        </div>
        <div class="w-full mt-6 lg:w-1/2 pl-2">
          <div class="flex flex-wrap">
            <h4 class="text-gray-700 text-xl font-semibold tracking-widest mb-6">Login to Your Account</h4>
            <form action="#" @submit.prevent="onSubmitHandler" class="flex flex-col w-full">
              <div class="w-full my-3">
                <BaseInputDefault
                  name="username"
                  label="Username.."
                  placeholder="Fill username.."
                  @onChange="(data) => formValue.username = data.value"
                />
              </div>
              <div class="w-full my-3">
                <BaseInputDefault
                  type="password"
                  name="password"
                  label="Password.."
                  placeholder="Fill password.."
                  @onChange="(data) => formValue.password = data.value"
                />
              </div>
              <a href="#" class="text-blue-600 font-semibold text-md ml-auto">Forgot Password?</a>
              <div class="w-full flex justify-between mt-4">
                <BaseButton
                  color="primary"
                  variant="outline"
                  size="md"
                  class="px-20 lg:px-12"
                >
                  <FontAwesomeIcon :icon="faSignIn" class="mr-3" />
                  <span class="font-4xl">Register</span>
                </BaseButton>

                <BaseButton
                  type="submit"
                  color="primary"
                  size="md"
                  class="px-20 lg:px-14"
                >
                  <FontAwesomeIcon :icon="faSignIn" class="mr-3" />
                  <span class="font-4xl">Login</span>
                </BaseButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="pt-8">
      <p class="text-gray-600 font-medium">Copyright &copy; 2023 - Your Company</p>
    </div>
  </div>
</template>
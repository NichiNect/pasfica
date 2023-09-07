<script setup>
import { faSignIn } from '@fortawesome/free-solid-svg-icons';

/**
 * * Variables
 */
const formValue = ref({
  username: '',
  password: ''
});

/**
 * * Methods
 */
const onSubmitHandler = () => {
  console.log('username:', formValue.value.username);
  console.log('password:', formValue.value.password);
}
</script>

<template>
  <div class="h-screen">
    <div class="block w-full max-h-screen lg:flex lg:flex-row justify-center items-center">
      <div class="container hidden lg:flex flex-col gap-10 w-full h-screen justify-center items-center bg-lightPrimary">
        <img src="/svg/online-stats.svg" alt="Data not Found" class="w-1/2">
        <h2 class="text-4xl font-bold text-slate-50 font-mono tracking-wider hover:italic">Login to Awesome Application</h2>
      </div>
      <div class="container w-full lg:w-8/12 h-screen flex justify-center items-center">
        <div class="w-screen lg:w-[600px] bg-white rounded-2xl shadow-lg pt-8 pb-10 px-8">
          <div class="flex flex-wrap items-center px-2">
            <div class="w-full mt-6 pl-2">
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
                  <div class="w-full flex flex-col gap-4 justify-center mt-6">
                    <BaseButton
                      type="submit"
                      color="primary"
                      size="lg"
                    >
                      <FontAwesomeIcon :icon="faSignIn" class="mr-3" />
                      <span class="font-4xl">Login</span>
                    </BaseButton>

                    <BaseButton
                      color="primary"
                      variant="outline"
                      size="lg"
                    >
                      <FontAwesomeIcon :icon="faSignIn" class="mr-3" />
                      <span class="font-4xl">Register</span>
                    </BaseButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
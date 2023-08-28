<script setup>
import { faClockFour, faMailBulk, faMapMarkedAlt, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGithub, faInstagram, } from '@fortawesome/free-brands-svg-icons';
import moment from 'moment';
moment.locale('id');

</script>

<template>
  <footer class="text-gray-100 bg-lightPrimary">
    <div class="container flex items-start flex-wrap md:flex-row md:flex-nowrap flex-col px-12 py-24">
      <div class="w-3/6 flex-shrink-0 md:mx-0 text-left">
        <div>
          <!-- <NuxtLink class="w-26 hidden lg-block">
            <img src="/logo.png" width="180" height="60" />
          </NuxtLink> -->
          <h1 class='text-4xl font-bold whitespace-nowrap'>Your Logo</h1>
        </div>

        <p class="mt-12 text-lg text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores tenetur voluptate blanditiis. Ut, et cum autem exercitationem obcaecati nam! Odio quo et beatae ratione itaque, totam numquam exercitationem officiis excepturi.
        </p>
      </div>

      <div class="flex flex-grow flex-wrap -mb-10 mt-10 md:pl-20 md:mt-0 text-left">
        <div class="w-full md:px-4">
          <h2 class="title-font font-medium tracking-widest text-lg mb-3 text-gray-800">
            Contact Me
          </h2>

          <div class="mb-10">
            <ul>
              <li class="mb-3">
                <NuxtLink
                  href="#"
                  class="text-gray-600 hover:text-gray-800 text-xl">
                  <FontAwesomeIcon
                    :icon="faMapMarkedAlt"
                    class="mr-3 text-one text-2xl"/>
                  Jl. Lorem ipsum, dolor sit amet, consectetur
                </NuxtLink>
              </li>
              <li class="mb-3">
                <NuxtLink
                  href="#"
                  class="text-gray-600 hover:text-gray-800 text-xl">
                  <FontAwesomeIcon
                    :icon="faPhoneAlt"
                    class="mr-3 text-one text-2xl"/>
                  +62 888 8888 8888
                </NuxtLink>
              </li>
              <li class="mb-3">
                <NuxtLink
                  href="#"
                  class="text-gray-600 hover:text-gray-800 text-xl">
                  <FontAwesomeIcon
                    :icon="faMailBulk"
                    class="mr-3 text-one text-2xl"/>
                  yourcontact@mail.com
                </NuxtLink>
              </li>
              <li class="mb-3">
                <NuxtLink
                  href="#"
                  class="text-gray-600 hover:text-gray-800 text-xl">
                  <FontAwesomeIcon
                    :icon="faClockFour"
                    class="mr-3 text-one text-2xl"/>
                    24/7 Online Suport | Monday - Friday
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-primary">
      <div class="container flex flex-wrap mx-auto py-4 px-5">
        <p class="text-white text-lg text-center sm:text-left">
          Copyright &copy; {{ moment(new Date()).format('Y') }} - 
          Your Company
        </p>
        <div class="inline-flex gap-5 justify-center sm:justify-start my-auto sm:ml-auto sm:mt-1">
          <NuxtLink to="#" class="text-gray-500">
            <FontAwesomeIcon :icon="faFacebook" class="text-white text-xl" />
          </NuxtLink>
          <NuxtLink to="#" class="ml-3 text-gray-500">
            <FontAwesomeIcon :icon="faInstagram" class="text-white text-xl" />
          </NuxtLink>
          <NuxtLink to="#" class="ml-3 text-gray-500">
            <FontAwesomeIcon :icon="faGithub" class="text-white text-xl" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup>
/**
 * * Layouts
 */
definePageMeta({
  layout: "front",
});

/**
 * * Variables
 */
const sliders = ref([
  {
    src: '/images/sliders/slider-1.png',
    description: 'lorem ipsum dolor sit amet 1'
  },
  {
    src: '/images/sliders/slider-2.png',
    description: 'lorem ipsum dolor sit amet 2'
  },
  {
    src: '/images/sliders/slider-3.png',
    description: 'lorem ipsum dolor sit amet 3'
  },
  {
    src: '/images/sliders/slider-4.png',
    description: 'lorem ipsum dolor sit amet 4'
  },
  {
    src: '/images/sliders/slider-5.png',
    description: 'lorem ipsum dolor sit amet 5'
  },
  {
    src: '/images/sliders/slider-6.png',
    description: 'lorem ipsum dolor sit amet 6'
  },
]);

const productData = ref([
  {
    title: 'Mountain',
    places: [
      {
        title: 'Lorem ipsum dolor sit amet. 1',
        price: 50000,
        address: 'Jl Lorem ipsum dolor, No. 10, sit, amet',
        img: 'https://source.unsplash.com/336x336?mountain'
      },
      {
        title: 'Lorem ipsum dolor sit amet. 2',
        price: 70000,
        address: 'Jl Lorem ipsum dolor, No. 10, sit, amet',
        img: 'https://source.unsplash.com/400x300?mountain'
      },
      {
        title: 'Lorem ipsum dolor sit amet. 3',
        price: 100000,
        address: 'Jl Lorem ipsum dolor, No. 10, sit, amet',
        img: 'https://source.unsplash.com/400x300?mountain'
      },
      {
        title: 'Lorem ipsum dolor sit amet. 4',
        price: 80000,
        address: 'Jl Lorem ipsum dolor, No. 10, sit, amet',
        img: 'https://source.unsplash.com/400x300?mountain'
      },
      {
        title: 'Lorem ipsum dolor sit amet. 5',
        price: 90000,
        address: 'Jl Lorem ipsum dolor, No. 10, sit, amet',
        img: 'https://source.unsplash.com/400x300?mountain'
      },
      {
        title: 'Lorem ipsum dolor sit amet. 6',
        price: 120000,
        address: 'Jl Lorem ipsum dolor, No. 10, sit, amet',
        img: 'https://source.unsplash.com/400x300?mountain'
      },
      {
        title: 'Lorem ipsum dolor sit amet. 7',
        price: 120000,
        address: 'Jl Lorem ipsum dolor, No. 10, sit, amet',
        img: 'https://source.unsplash.com/400x300?mountain'
      },
      {
        title: 'Lorem ipsum dolor sit amet. 8',
        price: 135000,
        address: 'Jl Lorem ipsum dolor, No. 10, sit, amet',
        img: 'https://source.unsplash.com/400x300?mountain'
      },
      {
        title: 'Lorem ipsum dolor sit amet. 9',
        price: 95000,
        address: 'Jl Lorem ipsum dolor, No. 10, sit, amet',
        img: 'https://source.unsplash.com/400x300?mountain'
      },
      {
        title: 'Lorem ipsum dolor sit amet. 10',
        price: 125000,
        address: 'Jl Lorem ipsum dolor, No. 10, sit, amet',
        img: 'https://source.unsplash.com/400x300?mountain'
      },
    ]
  },
  {
    title: 'Sea & Beach',
    places: [
      {
        title: 'Lorem ipsum dolor sit amet. 1',
        price: 50000,
        address: 'Jl Lorem ipsum dolor, No. 10, sit, amet',
        img: 'https://source.unsplash.com/336x336?sea'
      },
      {
        title: 'Lorem ipsum dolor sit amet. 2',
        price: 70000,
        address: 'Jl Lorem ipsum dolor, No. 10, sit, amet',
        img: 'https://source.unsplash.com/400x300?sea'
      },
      {
        title: 'Lorem ipsum dolor sit amet. 3',
        price: 100000,
        address: 'Jl Lorem ipsum dolor, No. 10, sit, amet',
        img: 'https://source.unsplash.com/400x300?sea'
      },
      {
        title: 'Lorem ipsum dolor sit amet. 4',
        price: 80000,
        address: 'Jl Lorem ipsum dolor, No. 10, sit, amet',
        img: 'https://source.unsplash.com/400x300?sea'
      },
      {
        title: 'Lorem ipsum dolor sit amet. 5',
        price: 90000,
        address: 'Jl Lorem ipsum dolor, No. 10, sit, amet',
        img: 'https://source.unsplash.com/400x300?sea'
      },
      {
        title: 'Lorem ipsum dolor sit amet. 6',
        price: 120000,
        address: 'Jl Lorem ipsum dolor, No. 10, sit, amet',
        img: 'https://source.unsplash.com/400x300?sea'
      },
      {
        title: 'Lorem ipsum dolor sit amet. 7',
        price: 120000,
        address: 'Jl Lorem ipsum dolor, No. 10, sit, amet',
        img: 'https://source.unsplash.com/400x300?sea'
      },
      {
        title: 'Lorem ipsum dolor sit amet. 8',
        price: 135000,
        address: 'Jl Lorem ipsum dolor, No. 10, sit, amet',
        img: 'https://source.unsplash.com/400x300?sea'
      },
      {
        title: 'Lorem ipsum dolor sit amet. 9',
        price: 95000,
        address: 'Jl Lorem ipsum dolor, No. 10, sit, amet',
        img: 'https://source.unsplash.com/400x300?sea'
      },
      {
        title: 'Lorem ipsum dolor sit amet. 10',
        price: 125000,
        address: 'Jl Lorem ipsum dolor, No. 10, sit, amet',
        img: 'https://source.unsplash.com/400x300?sea'
      },
      {
        title: 'Lorem ipsum dolor sit amet. 11',
        price: 100000,
        address: 'Jl Lorem ipsum dolor, No. 10, sit, amet',
        img: 'https://source.unsplash.com/400x300?sea'
      },
      {
        title: 'Lorem ipsum dolor sit amet. 12',
        price: 145000,
        address: 'Jl Lorem ipsum dolor, No. 10, sit, amet',
        img: 'https://source.unsplash.com/400x300?sea'
      },
    ]
  },
]);

const recomendationProductList = ref([
  {
    title: 'Lorem ipsum dolor sit amet. 1',
    price: 50000,
    address: 'Jl Lorem ipsum dolor, No. 10, sit, amet',
    img: 'https://source.unsplash.com/336x336?sea'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 2',
    price: 70000,
    address: 'Jl Lorem ipsum dolor, No. 10, sit, amet',
    img: 'https://source.unsplash.com/400x300?mountain'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 3',
    price: 100000,
    address: 'Jl Lorem ipsum dolor, No. 10, sit, amet',
    img: 'https://source.unsplash.com/400x300?mountain'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 4',
    price: 80000,
    address: 'Jl Lorem ipsum dolor, No. 10, sit, amet',
    img: 'https://source.unsplash.com/400x300?sea'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 5',
    price: 90000,
    address: 'Jl Lorem ipsum dolor, No. 10, sit, amet',
    img: 'https://source.unsplash.com/400x300?beach'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 6',
    price: 120000,
    address: 'Jl Lorem ipsum dolor, No. 10, sit, amet',
    img: 'https://source.unsplash.com/400x300?mountain'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 7',
    price: 120000,
    address: 'Jl Lorem ipsum dolor, No. 10, sit, amet',
    img: 'https://source.unsplash.com/400x300?nature'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 8',
    price: 135000,
    address: 'Jl Lorem ipsum dolor, No. 10, sit, amet',
    img: 'https://source.unsplash.com/400x300?sea'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 9',
    price: 95000,
    address: 'Jl Lorem ipsum dolor, No. 10, sit, amet',
    img: 'https://source.unsplash.com/400x300?lake'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 10',
    price: 125000,
    address: 'Jl Lorem ipsum dolor, No. 10, sit, amet',
    img: 'https://source.unsplash.com/400x300?sea'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 11',
    price: 100000,
    address: 'Jl Lorem ipsum dolor, No. 10, sit, amet',
    img: 'https://source.unsplash.com/400x300?tree'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 12',
    price: 145000,
    address: 'Jl Lorem ipsum dolor, No. 10, sit, amet',
    img: 'https://source.unsplash.com/400x300?sea'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 13',
    price: 145000,
    address: 'Jl Lorem ipsum dolor, No. 10, sit, amet',
    img: 'https://source.unsplash.com/400x300?island'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 14',
    price: 145000,
    address: 'Jl Lorem ipsum dolor, No. 10, sit, amet',
    img: 'https://source.unsplash.com/400x300?flower'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 15',
    price: 145000,
    address: 'Jl Lorem ipsum dolor, No. 10, sit, amet',
    img: 'https://source.unsplash.com/400x300?sea'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 16',
    price: 145000,
    address: 'Jl Lorem ipsum dolor, No. 10, sit, amet',
    img: 'https://source.unsplash.com/400x300?temple'
  },
]);

</script>

<template>
  <div class="container mx-auto min-h-screen py-4 px-4 lg:px-8 pb-12">
    <Swiper
      :modules="[SwiperAutoplay, SwiperNavigation]"
      :loop="true"
      :navigation="true"
      :centeredSlides="true"
      :spaceBetween="30"
      :autoplay="{
        delay: 6000,
        disableOnInteraction: true,
      }"
    >
      <SwiperSlide v-for="(slide, index) in sliders" :key="index">
        <img :src="slide.src" :alt="slide.description" class="w-full aspect-[16/5] bg-secondary rounded-[20px] overflow-hidden shadow-md">
      </SwiperSlide>
    </Swiper>

    <!-- Product Slide Card -->
    <div class="hidden lg:block">

      <div v-for="(item, index) in productData" :key="index">
        <div class="mt-8 mb-2">
          <h3 class="font-semibold text-xl text-gray-600">{{ item.title }}</h3>
        </div>

        <Swiper
          :modules="[SwiperNavigation]"
          :centeredSlides="true"
          :navigation="true"
          :spaceBetween="20"
        >
          <SwiperSlide v-for="(slideCount, indexSlideCount) in [1, 2]">
            <div class="w-full">
              <div class="grid grid-cols-6 gap-4 py-6">
                <div v-for="(cardPerSlide, indexCardPerSlide) in [1, 2, 3, 4, 5, 6]">
                  <div v-if="indexSlideCount == 0 && indexCardPerSlide == 0" :key="indexCardPerSlide" class="relative">
                    <div class="absolute w-[130%] h-[110%] top-1/2 -translate-y-1/2 aspect-square rounded-lg bg-primary shadow -z-10">
                      <img :src="item.places[0]?.img" :alt="item.places[0]?.title" width="100%" class="rounded-lg">
                    </div>
                  </div>
                  <div v-else>
                    <div v-if="item.places?.at(indexCardPerSlide + (indexSlideCount * 6))">
                      <NuxtLink to="#">
                        <div class="block w-full aspect-[3/3.4] bg-white rounded-lg shadow p-4 mt-3">
                          <div class="w-full aspect-[4/3] rounded-md overflow-hidden">
                            <img :src="item.places?.at(indexCardPerSlide + (indexSlideCount * 6))?.img" alt="">
                          </div>
                          <p class="text-gray-500 mt-5 min-h-[38px] lg:min-h-[44px] text-sm lg:text-base">{{ item.places?.at(indexCardPerSlide + (indexSlideCount * 6))?.title }}</p>
                          <p class="text-gray-700 font-semibold text-base">Rp. {{ item.places?.at(indexCardPerSlide + (indexSlideCount * 6))?.price }}</p>
                          <p class="text-xs text-gray-400 mt-1">{{ item.places?.at(indexCardPerSlide + (indexSlideCount * 6))?.address }}</p>
                        </div>
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>          
        </Swiper>
      </div>
    </div>

    <!-- Product Slide Card - Mobile -->
    <div class="block lg:hidden">
      <div v-for="(item, index) in productData" :key="index">
        <div class="mt-8 mb-2">
          <h3 class="font-semibold text-xl text-gray-600">{{ item.title }}</h3>
        </div>

        <Swiper
          :modules="[SwiperNavigation]"
          :centeredSlides="true"
          :navigation="true"
          :spaceBetween="20"
        >
          <SwiperSlide v-for="(slideCount, indexSlideCount) in [1, 2]">
            <div class="w-full">
              <div class="grid grid-cols-3 gap-4 py-6">
                <div v-for="(cardPerSlide, indexCardPerSlide) in [1, 2, 3]">
                  <div v-if="indexSlideCount == 0 && indexCardPerSlide == 0" :key="indexCardPerSlide" class="relative">
                    <div class="absolute w-[145%] h-[110%] top-1/2 -translate-y-1/2 aspect-square rounded-lg bg-primary shadow -z-10">
                      <img :src="item.places[0]?.img" :alt="item.places[0]?.title" width="100%" class="rounded-lg">
                    </div>
                  </div>
                  <div v-else>
                    <div v-if="item.places?.at(indexCardPerSlide + (indexSlideCount * 6))">
                      <NuxtLink to="#">
                        <div class="block w-full aspect-[3/3.4] bg-white rounded-lg shadow p-4 mt-3">
                          <div class="w-full aspect-[4/3] rounded-md overflow-hidden">
                            <img :src="item.places?.at(indexCardPerSlide + (indexSlideCount * 6))?.img" alt="">
                          </div>
                          <p class="text-gray-500 mt-5 min-h-[38px] lg:min-h-[44px] text-sm lg:text-base">{{ item.places?.at(indexCardPerSlide + (indexSlideCount * 6))?.title }}</p>
                          <p class="text-gray-700 font-semibold text-base">Rp. {{ item.places?.at(indexCardPerSlide + (indexSlideCount * 6))?.price }}</p>
                          <p class="text-xs text-gray-400 mt-1">{{ item.places?.at(indexCardPerSlide + (indexSlideCount * 6))?.address }}</p>
                        </div>
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>          
        </Swiper>
      </div>
    </div>

    <div class="mt-12">
      <h2 class='text-xl font-semibold mb-4'>Our Recomendations List</h2>

      <div class="grid justify-items-center grid-cols-2 lg:grid-cols-6 gap-4 mt-4">
        <div v-for="(item, index) in recomendationProductList">
          <NuxtLink to="#">
            <div class="block w-full aspect-[3/3.4] bg-white rounded-lg shadow p-4 mt-3">
              <div class="w-full aspect-[4/3] rounded-md overflow-hidden">
                <img :src="item?.img" :alt="item?.title">
              </div>
              <p class="text-gray-500 mt-5 min-h-[38px] lg:min-h-[44px] text-sm lg:text-base">{{ item?.title }}</p>
              <p class="text-gray-700 font-semibold text-base">Rp. {{ item?.price }}</p>
              <p class="text-xs text-gray-400 mt-1">{{ item?.address }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="mt-12">

      <h2 class="mb-12 text-xl font-bold">Testimonials</h2>

      <div class="grid gap-x-6 md:grid-cols-3 lg:gap-x-12">
        <div class="mb-12 md:mb-0 flex flex-col items-center text-center">
          <div class="mb-6 flex justify-center">
            <img src="~/assets/img/avatar.png"
              class="w-32 rounded-full shadow-lg dark:shadow-black/20" />
          </div>
          <h5 class="mb-2 text-lg font-bold">Maria Smantha</h5>
          <h6 class="mb-4 font-medium text-primary dark:text-primary-400">
            Web Developer
          </h6>
          <p class="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos
            id officiis hic tenetur quae quaerat ad velit ab hic.
          </p>
        </div>
        <div class="mb-12 md:mb-0 flex flex-col items-center text-center">
          <div class="mb-6 flex justify-center">
            <img src="~/assets/img/avatar.png"
              class="w-32 rounded-full shadow-lg dark:shadow-black/20" />
          </div>
          <h5 class="mb-2 text-lg font-bold">Lisa Cudrow</h5>
          <h6 class="mb-4 font-medium text-primary dark:text-primary-400">
            Graphic Designer
          </h6>
          <p class="mb-4">
            Ut enim ad minima veniam, quis nostrum exercitationem ullam
            corporis suscipit laboriosam, nisi ut aliquid commodi.
          </p>
        </div>
        <div class="mb-12 flex flex-col items-center text-center">
          <div class="mb-6 flex justify-center">
            <img src="~/assets/img/avatar.png"
              class="w-32 rounded-full shadow-lg dark:shadow-black/20" />
          </div>
          <h5 class="mb-2 text-lg font-bold">John Smith</h5>
          <h6 class="mb-4 font-medium text-primary dark:text-primary-400">
            Marketing Specialist
          </h6>
          <p class="mb-4">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

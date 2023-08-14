<script setup>
import { faBars, faCube, faCubes } from '@fortawesome/free-solid-svg-icons';

/**
 * * Variables
 */
const sidebarActive = ref(true);
const menu = [
  {
    head: "Head of Menu 1",
    // collapse: true,
    submenu: [
      {
        icon: faCubes,
        label: "Menu 0",
        path: "",
      },
      {
        icon: faCube,
        label: "Menu 1",
        submenu: [
          {
            icon: faCube,
            label: "Menu 1.1",
            path: "/1.1",
          },
          {
            icon: faCube,
            label: "Menu 1.2",
            path: "/1.2",
          },
        ]
      },
      {
        icon: faCube,
        label: "Menu 2",
        path: "/2",
      },
      {
        icon: faCube,
        label: "Menu 3",
        path: "/3",
      },
      {
        icon: faCube,
        label: "Menu 4",
        path: "/4",
      },
    ],  
  },
    {
      head: "Head of Menu 2",
      submenu: [
        {
          icon: faCubes,
          label: "Menu 5",
          submenu: [
            {
              icon: faCube,
              label: "Menu 5.1",
              path: "/5.1",
            },
            {
              icon: faCube,
              label: "Menu 5.2",
              path: "/5.2",
            },
          ]
        },
      ],
    },
];
</script>

<template>
  <BaseLayoutSidebar :menu="menu" basePath="/admin" :isClose="sidebarActive ? false : true">
    <BaseLayoutNavbar>
      <div class='flex gap-4 items-center'>
        <button class="relative overflow-hidden w-[45px] aspect-square flex items-center justify-center text-primary text-xl hover:shadow-lg hover:bg-opacity-10 cursor-pointer rounded-lg"
          @click="() => sidebarActive = !sidebarActive"
        >
          <FontAwesomeIcon :icon="faBars" class="w-[45px]" />
        </button>
      </div>
    </BaseLayoutNavbar>
  
    <div class='w-full bg-white py-48 rounded-xl shadow mt-8'>
      <slot />
    </div>
  </BaseLayoutSidebar>
</template>

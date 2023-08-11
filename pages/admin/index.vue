<script setup>
import { faCube, faCubes } from '@fortawesome/free-solid-svg-icons';

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

  </BaseLayoutSidebar>
</template>
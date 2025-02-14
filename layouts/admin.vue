<script setup>
import { faBars, faCube, faCubes } from '@fortawesome/free-solid-svg-icons';

/**
 * * Variables
 */
const route = useRoute();
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
        label: "Menu 1 (Input)",
        submenu: [
          {
            icon: faCube,
            label: "Menu 1.1 (Input Component)",
            path: "/input",
          },
          {
            icon: faCube,
            label: "Menu 1.2 (Calendar)",
            path: "/input/calendar",
          },
        ]
      },
      {
        icon: faCube,
        label: "Menu 2 (Card)",
        path: "/card",
      },
      {
        icon: faCube,
        label: "Menu 3 (Modal)",
        path: "/modal",
      },
      {
        icon: faCube,
        label: "Menu 4 (Button)",
        path: "/button",
      },
      {
        icon: faCube,
        label: "Menu 5 (Badge)",
        path: "/badge",
      },
      {
        icon: faCube,
        label: "Menu 6 (Other Components)",
        submenu: [
          {
            icon: faCube,
            label: "Menu 3 (Toast/Notif)",
            path: "/toast",
          },
          {
            icon: faCube,
            label: "Menu 6.1 (Kanban Card)",
            path: "/kanban",
          },
          {
            icon: faCube,
            label: "Menu 6.2 (Menu Tab)",
            path: "/menutab",
          },
        ]
      },
    ],  
  },
    {
      head: "Head of Menu 2",
      submenu: [
        {
          icon: faCubes,
          label: "Menu 7 (Layouts)",
          submenu: [
            {
              icon: faCube,
              label: "Menu 7.1 (Front Layout 1)",
              path: "/front/layout-1",
              resetPath: true
            },
            {
              icon: faCube,
              label: "Menu 7.2 (Login Layout 1)",
              path: "/front/login-1",
              resetPath: true
            },
            {
              icon: faCube,
              label: "Menu 7.2 (Login Layout 2)",
              path: "/front/login-2",
              resetPath: true
            },
          ]
        },
        {
          icon: faCubes,
          label: "Menu 8 (Tables)",
          submenu: [
            {
              icon: faCube,
              label: "Menu 8.1 (Table Default)",
              path: "/tables/default",
            },
            {
              icon: faCube,
              label: "Menu 8.2 (Table with API)",
              path: "/tables/with-api",
            },
          ]
        },
      ],
    },
];
const breadcrumb = ref([]);

/**
 * * Methods
 */
const capitalizeString = (s) => {
  if (typeof s !== 'string') {
    return '';
  }

  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * * Hooks & Watchers
 */
watchEffect(() => {
  let paths = route.path?.split('/');
  let breadcrumbItems = [];

  paths.map((path, key) => {

    let link = '';
    paths.filter((_, linkKey) => linkKey <= key)
      .map((pathLink) => {
      if (pathLink) {
        link += "/" + pathLink
      }
    });

    if (path) {
      breadcrumbItems.push({
        link: link,
        label: capitalizeString(path.replace("-", " "))
      })
    }
  });

  breadcrumb.value = breadcrumbItems;
});
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

        <div>
          <BaseNavigatorBreadcrumb
            :items="breadcrumb"
          />
        </div>
      </div>
    </BaseLayoutNavbar>
  
    <div class='w-full bg-white py-5 rounded-xl shadow mt-8'>
      <slot />
    </div>
  </BaseLayoutSidebar>
</template>

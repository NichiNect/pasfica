<script setup>
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

/**
 * * Variables
 */
const props = defineProps(['menu', 'basePath', 'isClose']);
const router = useRouter();
const showMenu = ref([]);
const showSubMenu = ref([]);

/**
 * * Methods
 */
const sidebarSubMenuHandler = (menuItem, menuItemKey, menuGroupKey) => {
  if (!menuItem.submenu || !menuItem.submenu[0] || menuItem.path) {

    if (menuItem?.resetPath) {

      router.push({ path: menuItem.path });
    } else {

      router.push({ path: `${props.basePath}${menuItem.path}` });
    }
  } else {

    if (!showSubMenu.value[0] || !showSubMenu.value.includes(`${menuGroupKey}|${menuItemKey}`)) {

      showSubMenu.value = [...showSubMenu.value, `${menuGroupKey}|${menuItemKey}`];
    } else {

      showSubMenu.value = showSubMenu.value.filter((val) => val != `${menuGroupKey}|${menuItemKey}`);
    }
  }
}

</script>

<template>
  <div class="container mx-auto grid min-h-screen grid-cols-6 lg:grid-cols-9 gap-8">
    <div :class="isClose ? 'absolute scale-x-0 -translate-x-full py-4' : 'absolute z-10 top-24 scale-100 col-span-8 py-4 lg:relative lg:top-0 lg:col-span-2'">
      <div class="flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-2xl">
        <div class="m-4 lg:px-6 py-4 flex justify-center lg:justify-start gap-8 bg-primary rounded-xl">
          <!-- <img src="/logo.png" alt="logo" class='w-20' /> -->
          <h1 class="text-xl font-bold text-white hidden lg:block">MY PROJECT</h1>
          <h1 class="text-xl font-bold text-white block lg:hidden">My Project</h1>
        </div>

        <div class="max-h-[calc(100vh-130px)] p-2 mb-4 overflow-y-auto scroll_control">
          <div v-for="(menuGroup, menuGroupKey) in props.menu">
            <div>
              <div class="px-2 lg:px-4 pt-4 pb-2 flex justify-between cursor-default" @click="(e) => {
                if (menuGroup.collapse) {
                  if (!showMenu.value[0] || !showMenu.value.includes(menuGroupKey)) {
                    showMenu.value = [...showMenu.value, menuGroupKey];
                  } else {
                    showMenu.value = showMenu.value.filter((val) => val != menuGroupKey);
                  }
                }
              }">
                <h6 class="text-sm lg:text-lg text-gray-500 dark:text-gray-300 hidden lg:block">{{ menuGroup.head }}</h6>
                <div class='w-full h-1 bg-gray-300 rounded-full block lg:hidden'></div>
                <div v-if="menuGroup.collapse">
                  <FontAwesomeIcon :icon="faChevronDown" :class="['text-lg text-gray-500 dark:text-gray-300', showMenu[0] && showMenu.includes(menuGroupKey) ? 'rotate-180' : '']" />
                </div>
              </div>

              <div :class="[!menuGroup.collapse || showMenu.includes(menuGroupKey) ? '' : 'hidden']">
                <div v-for="(menuItem, menuItemKey) in menuGroup.submenu">
                  <a :class="[
                    'flex items-center duration-150 justify-between gap-4 py-4 px-4 my-2 cursor-pointer', 
                    menuItem?.submenu?.filter((val) => val.path == router.currentRoute.value.path)[0] || (router.currentRoute.value.path == `${basePath}${menuItem.path}`)
                      ? 'text-white bg-primary mx-2 lg:mx-4 lg:px-4 rounded-xl'
                      : 'lg:px-8 text-gray-400 hover:text-primary'
                    ]"
                    @click="sidebarSubMenuHandler(menuItem, menuItemKey, menuGroupKey)"
                  >
                    <div class="flex items-center lg:justify-start w-full gap-4">
                      <FontAwesomeIcon :icon="menuItem.icon" class="text-lg"/>
                      <h6>
                        {{ menuItem.label }}
                      </h6>
                    </div>

                    <!-- Collapse Icons -->
                    <div v-if="menuItem.submenu && menuItem.submenu[0]">
                      <FontAwesomeIcon :icon="faChevronDown" />
                    </div>

                  </a>

                  <!-- SubMenu Items -->
                  <div v-if="menuItem.submenu && menuItem.submenu[0]">
                    <div :class="[
                      'shadow-inner mx-2 lg:mx-4 lg:py-2 rounded-lg bg-gray-50 animation_y_intro', 
                      showSubMenu[0] && showSubMenu.includes(`${menuGroupKey}|${menuItemKey}`)
                        ? ''
                        : 'hidden'
                      ]"
                    >
                      <div v-for="(subMenuItem, subMenuItemKey) in menuItem.submenu">
                        <NuxtLink :to="subMenuItem?.resetPath ? subMenuItem.path : `${basePath}${subMenuItem.path}`" :key="subMenuItemKey">
                          <div :class="[
                            'flex items-center gap-5 mx-1 lg:mx-4 justify-center lg:justify-start px-4 py-4 my-1 lg:px-4 lg:my-2',
                            (`${basePath}${subMenuItem.path}` && router.currentRoute.value.path == `${basePath}${subMenuItem.path}`)
                              ? 'bg-primary text-white rounded-xl'
                              : 'text-gray-400 hover:text-primary'
                            ]"
                          >
                            <FontAwesomeIcon :icon="subMenuItem.icon" class="text-lg" />
                            <h6 class="font-semibold block">
                              {{ subMenuItem.label }}
                            </h6>
                          </div>
                        </NuxtLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div :class="[isClose ? 'col-span-9' : 'col-span-6 xl:col-span-7', 'py-4 max-h-screen overflow-auto scroll_control']">
      <slot />
    </div>
  </div>
</template>

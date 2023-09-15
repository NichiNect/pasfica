<script setup>
import draggable from 'vuedraggable';

/**
 * * Layouts
 */
definePageMeta({
  layout: "admin",
});

/**
 * * Variables
 */
const emit = defineEmits(["onRemoved", "onAdded", "onMoved"]);
const formData = ref([]);
const data = ref([
  {
    title: 'List',
    tasks: [
      {
        id: 1,
        title: "Add discount code to checkout page",
        date: "Sep 14",
        type: "Feature Request"
      },
      {
        id: 2,
        title: "Provide documentation on integrations",
        date: "Sep 12"
      },
      {
        id: 3,
        title: "Design shopping cart dropdown",
        date: "Sep 9",
        type: "Design"
      },
      {
        id: 4,
        title: "Add discount code to checkout page",
        date: "Sep 14",
        type: "Feature Request"
      },
      {
        id: 5,
        title: "Test checkout flow",
        date: "Sep 15",
        type: "QA"
      }
    ]
  },
  {
    title: 'Inprogress',
    tasks: [
      {
        id: 6,
        title: "Design shopping cart dropdown",
        date: "Sep 9",
        type: "Design"
      },
      {
        id: 7,
        title: "Add discount code to checkout page",
        date: "Sep 14",
        type: "Feature Request"
      },
      {
        id: 8,
        title: "Provide documentation on integrations",
        date: "Sep 12",
        type: "Backend"
      }
    ]
  },
  {
    title: "Review",
    tasks: [
      {
        id: 9,
        title: "Provide documentation on integrations",
        date: "Sep 12"
      },
      {
        id: 10,
        title: "Design shopping cart dropdown",
        date: "Sep 9",
        type: "Design"
      },
      {
        id: 11,
        title: "Add discount code to checkout page",
        date: "Sep 14",
        type: "Feature Request"
      },
      {
        id: 12,
        title: "Design shopping cart dropdown",
        date: "Sep 9",
        type: "Design"
      },
      {
        id: 13,
        title: "Add discount code to checkout page",
        date: "Sep 14",
        type: "Feature Request"
      }
    ]
  },
  {
    title: "Done",
    tasks: [
      {
        id: 14,
        title: "Add discount code to checkout page",
        date: "Sep 14",
        type: "Feature Request"
      },
      {
        id: 15,
        title: "Design shopping cart dropdown",
        date: "Sep 9",
        type: "Design"
      },
      {
        id: 16,
        title: "Add discount code to checkout page",
        date: "Sep 14",
        type: "Feature Request"
      }
    ]
  }
]);

/**
 * * Methods
 */
const onChangeHandler = (e) => {
  if (e?.removed) {
    console.log('removed', e?.removed);
    emit('onRemoved', e?.removed);
  } else if (e?.added) {
    console.log('added', e?.added);
    emit('onAdded', e?.added);
  } else if (e?.moved) {
    console.log('moved', e?.moved);
    emit('onMoved', e?.moved);
  }
}

// const onMoveHandler = (e, originalEvent) => {
//   console.log('onmove', e);
//   console.log('onmove origin', originalEvent);
// }

/**
 * * Hooks & Watchers
 */
watch(data.value, () => {
  console.log('changed', data.value);
});
</script>

<template>
  <div>
    <p class="text-center">Kanban Component Example</p>

    <div class="min-h-screen flex gap-5 overflow-x-scroll scroll_control py-12 mt-3 px-6">
      <div
        v-for="item in data"
        :key="item.title"
        class="bg-gray-200 rounded-lg p-3 w-[300px] min-w-[300px]"
      >
        <p class="text-gray-700 font-semibold tracking-wide text-sm">{{ item.title }}</p>
        <!-- :list="item.tasks" -->
        <draggable
          v-model="item.tasks"
          :animation="200"
          ghost-class="ghost-card"
          group="tasks"
          itemKey="title"
          @start="drag=true"
          @end="drag=false"
          @change="onChangeHandler"
        >
          <template #header>
            <div>Tes data</div>
          </template>
          <template #item="{ element, index }">
            <div class="p-4 my-3 bg-gray-50 rounded-lg">
              {{ element.title }}
            </div>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ghost-card {
  @apply border opacity-50 border-blue-500 bg-gray-200;
}
</style>
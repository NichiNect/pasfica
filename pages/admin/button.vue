<script setup>
import { faShareFromSquare } from '@fortawesome/free-solid-svg-icons';

/**
 * * Layouts
 */
 definePageMeta({
  layout: "admin",
});

/**
 * * Methods
 */
const clickHandler = () => {
  console.log('Button has clicked!!');
}
</script>

<template>
  <div class="container mx-auto items-center my-5">
    <div class="flex flex-col gap-10">
      <div class="flex items-start flex-wrap gap-5">
        <BaseButton
          label="Button 1"
          bg="primary"
          size="sm"
          @onClick="clickHandler"
        />
        <BaseButton
          label="Button 2"
          bg="primary"
          size="sm"
          variant="outline"
          @onClick="clickHandler"
        />
        <BaseButton
          bg="primary"
          size="sm"
          @onClick="clickHandler"
        >
          <FontAwesomeIcon :icon="faShareFromSquare" class="mr-1" />
          Button 3
        </BaseButton>
        <BaseButton
          label="Button 4"
          bg="primary"
          size="sm"
          rounded="full"
          @onClick="clickHandler"
        />
        <BaseButton
          label="Button 4"
          bg="primary"
          size="sm"
          rounded="full"
          variant="outline"
          @onClick="clickHandler"
        />
        <BaseButton
          bg="primary"
          size="sm"
          rounded="full"
          @onClick="clickHandler"
        >
          <FontAwesomeIcon :icon="faShareFromSquare" class="mr-1" />
          Button 3
        </BaseButton>
        <BaseButton
          bg="primary"
          size="sm"
          @onClick="clickHandler"
        >
          <FontAwesomeIcon :icon="faShareFromSquare" />
        </BaseButton>
      </div>
      <div class='flex items-start flex-wrap gap-5'>
        <BaseButton
          label="Button 1"
          bg="primary"
          size="md"
        />
        <BaseButton
          label="Button 2"
          bg="primary"
          size="md"
          variant="outline"
        />
        <BaseButton
          bg="primary"
          size="md"
        >
          <FontAwesomeIcon :icon="faShareFromSquare" class="mr-1" />
          Button 3
        </BaseButton>
        <BaseButton
          label="Button 4"
          bg="primary"
          size="md"
          rounded="full"
        />
        <BaseButton
          label="Button 4"
          bg="primary"
          size="md"
          rounded="full"
          variant="outline"
        />
        <BaseButton
          bg="primary"
          size="md"
          rounded="full"
        >
          <FontAwesomeIcon :icon="faShareFromSquare" class="mr-1" />
          Button 3
        </BaseButton>
        <BaseButton
          bg="primary"
          size="md"
        >
          <FontAwesomeIcon :icon="faShareFromSquare" />
        </BaseButton>
      </div>
      <div class='flex items-start flex-wrap gap-5'>
        <BaseButton
          label="Button 1"
          bg="primary"
          size="lg"
        />
        <BaseButton
          label="Button 2"
          bg="primary"
          size="lg"
          variant="outline"
        />
        <BaseButton
          bg="primary"
          size="lg"
        >
          <FontAwesomeIcon :icon="faShareFromSquare" class="mr-1" />
          Button 3
        </BaseButton>
        <BaseButton
          label="Button 4"
          bg="primary"
          size="lg"
          rounded="full"
        />
        <BaseButton
          label="Button 4"
          bg="primary"
          size="lg"
          rounded="full"
          variant="outline"
        />
        <BaseButton
          bg="primary"
          size="lg"
          rounded="full"
        >
          <FontAwesomeIcon :icon="faShareFromSquare" class="mr-1" />
          Button 3
        </BaseButton>
        <BaseButton
          bg="primary"
          size="lg"
        >
          <FontAwesomeIcon :icon="faShareFromSquare" />
        </BaseButton>
      </div>
    </div>
  </div>
</template>

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
          color="primary"
          size="sm"
          @onClick="clickHandler"
        />
        <BaseButton
          label="Button 1"
          color="primary"
          size="sm"
          :loading="true"
          @onClick="clickHandler"
        />
        <BaseButton
          label="Button 2"
          color="primary"
          size="sm"
          variant="outline"
          @onClick="clickHandler"
        />
        <BaseButton
          color="primary"
          size="sm"
          @onClick="clickHandler"
        >
          <FontAwesomeIcon :icon="faShareFromSquare" class="mr-1" />
          Button 3
        </BaseButton>
        <BaseButton
          label="Button 4"
          color="primary"
          size="sm"
          rounded="full"
          @onClick="clickHandler"
        />
        <BaseButton
          label="Button 4"
          color="primary"
          size="sm"
          rounded="full"
          variant="outline"
          @onClick="clickHandler"
        />
        <BaseButton
          color="primary"
          size="sm"
          rounded="full"
          @onClick="clickHandler"
        >
          <FontAwesomeIcon :icon="faShareFromSquare" class="mr-1" />
          Button 3
        </BaseButton>
        <BaseButton
          color="primary"
          size="sm"
          rounded="full"
          :loading="true"
          @onClick="clickHandler"
        >
          <FontAwesomeIcon :icon="faShareFromSquare" class="mr-1" />
          Button 3
        </BaseButton>
        <BaseButton
          color="primary"
          size="sm"
          variant="squareIcon"
          @onClick="clickHandler"
        >
          <FontAwesomeIcon :icon="faShareFromSquare" />
        </BaseButton>
        <BaseButton
          color="primary"
          size="sm"
          variant="squareIcon"
          :loading="true"
          @onClick="clickHandler"
        >
          <FontAwesomeIcon :icon="faShareFromSquare" />
        </BaseButton>
      </div>
      <div class='flex items-start flex-wrap gap-5'>
        <BaseButton
          label="Button 1"
          color="primary"
          size="md"
        />
        <BaseButton
          label="Button 2"
          color="primary"
          size="md"
          variant="outline"
        />
        <BaseButton
          color="primary"
          size="md"
        >
          <FontAwesomeIcon :icon="faShareFromSquare" class="mr-1" />
          Button 3
        </BaseButton>
        <BaseButton
          label="Button 4"
          color="primary"
          size="md"
          rounded="full"
        />
        <BaseButton
          label="Button 4"
          color="primary"
          size="md"
          rounded="full"
          variant="outline"
        />
        <BaseButton
          color="primary"
          size="md"
          rounded="full"
        >
          <FontAwesomeIcon :icon="faShareFromSquare" class="mr-1" />
          Button 3
        </BaseButton>
        <BaseButton
          color="primary"
          size="md"
          variant="squareIcon"
        >
          <FontAwesomeIcon :icon="faShareFromSquare" />
        </BaseButton>
      </div>
      <div class='flex items-start flex-wrap gap-5'>
        <BaseButton
          label="Button 1"
          color="primary"
          size="lg"
        />
        <BaseButton
          label="Button 2"
          color="primary"
          size="lg"
          variant="outline"
        />
        <BaseButton
          color="primary"
          size="lg"
        >
          <FontAwesomeIcon :icon="faShareFromSquare" class="mr-1" />
          Button 3
        </BaseButton>
        <BaseButton
          label="Button 4"
          color="primary"
          size="lg"
          rounded="full"
        />
        <BaseButton
          label="Button 4"
          color="primary"
          size="lg"
          rounded="full"
          variant="outline"
        />
        <BaseButton
          color="primary"
          size="lg"
          rounded="full"
        >
          <FontAwesomeIcon :icon="faShareFromSquare" class="mr-1" />
          Button 3
        </BaseButton>
        <BaseButton
          color="primary"
          size="lg"
          variant="squareIcon"
        >
          <FontAwesomeIcon :icon="faShareFromSquare" />
        </BaseButton>
      </div>
    </div>
  </div>
</template>

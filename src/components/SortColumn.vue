<template>
  <th :style="`width: ${width}px`" @click="sort">
    <span>
      {{ label }}
      <Icon :class="`sort-icon sorted-${sortState}`" name="arrow-down" />
    </span>
  </th>
</template>

<script setup>
import {ref} from 'vue';
import Icon from '@/ui/Icon.vue';

const props = defineProps({
  width: String,
  label: String,
})

const sortState = ref('none')

function sort() {
  if (sortState.value == 'none') sortState.value = 'asc'
  else if (sortState.value == 'asc') sortState.value = 'desc'
  else if (sortState.value == 'desc') sortState.value = 'none'
}

</script>

<style lang="scss">
th {
    text-align: left;
    padding: 0 10px;
    cursor: pointer;

    .sort-icon {
      margin-left: 5px;
      vertical-align: middle;
      visibility: visible;
    }

    .sorted-none {
      visibility: hidden;
      width: 0;
      margin-left: 0;
    }

    .sorted-asc {
      transform: rotate(180deg);
    }
  }
</style>
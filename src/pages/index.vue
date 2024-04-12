<script setup lang="ts" generic="T extends any, O extends any">
import { RouterLink } from 'vue-router'

defineOptions({
  name: 'IndexPage',
})

const list = [
  {
    name: 'rxdb',
    link: '/rxdb',
  },
]
</script>

<template>
  <div>
    <ul>
      <li v-for="(item, index) in list" :key="item.name">
        {{ index + 1 }}.
        <RouterLink :to="item.link" class="text-blue-600">
          {{ item.name }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

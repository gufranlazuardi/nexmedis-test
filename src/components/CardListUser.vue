<script lang="ts" setup>
import { type Users } from "@/apis";

interface Props {
  user: Users;
}

defineProps<Props>();
</script>

<template>
  <li class="flex items-center space-x-4 p-4 border rounded">
    <img
      :src="user.avatar"
      alt="`${user.first_name} ${user.last_name}'s Avatar`"
      class="w-16 h-16 rounded-full"
    />
    <div>
      <p class="font-semibold">
        {{ user.first_name }} {{ user.last_name }}
      </p>
      <p class="text-sm text-gray-500">{{ user.email }}</p>
    </div>
  </li>
</template>

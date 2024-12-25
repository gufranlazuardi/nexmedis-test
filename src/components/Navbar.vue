<script lang="ts" setup>
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
</script>

<template>
  <div class="flex justify-between mt-2 ml-2 px-[4rem] pt-[1rem]">
    <router-link to="/">
      <img
        src="../../public/nexmedis.png"
        alt="nexmedis"
        class="w-[8rem] h-fit"
      />
    </router-link>
    <router-link to="/profile">
      <Button class="bg-green-500" v-if="authStore.token"
        >Profile</Button
      >
    </router-link>
  </div>
</template>

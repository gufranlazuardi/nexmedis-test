<script lang="ts" setup>
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
</script>

<template>
  <div
    class="flex justify-between items-center max-w-screen-xl mx-auto mt-2 px-[1rem] md:px-[3rem] lg:px-[4rem] xl:px-[4rem] pt-[1rem]"
  >
    <router-link to="/">
      <img
        src="/nexmedis.png"
        alt="nexmedis"
        class="w-16 sm:w-32 h-auto"
      />
    </router-link>
    <router-link to="/profile">
      <Button class="bg-green-500" v-if="authStore.token"
        >Profile</Button
      >
    </router-link>
  </div>
</template>

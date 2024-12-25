<script lang="ts" setup>
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <div>
    <Navbar />
    <div>
      <slot />
    </div>
  </div>
</template>

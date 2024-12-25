<script lang="ts" setup>
import { RouterView } from "vue-router";
import Toaster from "@/components/ui/toast/Toaster.vue";
import Layout from "./Layout.vue";
</script>

<template>
  <Layout>
    <RouterView />
    <Toaster />
  </Layout>
</template>

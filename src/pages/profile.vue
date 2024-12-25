<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-vue-next";
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from "@/components/ui/pagination";
import { getListUserApi, Users } from "@/apis";
import CardListUser from "@/components/CardListUser.vue";

const router = useRouter();
const route = useRoute();

const users = ref<Users[]>([]);
const isLoading = ref(false);
const error = ref<string | null>(null);
const totalUsers = ref(100);
const perPage = 6;
const currentPage = ref(Number(route.query.page) || 1);

const totalPages = computed(() =>
  Math.ceil(totalUsers.value / perPage)
);

const fetchUsers = async (page: number) => {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await getListUserApi(page);
    users.value = response.data;
    totalUsers.value = response.total;
  } catch (err: any) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
};

const changePage = (page: number) => {
  currentPage.value = page;
  router.push({
    query: { ...route.query, page: page.toString() },
  });
};

watch(currentPage, (newPage) => {
  fetchUsers(newPage);
});

fetchUsers(currentPage.value);

const paginationRange = computed(() => {
  const delta = 2;
  const range = [];
  const rangeWithDots: any[] = [];
  let l: number;

  for (let i = 1; i <= totalPages.value; i++) {
    if (
      i === 1 ||
      i === totalPages.value ||
      (i >= currentPage.value - delta &&
        i <= currentPage.value + delta)
    ) {
      range.push(i);
    }
  }

  range.forEach((i) => {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  });

  return rangeWithDots;
});
</script>

<template>
  <div class="flex flex-col max-w-screen-xl mx-auto mt-[2rem]">
    <h1 class="text-xl font-bold mb-4">User List</h1>

    <div v-if="error" class="text-red-500">{{ error }}</div>
    <template v-if="isLoading">
      <div class="flex items-center justify-center">
        <LoaderCircle />
      </div>
    </template>
    <ul
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6"
    >
      <template v-if="!isLoading">
        <CardListUser
          v-for="user in users"
          :key="user.id"
          :user="user"
        />
      </template>
    </ul>

    <Pagination>
      <PaginationList
        class="flex items-center justify-center space-x-4"
      >
        <PaginationFirst
          @click="changePage(1)"
          :disabled="currentPage === 1"
        />
        <PaginationPrev
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
        />
        <template v-for="item in paginationRange" :key="item">
          <PaginationListItem
            v-if="typeof item === 'number'"
            :isActive="item === currentPage"
            @click="changePage(item)"
            class="cursor-pointer"
          >
            <Button
              class="w-10 h-10 p-0"
              :variant="item === currentPage ? 'default' : 'outline'"
            >
              {{ item }}
            </Button>
          </PaginationListItem>
          <PaginationEllipsis v-else />
        </template>
        <PaginationNext
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
        />
        <PaginationLast
          @click="changePage(totalPages)"
          :disabled="currentPage === totalPages"
        />
      </PaginationList>
    </Pagination>
  </div>
</template>

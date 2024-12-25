<script lang="ts" setup>
import { useToast } from "@/components/ui/toast";
import { useAuthStore } from "@/stores/auth";
import { onMounted } from "vue";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const authStore = useAuthStore();
const { toast } = useToast();

const handleLogout = () => {
  authStore.clearToken();
  localStorage.removeItem("token");

  toast({
    title: "Logout Successful",
    description: "You have been successfully logged out.",
    class: "bg-green-500 text-white",
  });
};

onMounted(() => {
  const token = localStorage.getItem("token");
  if (token) {
    authStore.setToken(token);
  }
});
</script>

<template>
  <div
    class="flex flex-col w-full max-w-screen-xl mx-auto items-center mt-[2rem]"
  >
    <h1>Welcome to Nexmedis</h1>
    <p v-if="!authStore.token">
      Want to see all feature,
      <router-link to="/login"
        ><span class="text-blue-500 underline cursor-pointer"
          >Login</span
        ></router-link
      >
      here
    </p>
    <p v-if="authStore.token">
      Because you have token now, you can
      <AlertDialog>
        <AlertDialogTrigger>
          <span class="text-red-500 underline cursor-pointer"
            >Logout</span
          >
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle
              >Are you sure want to Logout?</AlertDialogTitle
            >
            <AlertDialogDescription>
              After you logout, you must login again! please keep mind
              your email and password
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              @click="handleLogout()"
              class="bg-red-500"
              >Logout</AlertDialogAction
            >
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </p>
  </div>
</template>

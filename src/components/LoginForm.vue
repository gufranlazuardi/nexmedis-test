<script setup lang="ts">
import { ref } from "vue";
import { ChevronLeft } from "lucide-vue-next";
import { LoaderCircle } from "lucide-vue-next";
import { Info } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { loginApi } from "@/apis";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast/use-toast";

const { toast } = useToast();
const isLoading = ref(false);

// Define the form schema
const formSchema = toTypedSchema(
  z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
  })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const router = useRouter();

const goBack = () => {
  router.go(-1);
};

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;
  try {
    const response = await loginApi({
      email: values.email,
      password: values.password,
    });

    localStorage.setItem("token", response.token!);

    toast({
      title: "Login Successful",
      description: "You have been successfully logged in.",
      class: "bg-green-500 text-white",
    });

    router.push("/");
  } catch (error: any) {
    toast({
      title: "Login failed",
      description: "Your email or password is wrong",
      variant: "destructive",
    });
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div
    class="flex flex-col items-center max-w-screen-xl mx-auto w-full"
  >
    <form
      @submit.prevent="onSubmit"
      class="w-full max-w-md space-y-4 mt-[5rem]"
    >
      <div class="flex justify-between items-center mb-[3rem]">
        <button @click="goBack">
          <ChevronLeft />
        </button>
        <h1 class="text-2xl font-bold text-center">Login</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger><Info /></TooltipTrigger>
            <TooltipContent class="flex flex-col space-y-2">
              <p>as in official docs, you should login with :</p>
              <Separator />
              <div class="relative grid grid-cols-2">
                <div class="flex flex-col">
                  <p class="font-bold">Email</p>
                  <p class="font-bold">Password</p>
                </div>
                <div class="absolute flex-col left-20">
                  <p>:</p>
                  <p>:</p>
                </div>
                <div class="flex flex-col">
                  <p>eve.holt@reqres.in</p>
                  <p>cityslicka</p>
                </div>
              </div>
              <a href="https://reqres.in/">
                docs :
                <span class="underline text-blue-500 cursor-pointer">
                  https://reqres.in/</span
                >
              </a>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <FormField name="email" v-slot="{ field, errorMessage }">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input
              v-bind="field"
              type="email"
              placeholder="johndoe@example.com"
            />
          </FormControl>
          <FormDescription
            >Please enter your email address.</FormDescription
          >
          <FormMessage>{{ errorMessage }}</FormMessage>
        </FormItem>
      </FormField>

      <FormField name="password" v-slot="{ field, errorMessage }">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input
              v-bind="field"
              type="password"
              placeholder="johndoe123"
            />
          </FormControl>
          <FormDescription
            >Please enter your password.</FormDescription
          >
          <FormMessage>{{ errorMessage }}</FormMessage>
        </FormItem>

        <FormDescription
          >If you haven't yet account, please
          <router-link to="/register"
            ><span class="text-blue-500 underline cursor-pointer"
              >register</span
            ></router-link
          ></FormDescription
        >
      </FormField>

      <Button type="submit" class="w-full">
        <template v-if="isLoading">
          <LoaderCircle />
        </template>
        <template v-else> Login </template>
      </Button>
    </form>
  </div>
</template>

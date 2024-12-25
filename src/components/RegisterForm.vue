<script setup lang="ts">
import { ref } from "vue";
import { Info } from "lucide-vue-next";
import { ChevronLeft } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { loginApi, registerApi } from "@/apis";
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
  try {
    const response = await registerApi({
      email: values.email,
      password: values.password,
    });

    localStorage.setItem("token", response.token!);

    toast({
      title: "Register Successful",
      description: "You have been successfully register.",
      class: "bg-green-500 text-white",
    });

    router.push("/login");
  } catch (error: any) {
    toast({
      title: "Register Failed",
      description: error.message || "An error occurred",
      variant: "destructive",
    });
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
        <h1 class="text-2xl font-bold text-center">Register</h1>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger><Info /></TooltipTrigger>
            <TooltipContent class="flex flex-col space-y-2">
              <p>as in official docs, you should login with :</p>
              <Separator />
              <div>
                <p>email : eve.holt@reqres.in</p>
                <p>password : pistol</p>
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
          >If you already have an account, please
          <router-link to="/login"
            ><span class="text-blue-500 underline cursor-pointer"
              >login</span
            ></router-link
          ></FormDescription
        >
      </FormField>

      <Button type="submit" class="w-full">Register</Button>
    </form>
  </div>
</template>

<template>
  <div
    class="bg-b-secondary w-screen h-screen flex justify-center items-start p-2"
    @keypress.enter="login"
  >
    <div
      class="w-full max-w-md flex flex-col justify-center items-center mt-14 sm:mt-24"
    >
      <div class="w-full bg-b-primary rounded shadow px-8 pb-8 pt-20 relative">
        <div
          class="absolute w-full -top-14 left-0 flex justify-center items-center"
        >
          <Logo />
        </div>
        <div class="grid grid-cols-1 gap-y-4">
          <div class="flex justify-between items-center">
            <h1 class="text-2xl font-semibold">Sign in</h1>
            <p>
              <router-link
                :to="{ name: 'register' }"
                class="text-blue-500 text-sm font-semibold hover:underline"
                >Need an account?</router-link
              >
            </p>
          </div>
          <ul v-if="errors.length">
            <li
              v-for="(error, index) in errors"
              :key="index"
              class="text-sm text-red-500"
            >
              {{ error }}
            </li>
          </ul>
          <Input
            @input="setEmail"
            :value="email"
            :errors="emailErrors"
            label="Email"
            type="text"
          />
          <Input
            @input="setPassword"
            :value="password"
            :errors="passwordErrors"
            label="Password"
            type="password"
          />
          <button
            @click="login"
            class="bg-primary hover:bg-green-600 text-white p-3 rounded font-semibold mt-4"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import { emailRegex } from "../common/constants";
import { useRouter } from "vue-router";
import API from "../services/api";
import Input from "../components/common/ui/Input.vue";
import Logo from "../components/common/ui/Logo.vue";

export default {
  components: {
    Input,
    Logo,
  },
  setup() {
    const router = useRouter();

    const state = reactive({
      email: "",
      emailErrors: [],
      password: "",
      passwordErrors: [],
      errors: [],
      showPassword: false,
    });

    const setEmail = (email) => {
      state.email = email;
    };

    const setPassword = (password) => {
      state.password = password;
    };

    const toggleShowPassword = () => {
      state.showPassword = !state.showPassword;
    };

    const validateUser = () => {
      state.emailErrors = [];
      state.passwordErrors = [];

      // validate email
      if (!emailRegex.test(state.email)) {
        state.emailErrors.push("Email must be valid.");
      }

      // validate password
      if (!state.password) {
        state.passwordErrors.push("Must provide a password.");
      }
    };

    const login = async () => {
      validateUser();
      if (!state.emailErrors.length && !state.passwordErrors.length) {
        try {
          const payload = {
            email: state.email,
            password: state.password,
          };
          console.log(payload);
          const response = await API.login(payload);

          const { message, data } = response.data;

          console.log(message, data);
          alert(message);
          router.push({ name: "home" });
        } catch (error) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            state.errors = error.response.data.errors;
          } else {
            console.log(error);
            state.errors = [
              "An unexpected error has occured. Please try again.",
            ];
          }
        }
      }
    };

    return {
      ...toRefs(state),
      setEmail,
      setPassword,
      toggleShowPassword,
      login,
      validateUser,
    };
  },
};
</script>

<style></style>

<style></style>

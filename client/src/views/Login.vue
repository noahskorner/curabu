<template>
  <div
    class="bg-green-100 w-screen h-screen flex justify-center items-start p-2"
    @keypress.enter="login"
  >
    <div
      class="w-full max-w-md flex flex-col justify-center items-center mt-14 sm:mt-24"
    >
      <div
        class="w-full bg-white rounded shadow px-4 pb-4 sm:px-8 sm:pb-8 pt-20 relative"
      >
        <div
          class="absolute w-full -top-14 left-0 flex justify-center items-center"
        >
          <div
            class="w-28 h-28 rounded-full bg-green-500 flex justify-center items-center text-white relative"
          >
            <span
              class="text-7xl font-bold relative flex justify-center items-center"
              >C
              <span class="absolute text-green-700 text-6xl font-bold">C</span>
            </span>
          </div>
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
              class="text-sm text-red-500 font-semibold"
            >
              {{ error }}
            </li>
          </ul>
          <div>
            <label for="" class="font-medium text-sm">Email</label>
            <div
              :class="
                passwordErrors.length ? 'border border-red-500' : 'border'
              "
              class="w-full flex justify-between items-center bg-gray-100 px-2 rounded border"
            >
              <input
                v-model="email"
                type="text"
                name="text"
                class="w-full h-10 bg-gray-100"
              />
            </div>
            <ul>
              <li
                v-for="(error, index) in emailErrors"
                :key="index"
                class="text-sm text-red-500"
              >
                {{ error }}
              </li>
            </ul>
          </div>
          <div>
            <label for="" class="font-medium text-sm">Password</label>
            <div
              :class="
                passwordErrors.length ? 'border border-red-500' : 'border'
              "
              class="w-full flex justify-between items-center bg-gray-100 px-2 rounded border"
            >
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                name="password"
                class="w-full h-10 bg-gray-100"
              />
              <button @click="toggleShowPassword">
                <svg
                  v-if="!showPassword"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="ai ai-EyeSlashed"
                >
                  <path
                    d="M6.873 17.129c-1.845-1.31-3.305-3.014-4.13-4.09a1.693 1.693 0 0 1 0-2.077C4.236 9.013 7.818 5 12 5c1.876 0 3.63.807 5.13 1.874"
                  />
                  <path d="M14.13 9.887a3 3 0 1 0-4.243 4.242" />
                  <path d="M4 20L20 4" />
                  <path
                    d="M10 18.704A7.124 7.124 0 0 0 12 19c4.182 0 7.764-4.013 9.257-5.962a1.694 1.694 0 0 0-.001-2.078A22.939 22.939 0 0 0 19.57 9"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="ai ai-EyeOpen"
                >
                  <path
                    d="M21.257 10.962c.474.62.474 1.457 0 2.076C19.764 14.987 16.182 19 12 19c-4.182 0-7.764-4.013-9.257-5.962a1.692 1.692 0 0 1 0-2.076C4.236 9.013 7.818 5 12 5c4.182 0 7.764 4.013 9.257 5.962z"
                  />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </div>

            <ul>
              <li
                v-for="(error, index) in passwordErrors"
                :key="index"
                class="text-sm text-red-500"
              >
                {{ error }}
              </li>
            </ul>
          </div>
          <button
            @click="login"
            class="bg-green-500 hover:bg-green-600 text-white p-3 rounded font-semibold mt-4"
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
import API from "../services/api";
import { useRouter } from "vue-router";

export default {
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
          const payload = state;
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
      toggleShowPassword,
      login,
      validateUser,
    };
  },
};
</script>

<style></style>

<style></style>

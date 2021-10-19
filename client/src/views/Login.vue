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
          ></div>
        </div>
        <div class="grid grid-cols-1 gap-y-2">
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
            <input
              v-model="email"
              :class="emailErrors.length ? 'border border-red-500' : 'border'"
              type="text"
              name="email"
              class="w-full bg-gray-100 p-2 rounded border"
            />
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
            <input
              :class="
                passwordErrors.length ? 'border border-red-500' : 'border'
              "
              v-model="password"
              type="password"
              name="password"
              class="w-full bg-gray-100 p-2 rounded border"
            />
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
    });

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
      login,
      validateUser,
    };
  },
};
</script>

<style></style>

<style></style>

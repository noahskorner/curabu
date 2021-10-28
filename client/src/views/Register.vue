<template>
  <div
    class="bg-b-secondary w-screen h-screen flex justify-center items-start p-2"
    @keypress.enter="register"
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
        <div class="grid grid-cols-1 gap-y-2">
          <div class="flex justify-between items-center">
            <h1 class="text-2xl font-semibold">Sign up</h1>
            <p>
              <router-link
                :to="{ name: 'login' }"
                class="text-blue-500 text-sm font-semibold hover:underline"
                >Already have an account?</router-link
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
          <Input
            @input="setUsername"
            @blur="validateUser"
            :value="username"
            :errors="usernameErrors"
            type="text"
            label="Username"
          />
          <Input
            @input="setEmail"
            @blur="validateUser"
            :value="email"
            :errors="emailErrors"
            type="text"
            label="Email"
          />
          <Input
            @input="setPassword1"
            @blur="validateUser"
            :value="password1"
            :errors="password1Errors"
            type="password"
            label="Password"
          />
          <Input
            @input="setPassword2"
            @blur="validateUser"
            :value="password2"
            :errors="password2Errors"
            type="password"
            label="Confirm Password"
          />

          <button
            @click="register"
            class="bg-primary hover:bg-green-600 text-white p-3 rounded font-semibold mt-4"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import { emailRegex, usernameRegex } from "../common/constants";
import API from "../services/api";
import Input from "../components/common/ui/Input.vue";
import Logo from "../components/common/ui/Logo.vue";

export default {
  components: {
    Input,
    Logo,
  },
  setup() {
    const state = reactive({
      username: "",
      usernameErrors: [],
      email: "",
      emailErrors: [],
      password1: "",
      password1Errors: [],
      password2: "",
      password2Errors: [],
      errors: [],
    });

    const setUsername = (username) => {
      state.username = username;
      validateUser();
    };

    const setEmail = (email) => {
      state.email = email;
      validateUser();
    };

    const setPassword1 = (password1) => {
      state.password1 = password1;
      validateUser();
    };
    const setPassword2 = (password2) => {
      state.password2 = password2;
      validateUser();
    };

    const validateUser = () => {
      state.emailErrors = [];
      state.usernameErrors = [];
      state.password1Errors = [];
      state.password2Errors = [];
      // validate username
      if (!state.username) {
        state.usernameErrors.push("Must provide a username.");
      } else {
        if (state.username.length < 5 || state.username.length > 25)
          state.usernameErrors.push("Username must be 5 - 25 characters long.");

        if (!usernameRegex.test(state.username)) {
          state.usernameErrors.push(
            "Username can only contain letters, numbers, hypens, underscores, and periods."
          );
        }
      }

      // validate email
      if (!emailRegex.test(state.email)) {
        state.emailErrors.push("Email must be valid.");
      }

      // validate password
      if (!state.password1) {
        state.password1Errors.push("Must provide a password.");
      } else {
        if (state.password1.length < 8)
          state.password1Errors.push("Password must be at least 8 characters.");

        if (!/\d/.test(state.password1))
          state.password1Errors.push(
            "Password must contain at least 1 number."
          );

        if (!/[A-Z]/.test(state.password1))
          state.password1Errors.push(
            "Password must contain at least 1 uppercase letter."
          );

        if (state.password1 !== state.password2)
          state.password2Errors.push("Passwords do not match.");
      }
    };

    const register = async () => {
      validateUser();
      if (
        !state.usernameErrors.length &&
        !state.emailErrors.length &&
        !state.password1Errors.length &&
        !state.password2Errors.length
      ) {
        try {
          const payload = {
            username: state.username,
            email: state.email,
            password1: state.password1,
            password2: state.password2,
          };

          const response = await API.register(payload);

          console.log(response);
        } catch (error) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            const fieldErrors = error.response.data.errors;
            state.usernameErrors = fieldErrors.username;
            state.emailErrors = fieldErrors.email;
            state.password1Errors = fieldErrors.password1;
            state.password2Errors = fieldErrors.password2;
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
      setUsername,
      setEmail,
      setPassword1,
      setPassword2,
      register,
      validateUser,
    };
  },
};
</script>

<style></style>

<style></style>

<template>
  <div class="w-screen h-screen flex">
    <!-- Register -->
    <div class="w-full lg:w-2/3 h-full">
      <div class="login-header px-4 flex items-center">
        <Logo />
      </div>
      <div class="w-full mt-16 flex justify-center items-center px-8">
        <div class="w-full max-w-xl flex flex-col">
          <!-- Sign Up Header -->
          <div class="text-center w-full">
            <h2
              class="font-semibold text-2xl md:text-3xl xl:text-4xl mb-8"
              id="sign-up-header"
            >
              Sign up for Taylor's Book Club
            </h2>
          </div>
          <!-- Loading -->
          <div
            class="w-full my-2 flex justify-center items-center"
            v-show="state.loading"
          >
            <i class="fas fa-spinner fa-pulse fa-2x"></i>
          </div>
          <!-- Email -->
          <div class="w-full flex flex-col text-lg my-2">
            <label for="email" class="px-4">Email</label>
            <input
              type="email"
              class="bg-gray-200 h-12 rounded-xl p-4 border-2 border-gray-200 text-dark"
              placeholder="Enter email"
              @input="state.validateEmail()"
              @blur="state.validateEmail()"
              :class="
                state.emailErrors.length > 0
                  ? 'border-red-500'
                  : 'focus:border-purple-500'
              "
              v-model="state.email"
            />
            <span v-show="state.emailErrors.length > 0">
              <p
                class="px-4 mt-1 text-sm text-red-500"
                v-for="(emailError, index) in state.emailErrors"
                :key="index"
              >
                {{ emailError }}
              </p></span
            >
          </div>
          <!-- Password 1 -->
          <div class="w-full flex flex-col text-lg my-2">
            <label for="password" class="px-4">Password</label>
            <input
              type="password"
              class="bg-gray-200 h-12 rounded-xl p-4 border-2 border-gray-200 text-dark"
              placeholder="Enter your password"
              @input="
                state.validatePassword1();
                state.validatePassword2();
              "
              @blur="
                state.validatePassword1();
                state.validatePassword2();
              "
              :class="
                !state.password1Validated
                  ? 'border-red-500'
                  : 'focus:border-purple-500'
              "
              v-model="state.password1"
            />
            <span v-show="!state.password1Validated">
              <p
                class="px-4 mt-1 text-sm text-red-500"
                v-for="(passwordError, index) in state.passwordErrors"
                :key="index"
              >
                {{ passwordError }}
              </p></span
            >
          </div>
          <!-- Password 2 -->
          <div class="w-full flex flex-col text-lg my-2">
            <label for="password" class="px-4">Confirm Password</label>
            <input
              type="password"
              class="bg-gray-200 h-12 rounded-xl p-4 border-2 border-gray-200 text-dark"
              placeholder="Enter your password"
              @input="state.validatePassword2()"
              @blur="state.validatePassword2()"
              :class="
                !state.password2Validated
                  ? 'border-red-500'
                  : 'focus:border-purple-500'
              "
              v-model="state.password2"
            />
            <p
              class="px-4 mt-1 text-sm text-red-500"
              v-show="!state.password2Validated"
            >
              Passwords do not match
            </p>
          </div>
          <!-- Sign Up Button -->
          <button
            @click="state.registerUser()"
            class="mt-8 mb-2 h-12 rounded-full text-white text-3xl font-medium mx-1"
            id="sign-in-btn"
            :disabled="
              !state.emailValidated ||
              !state.password1Validated ||
              !state.password2Validated ||
              state.loading
            "
            :class="
              !state.emailValidated ||
              !state.password1Validated ||
              !state.password2Validated ||
              state.loading
                ? 'bg-gray-300 cursor-default'
                : 'bg-dark-purple'
            "
          >
            Sign up
          </button>
          <div class="w-full text-center text-sm">
            <div class="my-3">
              <router-link to="/login" class="link"
                >Already have an account?</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Login -->
    <div class="hidden lg:block w-1/3 h-full bg-dark-purple px-8">
      <div class="login-header px-4 flex items-center"></div>
      <div class="w-full mt-32 flex justify-center items-center">
        <div class="w-full max-w-xl flex flex-col">
          <div class="text-center">
            <h2
              class="font-semibold text-2xl md:text-3xl xl:text-4xl text-white mb-8"
            >
              Already have an account?
            </h2>
          </div>
          <router-link
            to="/login"
            class="my-4 h-12 border-2 border-white rounded-full text-white text-3xl font-medium mx-1 flex justify-center items-center"
            id="sign-up-btn"
          >
            Sign in
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import API from "../services/API.js";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const state = reactive({
      email: "",
      password1: "",
      password2: "",
      emailValidated: true,
      password1Validated: true,
      password2Validated: true,
      loading: false,
      emailErrors: [],
      passwordErrors: [],
      minimumLengthValidator: () => {
        return !(state.password1.length < 8);
      },
      numericPasswordValidator: () => {
        if (typeof state.password1 != "string") return false;
        return !(
          !isNaN(state.password1) && !isNaN(parseFloat(state.password1))
        );
      },
      validateEmail: () => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        state.emailValidated = re.test(String(state.email).toLowerCase());
        state.emailErrors = state.emailValidated
          ? []
          : ["Please enter a valid email address"];
        return;
      },
      validatePassword1: () => {
        state.passwordErrors = [];
        if (!state.minimumLengthValidator())
          state.passwordErrors.push(
            "Your password must contain at least 8 characters."
          );
        if (!state.numericPasswordValidator())
          state.passwordErrors.push("Your password can’t be entirely numeric.");
        state.password1Validated =
          state.minimumLengthValidator() && state.numericPasswordValidator();
        return;
      },
      validatePassword2: () => {
        state.password2Validated = state.password1 === state.password2;
      },
      registerUser: async () => {
        state.validateEmail();
        state.validatePassword1();
        state.validatePassword2();
        if (
          !state.emailValidated ||
          !state.password1Validated ||
          !state.password2Validated
        )
          return;
        state.loading = true;
        const payload = {
          email: state.email,
          password1: state.password1,
          password2: state.password2,
        };

        try {
          const response = await API.register(payload);
          console.log("response", response);
        } catch (error) {
          if (error.response) {
            if (error.response.data.email) {
              state.emailErrors = error.response.data.email;
              state.emailValidated = false;
            }
            if (error.response.data.password1) {
              state.passwordErrors = error.response.data.password1;
              state.password1Validated = false;
            }
          } else if (error.request) {
            await store.dispatch("alert/addAlert", {
              alertType: "error",
              message:
                "Yeah... that's our bad. There was an error when trying to log you in. Please try again",
            });
          } else {
            await store.dispatch("alert/addAlert", {
              alertType: "error",
              message:
                "Yeah... that's our bad. There was an error when trying to log you in. Please try again",
            });
          }
        }
        state.loading = false;
      },
    });
    return {
      state,
    };
  },
};
</script>

<style scoped>
.login-header {
  height: 4rem;
}

.link:hover {
  border-bottom: 2px solid var(--dark-purple);
}

#sign-in-btn:active {
  background-color: var(--purple);
  margin-left: 0;
  margin-right: 0;
}

#sign-up-btn:hover {
  background-color: var(--purple);
}
#sign-up-btn:active {
  background-color: var(--purple);
  margin-left: 0;
  margin-right: 0;
}

#errors {
  min-height: 3rem;
}
</style>

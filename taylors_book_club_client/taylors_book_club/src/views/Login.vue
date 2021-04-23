<template>
  <div class="w-screen h-screen flex" @keyup.enter="state.loginUser()">
    <!-- Login -->
    <div id="login-form" class="w-full lg:w-2/3 h-full">
      <div
        class="login-header px-4 flex justify-center lg:justify-start items-center"
      >
        <Logo />
      </div>
      <div class="w-full mt-8 lg:mt-16 flex justify-center items-center px-8">
        <div class="w-full max-w-xl flex flex-col">
          <!-- Sign In Header -->
          <div class="text-center w-full" id="sign-in-header">
            <h2 class="font-semibold text-2xl md:text-3xl xl:text-4xl mb-8">
              Sign in to Taylor's Book Club
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
                !state.emailValidated
                  ? 'border-red-500'
                  : 'focus:border-purple-500'
              "
              v-model="state.email"
            />
            <p
              class="px-4 mt-1 text-sm text-red-500"
              v-show="!state.emailValidated"
            >
              Enter a valid email! I'm disappointed in you
            </p>
          </div>
          <!-- Password -->
          <div class="w-full flex flex-col text-lg my-2">
            <label for="password" class="px-4">Password</label>
            <input
              type="password"
              class="bg-gray-200 h-12 rounded-xl p-4 border-2 border-gray-200 text-dark"
              placeholder="Enter your password"
              @input="state.validatePassword()"
              @blur="state.validatePassword()"
              :class="
                !state.passwordValidated
                  ? 'border-red-500'
                  : 'focus:border-purple-500'
              "
              v-model="state.password"
            />
            <p
              class="px-4 mt-1 text-sm text-red-500"
              v-show="!state.passwordValidated"
            >
              Enter a password! It's probably password123 anyway
            </p>
          </div>
          <!-- Sign In Button -->
          <button
            @click="state.loginUser()"
            class="mt-8 mb-2 h-12 rounded-full text-white text-3xl font-medium mx-1"
            id="sign-in-btn"
            :disabled="
              !state.emailValidated || !state.passwordValidated || state.loading
            "
            :class="
              !state.emailValidated || !state.passwordValidated || state.loading
                ? 'bg-gray-300 cursor-default'
                : 'bg-dark-purple'
            "
          >
            Sign in
          </button>
          <div class="w-full text-center text-sm">
            <div class="my-3">
              <router-link to="/" class="link"
                >Forgot your password?</router-link
              >
            </div>
            <div class="my-3">
              <router-link to="/register" class="link"
                >Need an account?</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Register -->
    <div class="hidden lg:block w-1/3 h-full bg-dark-purple px-8">
      <div class="login-header px-4 flex items-center"></div>
      <div class="w-full mt-32 flex justify-center items-center">
        <div class="w-full max-w-xl flex flex-col">
          <div class="text-center">
            <h2
              class="font-semibold text-2xl md:text-3xl xl:text-4xl text-white mb-8"
            >
              Need an account?
            </h2>
            <p class="text-white">
              Sign up now to Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. Molestiae, iste.
            </p>
          </div>
          <router-link
            to="/register"
            class="my-8 h-12 border-2 border-white rounded-full text-white text-3xl font-medium mx-1 flex justify-center items-center"
            id="sign-up-btn"
          >
            Sign up
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
      password: "",
      emailValidated: true,
      passwordValidated: true,
      loading: false,
      errors: [],
      validateEmail: () => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        state.emailValidated = re.test(String(state.email).toLowerCase());
        return;
      },
      validatePassword: () => {
        state.passwordValidated = state.password == "" ? false : true;
        return;
      },
      loginUser: async () => {
        state.validateEmail();
        state.validatePassword();
        if (!state.emailValidated || !state.passwordValidated) return;
        state.loading = true;
        const payload = {
          email: state.email,
          password: state.password,
        };

        try {
          const response = await API.login(payload);
          await store.dispatch("alert/addAlert", {
            alertType: "success",
            message: "Logged in successfully!",
          });
          const token = response.data.key;
          store.dispatch("user/login", token);
        } catch (error) {
          if (error.response) {
            if (error.response.data["non_field_errors"]) {
              error.response.data["non_field_errors"].forEach(
                async (errorMsg) => {
                  await store.dispatch("alert/addAlert", {
                    alertType: "error",
                    message: errorMsg,
                  });
                }
              );
            }
            state.emailValidated = false;
            state.passwordValidated = false;
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

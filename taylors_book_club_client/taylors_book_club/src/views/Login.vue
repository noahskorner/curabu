<template>
  <div class="w-screen h-screen flex">
    <!-- Login -->
    <div class="w-full lg:w-2/3 bg-white h-full">
      <div class="login-header px-4 flex items-center">
        <Logo />
      </div>
      <div class="w-full mt-16 flex justify-center items-center px-8">
        <div class="w-full max-w-lg flex flex-col">
          <!-- Sign In Header -->
          <div class="text-center w-full">
            <h2
              class="font-semibold text-2xl md:text-3xl xl:text-4xl text-dark-purple mb-8"
            >
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
          <!-- Errors -->
          <div
            id="errors"
            class="w-full flex justify-between items-stretch my-2 mx-1 shadow-md rounded-lg px-4"
            v-show="state.errors.length"
          >
            <div class="w-3 bg-red-500"></div>
            <div class="w-full mx-1 flex justify-center items-center">
              <p
                class="text-red-500 block w-full"
                v-for="(error, index) in state.errors"
                :key="index"
              >
                {{ error }}
              </p>
            </div>
            <button
              class="w-4 flex justify-center items-center"
              @click="state.errors = []"
            >
              <i class="fas fa-times fa-lg"></i>
            </button>
          </div>
          <!-- Email -->
          <div class="w-full flex flex-col text-lg my-2">
            <label for="email" class="px-4">Email</label>
            <input
              type="email"
              class="bg-gray-100 h-12 rounded-xl p-4"
              placeholder="Enter email"
              @input="state.validateEmail()"
              :class="!state.emailValidated ? 'border-2 border-red-500' : ''"
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
              class="bg-gray-100 h-12 rounded-xl p-4"
              placeholder="Enter your password"
              @input="state.validatePassword()"
              :class="!state.passwordValidated ? 'border-2 border-red-500' : ''"
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
          <div class="w-full text-center text-sm text-gray-500">
            <div class="my-3">
              <router-link to="/" class="link"
                >Forgot your password?</router-link
              >
            </div>
            <div class="my-3">
              <router-link to="/" class="link">Need an account?</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Register -->
    <div class="hidden lg:block w-1/3 h-full bg-dark-purple px-8">
      <div class="login-header px-4 flex items-center"></div>
      <div class="w-full mt-32 flex justify-center items-center">
        <div class="w-full max-w-lg flex flex-col">
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
          <button
            class="my-8 h-12 border-2 border-white rounded-full text-white text-3xl font-medium mx-1"
            id="sign-up-btn"
          >
            Sign up
          </button>
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
          const token = response.data.key;
          store.dispatch("user/login", token);
        } catch (error) {
          if (error.response) {
            state.errors = error.response.data["non_field_errors"];
          } else if (error.request) {
            state.errors = [
              "Yeah... that's our bad. There was an error when trying to log you in. Please try again",
            ];
          } else {
            state.errors = [
              "Yeah... that's our bad. There was an error when trying to log you in. Please try again",
            ];
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

input:focus {
  border: 2px solid var(--dark-purple);
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

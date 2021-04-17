<template>
  <div class="w-screen h-screen flex">
    <!-- Login -->
    <div class="w-full lg:w-2/3 bg-white h-full">
      <div class="login-header px-4 flex items-center">
        <Logo />
      </div>
      <div class="w-full mt-16 flex justify-center items-center px-8">
        <div class="w-full max-w-lg flex flex-col">
          <div class="text-center w-full">
            <h2
              class="font-semibold text-2xl md:text-3xl xl:text-4xl text-dark-purple mb-8"
            >
              Sign in to Taylor's Book Club
            </h2>
          </div>

          <div class="w-full flex flex-col text-lg my-2">
            <label for="email" class="px-4">Email</label>
            <input
              type="email"
              class="bg-gray-100 h-12 rounded-xl p-4"
              placeholder="Enter email"
            />
          </div>
          <div class="w-full flex flex-col text-lg my-2">
            <label for="password" class="px-4">Password</label>
            <input
              type="password"
              class="bg-gray-100 h-12 rounded-xl p-4"
              placeholder="Enter your password"
            />
          </div>
          <button
            @click="loginUser()"
            class="mt-8 mb-2 bg-dark-purple h-12 rounded-full text-white text-3xl font-medium mx-1"
            id="sign-in-btn"
          >
            Sign in
          </button>
          <div class="w-full text-center text-sm text-gray-500">
            <div class="my-3">
              <router-link to="/reset-password" class="link"
                >Forgot your password?</router-link
              >
            </div>
            <div class="my-3">
              <router-link to="/reset-password" class="link"
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
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("user", ["login"]),
    loginUser() {
      const payload = {
        email: "test@test.com",
        password: "ujmik,ol.",
      };
      this.login(payload);
    },
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

#sign-in-btn:hover {
  background-color: var(--purple);
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
</style>

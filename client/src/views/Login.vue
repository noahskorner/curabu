<template>
  <div
    class="bg-green-100 w-screen h-screen flex justify-center items-start p-2"
  >
    <div
      class="w-full max-w-md flex flex-col justify-center items-center mt-14 sm:mt-24"
    >
      <div class="w-full bg-white rounded shadow p-8 pt-20 relative">
        <div
          class="absolute w-full -top-14 left-0 flex justify-center items-center"
        >
          <div
            class="w-28 h-28 rounded-full bg-green-500 flex justify-center items-center text-white relative"
          ></div>
        </div>
        <div class="grid grid-cols-1 gap-y-6">
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

          <div>
            <label for="" class="font-medium text-sm">Email</label>
            <input
              type="text"
              name=""
              id=""
              class="w-full bg-gray-100 p-2 rounded border"
            />
          </div>
          <div>
            <label for="" class="font-medium text-sm">Password</label>
            <input
              type="text"
              name=""
              id=""
              class="w-full bg-gray-100 p-2 rounded border"
            />
          </div>
          <button
            class="bg-green-500 hover:bg-green-600 text-white p-3 rounded font-semibold"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

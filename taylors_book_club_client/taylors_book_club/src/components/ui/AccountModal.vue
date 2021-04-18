<template>
  <span class="relative">
    <IconButton @click="state.showAccountModal = !state.showAccountModal">
      <i class="fas fa-user-alt fa-lg"></i>
    </IconButton>
    <div
      id="account-modal"
      class="absolute w-80 min-h-16 right-0 rounded-xl shadow-top p-4 z-20"
      v-show="state.showAccountModal"
    >
      <h3 class="text-xl font-semibold mb-2">Account</h3>
      <router-link
        to="/profile"
        tag="div"
        class="flex justify-start items-center p-2 rounded-xl account-modal-link"
      >
        <div
          class="flex justify-center items-center bg-light-gray text-dark account-icon-btn rounded-full"
        >
          <i class="far fa-address-card fa-lg"></i>
        </div>
        <div class="pl-2 font-medium">My Profile</div>
      </router-link>
      <button
        class="flex justify-start items-center p-2 rounded-xl account-modal-link w-full"
        @click="logoutUser()"
      >
        <div
          class="flex justify-center items-center bg-light-gray text-dark account-icon-btn rounded-full"
        >
          <i class="fas fa-sign-out-alt fa-lg"></i>
        </div>
        <div class="pl-2 font-medium">Log out</div>
      </button>
    </div>
    <div
      v-show="state.showAccountModal"
      class="fixed w-screen h-screen top-0 left-0"
      @click="state.showAccountModal = false"
    ></div>
  </span>
</template>

<script>
import { reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      showAccountModal: false,
    });

    return {
      state,
      logoutUser: () => {
        store.dispatch("user/logout");
        store.dispatch("alert/addAlert", {
          alertType: "success",
          message: "Logged out successfully!",
        });
        router.push("/");
      },
    };
  },
};
</script>

<style scoped>
.account-icon-btn {
  width: 2.5rem;
  height: 2.5rem;
}
</style>

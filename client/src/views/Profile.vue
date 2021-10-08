<template>
  <div class="flex justify-center items-center">
    <div class="w-1/4">
      Change Password
      <!-- Old Password -->
      <input
        type="password"
        class="block my-4"
        placeholder="Enter current password"
        v-model="state.oldPassword"
      />
      <span v-show="!state.newPassword1Validated">
        <p
          class="px-4 mt-1 text-sm text-red-500"
          v-for="(passwordError, index) in state.oldPasswordErrors"
          :key="index"
        >
          {{ passwordError }}
        </p></span
      >
      <!-- New Password1 -->
      <input
        type="password"
        class="block my-4"
        placeholder="Enter new password"
        v-model="state.newPassword1"
        @input="
          state.validateNewPassword1();
          state.validateNewPassword2();
        "
        @blur="
          state.validateNewPassword1();
          state.validateNewPassword2();
        "
      />
      <span v-show="!state.newPassword1Validated">
        <p
          class="px-4 mt-1 text-sm text-red-500"
          v-for="(passwordError, index) in state.passwordErrors"
          :key="index"
        >
          {{ passwordError }}
        </p></span
      >
      <!-- New Password 2 -->
      <input
        type="password"
        class="block my-4"
        placeholder="Confirm new password"
        v-model="state.newPassword2"
        @input="state.validateNewPassword2()"
        @blur="state.validateNewPassword2()"
      />
      <p
        class="px-4 mt-1 text-sm text-red-500"
        v-show="!state.newPassword2Validated"
      >
        Passwords do not match
      </p>
      <button class="bg-purple" @click="state.changePassword()">
        Change password
      </button>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import API from "../services/API.js";
export default {
  setup() {
    const state = reactive({
      loading: false,
      oldPassword: "",
      oldPasswordValidated: true,
      newPassword1: "",
      newPassword2: "",
      newPassword1Validated: true,
      newPassword2Validated: true,
      oldPasswordErrors: [],
      passwordErrors: [],
      minimumLengthValidator: () => {
        return !(state.newPassword1.length < 8);
      },
      numericPasswordValidator: () => {
        if (typeof state.newPassword1 != "string") return false;
        return !(
          !isNaN(state.newPassword1) && !isNaN(parseFloat(state.newPassword1))
        );
      },
      validateOldPassword: () => {
        state.oldPasswordErrors = [];
        if (state.oldPassword !== "") {
          state.oldPass;
        }
        state.oldPasswordValidated =
          state.oldPassword !== "" && state.oldPassword !== state.newPassword1;
      },
      validateNewPassword1: () => {
        state.passwordErrors = [];
        if (!state.minimumLengthValidator())
          state.passwordErrors.push(
            "Your password must contain at least 8 characters."
          );
        if (!state.numericPasswordValidator())
          state.passwordErrors.push("Your password can’t be entirely numeric.");
        state.newPassword1Validated =
          state.minimumLengthValidator() && state.numericPasswordValidator();
        return;
      },
      validateNewPassword2: () => {
        state.newPassword2Validated = state.newPassword1 === state.newPassword2;
      },
      changePassword: async () => {
        state.validateOldPassword();
        state.validateNewPassword1();
        state.validateNewPassword2();
        if (
          !state.newPassword1Validated ||
          !state.newPassword2Validated ||
          !state.oldPasswordValidated
        )
          return;
        state.loading = true;
        try {
          if (localStorage.Authorization) {
            const payload = {
              old_password: state.oldPassword,
              new_password1: state.newPassword1,
              new_password2: state.newPassword2,
            };
            const response = await API.changePassword(payload, {
              Authorization: localStorage.Authorization,
            });
            console.log(response);
          }
        } catch (error) {
          if (error.response) {
            console.log(error.response);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log(error);
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

<style></style>

<script>
import { useRoute, useRouter } from "vue-router";
import API from "../services/API";
import { useStore } from "vuex";
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    try {
      const payload = { key: route.params.key };
      API.verifyEmail(payload);
      store.dispatch("alert/addAlert", {
        alertType: "success",
        message: "Email address verified!",
      });
      router.push("/login");
    } catch (error) {
      store.dispatch("alert/addAlert", {
        alertType: "error",
        message: "Unable to verify email address.",
      });
      router.push("/");
    }
  },
};
</script>

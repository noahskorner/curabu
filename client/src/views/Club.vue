<template>
  <PageWrapper>
    <div class="w-full">
      <h1 class="text-4xl font-semibold">Club</h1>
      <p>{{ club }}</p>
    </div>
  </PageWrapper>
</template>

<script>
import PageWrapper from "../components/common/layout/PageWrapper";
import { useRoute } from "vue-router";
import { onMounted, ref } from "@vue/runtime-core";
import useClubs from "../composables/useClubs";
export default {
  components: {
    PageWrapper,
  },
  setup() {
    const route = useRoute();
    const { loadClub } = useClubs();
    const club = ref(null);

    onMounted(async () => {
      const clubId = route.params.id;
      console.log(clubId);

      club.value = await loadClub(clubId);
    });

    return {
      club,
    };
  },
};
</script>

<style></style>

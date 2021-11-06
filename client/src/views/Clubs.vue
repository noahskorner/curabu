<template>
  <PageWrapper>
    <div class="w-full">
      <h1 class="text-4xl font-semibold">Clubs</h1>
      <div v-for="club in clubs" :key="club.id">
        <router-link :to="{ name: 'club', params: { id: club.id } }">{{
          club
        }}</router-link>
      </div>
    </div>
  </PageWrapper>
</template>

<script>
import useClubs from "../composables/useClubs";
import PageWrapper from "../components/common/layout/PageWrapper";
import { onMounted } from "@vue/runtime-core";
export default {
  components: {
    PageWrapper,
  },
  setup() {
    const { clubs, loadClubs } = useClubs();

    onMounted(async () => {
      await loadClubs();
    });

    return {
      clubs,
    };
  },
};
</script>

<style></style>

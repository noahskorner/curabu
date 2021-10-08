<template>
  <div class="w-full flex justify-center items-center">
    <div
      class="max-w-7xl mx-2 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <ClubCard
        v-for="club in clubs"
        :key="club.id"
        :name="club.name"
        :nameUrl="club.name_url"
        :currentBook="getCurrentBook(club.id)"
      />
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import ClubCard from "../components/ui/ClubCard.vue";
export default {
  components: {
    ClubCard,
  },
  setup() {
    const store = useStore();

    onMounted(async () => {
      await store.dispatch("club/loadClubs");
    });

    return {
      clubs: computed(() => store.getters["club/getClubs"]),
      getCurrentBook: computed(() => store.getters["club/getCurrentBook"]),
    };
  },
};
</script>

<style scoped>
#img-bg {
  background-image: url("~@/assets/img/pandpcover.jpeg");
  background-position: center;
  filter: blur(10px); /* apply the blur */
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.2);
}

img {
  bottom: 80%;
  left: 5%;
}
</style>

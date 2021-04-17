<template>
  <div class="w-full flex justify-center items-center mt-4">
    <div
      class="max-w-7xl mx-2 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <ClubCard />
      <ClubCard />
      <ClubCard />
      <ClubCard />
      <ClubCard />
      <ClubCard />
      <ClubCard />
      <ClubCard />
    </div>
  </div>
</template>

<script>
import ClubCard from "../components/ui/ClubCard.vue";
export default {
  components: {
    ClubCard,
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

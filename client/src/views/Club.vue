<template>
  <PageWrapper>
    <div class="w-full h-full flex justify-center">
      <div
        class="w-full max-w-7xl h-full flex flex-col justify-between relative"
        v-if="club"
      >
        <!-- Club Header -->
        <div class="w-full py-2 bg-b-secondary-op">
          <h1 class="text-2xl font-semibold">{{ club.name }}</h1>
          <div
            class="w-full flex justify-start items-center my-2 border-b border-bd-primary text-t-secondary"
          >
            <button
              class="px-4 text-sm py-1 font-semibold uppercase"
              :class="
                view === views.posts ? ['border-b-2', 'border-primary'] : []
              "
              @click="setView(views.posts)"
            >
              Posts
            </button>
            <button
              class="px-4 text-sm py-1 font-semibold uppercase"
              :class="
                view === views.book ? ['border-b-2', 'border-primary'] : []
              "
              @click="setView(views.book)"
            >
              Books
            </button>
            <button
              class="px-4 text-sm py-1 font-semibold uppercase"
              :class="
                view === views.about ? ['border-b-2', 'border-primary'] : []
              "
              @click="setView(views.about)"
            >
              About
            </button>
          </div>
        </div>
        <!-- Posts -->
        <div class="w-full h-full p-2" v-if="view === views.posts">
          <Post
            v-for="post in club.posts"
            :key="post.id"
            :postId="post.id"
            :title="post.title"
            :body="post.body"
            :dateCreated="post.dateCreated"
          />
        </div>
        <!-- About -->
        <div class="w-full h-full p-2" v-if="view === views.about">
          {{ club }}
        </div>
      </div>
      <!-- Fallback -->
      <div class="w-full" v-else>Loading ...</div>
    </div>
  </PageWrapper>
</template>

<script>
import { useRoute } from "vue-router";
import { onMounted, reactive, toRefs } from "@vue/runtime-core";
import useClubs from "../composables/useClubs";
import PageWrapper from "../components/common/layout/PageWrapper";
import Post from "../components/club/ui/Post.vue";
export default {
  components: {
    PageWrapper,
    Post,
  },
  setup() {
    const route = useRoute();
    const { loadClub } = useClubs();

    const views = {
      posts: 1,
      books: 2,
      about: 3,
    };
    const state = reactive({
      club: {},
      view: views.posts,
    });
    const setView = (view) => {
      state.view = view;
    };

    onMounted(async () => {
      const clubId = route.params.id;
      state.club = await loadClub(clubId);
    });

    return {
      views,
      ...toRefs(state),
      setView,
    };
  },
};
</script>

<style></style>

<template>
  <PageWrapper>
    <div class="w-full h-full flex justify-center">
      <div
        class="w-full max-w-7xl h-full flex flex-col justify-between relative"
        v-if="club"
      >
        <!-- Club Header -->
        <div class="w-full pt-2 px-2 bg-b-secondary-op">
          <div class="w-full flex justify-start items-center">
            <h1 class="text-2xl font-semibold mr-2">{{ club.name }}</h1>
          </div>
          <div
            class="w-full flex justify-start items-center my-2 border-b border-bd-primary text-t-secondary"
          >
            <button
              class="px-4 text-sm py-1 font-semibold uppercase"
              :class="
                view === views.posts
                  ? ['border-b-2', 'border-primary']
                  : ['hover:border-b-2', 'hover:border-primary']
              "
              @click="setView(views.posts)"
            >
              Posts
            </button>
            <button
              class="px-4 text-sm py-1 font-semibold uppercase"
              :class="
                view === views.chat
                  ? ['border-b-2', 'border-primary']
                  : ['hover:border-b-2', 'hover:border-primary']
              "
              @click="setView(views.chat)"
            >
              Chat
            </button>
            <button
              class="px-4 text-sm py-1 font-semibold uppercase"
              :class="
                view === views.books
                  ? ['border-b-2', 'border-primary']
                  : ['hover:border-b-2', 'hover:border-primary']
              "
              @click="setView(views.books)"
            >
              Books
            </button>
            <button
              class="px-4 text-sm py-1 font-semibold uppercase"
              :class="
                view === views.about
                  ? ['border-b-2', 'border-primary']
                  : ['hover:border-b-2', 'hover:border-primary']
              "
              @click="setView(views.about)"
            >
              About
            </button>
          </div>
          <Toolbar
            :clubName="club.name"
            :clubId="club.id"
            :views="views"
            :view="view"
          />
        </div>
        <!-- Posts -->
        <div class="w-full h-full px-2 pb-2" v-if="view === views.posts">
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
import Toolbar from "../components/club/ui/Toolbar.vue";
export default {
  components: {
    PageWrapper,
    Post,
    Toolbar,
  },
  setup() {
    const route = useRoute();
    const { currentClub: club, loadClub } = useClubs();

    const views = {
      posts: 1,
      chat: 2,
      books: 3,
      about: 4,
    };
    const state = reactive({
      view: views.books,
    });
    const setView = (view) => {
      state.view = view;
    };

    onMounted(async () => {
      const clubId = route.params.id;
      await loadClub(clubId);
    });

    return {
      views,
      club,
      ...toRefs(state),
      setView,
    };
  },
};
</script>

<style></style>

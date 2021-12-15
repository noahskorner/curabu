<template>
  <PageWrapper>
    <div class="w-full h-full flex justify-center">
      <div
        class="w-full max-w-7xl h-full flex flex-col justify-between relative"
        v-if="club"
      >
        <!-- Club Header -->
        <div class="w-full pt-2 px-2">
          <div class="w-full flex justify-start items-center">
            <h1 class="text-2xl font-semibold mr-2">{{ club.name }}</h1>
          </div>
          <div
            class="w-full flex justify-start items-center my-2 text-t-secondary"
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
        <!-- Books -->
        <div class="w-full h-full p-2" v-if="view === views.books">
          <div
            class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 gap-2 mt-2"
          >
            <div
              v-for="clubBook in club.bookClub.books"
              :key="clubBook.id"
              class="col-span-1 rounded h-20 sm:h-64 flex sm:flex-col shadow-sm relative cursor-pointer book border border-bd-primary"
            >
              <div
                class="h-full sm:h-2/5 w-12 sm:w-full relative rounded-t flex justify-center items-center sm:pl-2 z-0 overflow-hidden"
              >
                <div
                  class="absolute top-0 left-0 bottom-0 right-0 z-10 bg-black bg-book-opacity rounded-t"
                ></div>
                <div
                  v-if="clubBook.book.imageURL"
                  class="absolute top-0 left-0 right-0 bottom-0 z-0 bg-book rounded-t"
                  :style="{
                    backgroundImage: `url(${clubBook.book.imageURL})`,
                  }"
                ></div>
                <div
                  v-else
                  class="absolute top-0 left-0 right-0 bottom-0 z-0 bg-b-secondary rounded-t"
                ></div>
              </div>
              <div
                class="absolute top-0 left-0 right-0 bottom-0 flex justify-start items-center pl-4"
              >
                <img
                  v-if="clubBook.book.imageURL.length"
                  :src="clubBook.book.imageURL"
                  alt=""
                  class="h-16 sm:h-24 w-10 sm:w-16 sm:absolute sm:bottom-36 sm:left-2 relative z-10"
                />
                <div
                  v-else
                  alt=""
                  class="h-16 sm:h-24 w-10 sm:w-16 sm:absolute sm:bottom-36 sm:left-2 relative z-10 bg-b-opacity"
                ></div>
              </div>
              <div
                class="h-full w-full sm:h-3/5 pl-6 sm:pl-2 sm:pt-4 pr-2 overflow-hidden overflow-ellipsis"
              >
                <h6 class="mt-2 font-bold">
                  {{ clubBook.book.title }}
                </h6>
                <p class="text-sm text-t-secondary inline book-summary">
                  {{ clubBook.book.summary }}
                </p>
                <p class="text-xs text-t-secondary">
                  {{ clubBook.book.numPages }} pages
                </p>
              </div>
            </div>
          </div>
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

<style scoped>
.bg-book {
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(2rem);
}

.book:hover {
  margin: -2px;
}

.bg-book-opacity {
  opacity: 0.01;
}

.book-summary {
  line-height: 1.5em;
  height: 3em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
}
</style>

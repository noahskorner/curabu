<template>
  <Modal>
    <template #button="{ displayModal }">
      <button
        @click="displayModal"
        class="px-3 py-2 text-left bg-primary text-white hover:bg-secondary rounded flex items-center font-medium"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ai ai-Book mr-1"
        >
          <path d="M2 6s1.5-2 5-2 5 2 5 2v14s-1.5-1-5-1-5 1-5 1V6z" />
          <path d="M12 6s1.5-2 5-2 5 2 5 2v14s-1.5-1-5-1-5 1-5 1V6z" />
        </svg>
        <p class="text-sm">Add book</p>
      </button></template
    >
    <template #content="{ hideModal }">
      <div
        class="bg-b-primary w-full max-w-3xl relative z-10 lg:mt-24 rounded shadow text-t-primary font-primary"
      >
        <!-- Header -->
        <div
          class="h-10 bg-b-secondary rounded-t px-2 flex items-center justify-between"
        >
          <h3
            class="uppercase text-xs tracking-wide font-medium font-secondary"
          >
            Add book
          </h3>
          <button
            @click="hideModal"
            class="w-6 h-6 rounded hover:bg-b-opacity flex justify-center items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="ai ai-Cross"
            >
              <path d="M20 20L4 4m16 0L4 20" />
            </svg>
          </button>
        </div>
        <!-- Body -->
        <div class="p-4">
          <!-- Search -->
          <div class="w-full" v-if="view === views.search">
            <h6
              class="text-sm font-light text-t-secondary w-full font-primary mb-2"
            >
              Enter title, author, or isbn
            </h6>
            <Input
              :wrapperClass="['w-full']"
              :inputClass="['rounded-b-none']"
              :value="query"
              @input="setQuery"
            >
              <template #icon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="ai ai-Search mr-2"
                >
                  <path
                    d="M21 21l-4.486-4.494M19 10.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0z"
                  /></svg
              ></template>
            </Input>
            <div
              class="w-full border-b border-l border-r h-72 border-bd-primary rounded rounded-t-none bg-b-secondary relative overflow-auto"
            >
              <button
                @click="selectBook(book.id)"
                v-for="(book, index) in books"
                :key="index"
                class="flex justify-between items-center border-b border-bd-primary h-24 w-full text-left p-2"
                :class="
                  addBook.id !== book.id
                    ? ['hover:bg-b-primary']
                    : ['bg-b-primary']
                "
              >
                <div class="flex items-center">
                  <img :src="book.imageURL" alt="" class="w-12 mr-2" />
                  <div>
                    <h6 class="font-medium">{{ book.title }}</h6>
                    <p class="text-sm text-t-secondary font-light">
                      {{ book.author }}
                    </p>
                  </div>
                </div>
              </button>
              <div class="w-full text-center my-3">
                <p class="text-sm">
                  Don't see your book?
                  <button
                    class="hover:underline text-primary"
                    @click="setView(views.manual)"
                  >
                    Add it manually
                  </button>
                </p>
              </div>

              <div
                v-if="searching"
                class="absolute top-0 left-0 right-0 flex justify-center items-center pt-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="ai ai-ArrowClockwise spin"
                >
                  <path
                    d="M19.734 16.06a8.923 8.923 0 0 1-3.915 3.978 8.706 8.706 0 0 1-5.471.832 8.795 8.795 0 0 1-4.887-2.64 9.067 9.067 0 0 1-2.388-5.079 9.136 9.136 0 0 1 1.044-5.53 8.904 8.904 0 0 1 4.069-3.815 8.7 8.7 0 0 1 5.5-.608c1.85.401 3.366 1.313 4.62 2.755.151.16.735.806 1.22 1.781"
                  />
                </svg>
              </div>
            </div>
          </div>
          <!-- Manual Add -->
          <div class="w-full" v-else-if="view === views.manual">
            <button
              class="text-primary hover:underline text-sm flex items-center"
              @click="setView(views.search)"
            >
              &#x2190; Back
            </button>
            <div class="my-2 flex justify-between">
              <Input
                @input="setTitle"
                :value="addBook.title"
                :wrapperClass="['text-t-secondary', 'w-full', 'mr-1']"
                label="Title"
              />
              <Input
                @input="setAuthor"
                :value="addBook.author"
                :wrapperClass="['text-t-secondary', 'w-full', 'ml-1']"
                label="Author"
              />
            </div>
            <Text
              @input="setSummary"
              :value="addBook.summary"
              :wrapperClass="['text-t-secondary', 'my-2']"
              label="Summary"
            />
            <div class="my-2 flex justify-between">
              <Input
                @input="setNumPages"
                :value="addBook.numPages"
                type="Number"
                :wrapperClass="[
                  'text-t-secondary',
                  'my-2',
                  'lg:w-1/6',
                  'w-1/2',
                  'mr-1',
                ]"
                label="Number of pages"
              />
            </div>
          </div>
          <!-- Actions -->
          <div class="w-full flex justify-between items-center mt-4">
            <button
              class="flex justify-center items-center"
              v-if="addBook.id !== null || addBook.title.length"
              @click="toggleCurrentBook"
            >
              <div
                class="w-4 h-4 border border-bd-primary flex justify-center items-center text-primary mr-2 bg-b-secondary"
              >
                <svg
                  v-if="addBook.isCurrentBook"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="ai ai-Check w-full h-full"
                >
                  <path d="M4 12l6 6L20 6" />
                </svg>
              </div>
              <p class="text-sm text-t-secondary block text-left">
                Make "{{ addBook.title }}" the club's current book
              </p>
            </button>
            <div></div>
            <div class="flex-shrink-0">
              <button
                @click="hideModal()"
                class="px-3 py-2 text-sm rounded bg-b-tertiary hover:bg-b-quaternary mx-2"
              >
                Cancel
              </button>
              <button
                @click="
                  submitClubBook();
                  hideModal();
                "
                class="px-3 py-2 text-sm rounded bg-primary hover:bg-secondary text-white"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import API from "../../../services/api";
import useAuth from "../../../composables/useAuth";
import Modal from "../../common/ui/Modal.vue";
import Input from "../../common/ui/Input.vue";
import Text from "../../common/ui/Text.vue";
import useClubs from "../../../composables/useClubs";
export default {
  components: {
    Modal,
    Input,
    Text,
  },
  props: {
    clubId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { addClubBook } = useClubs();
    const { accessToken } = useAuth();
    const SEARCH_DELAY = 300; //ms
    const views = {
      search: 1,
      manual: 2,
    };

    const state = reactive({
      view: views.search,
      query: "",
      books: [],
      searching: false,
      searchDelay: SEARCH_DELAY, //ms
      interval: null,
      addBook: {
        id: null,
        title: "",
        imageURL: "",
        author: "",
        summary: "",
        numPages: 0,
        isCurrentBook: true,
      },
    });

    const setView = (view) => {
      state.addBook = {
        id: null,
        title: "",
        imageURL: "",
        author: "",
        summary: "",
        numPages: 0,
        isCurrentBook: true,
        errors: [],
        fieldErrors: {
          title: [],
          imageURL: [],
          author: [],
          summary: [],
          numPages: [],
          isCurrentBook: [],
        },
      };
      state.view = view;
    };

    const setTitle = (title) => {
      state.addBook.title = title;
    };

    const setAuthor = (author) => {
      state.addBook.author = author;
    };

    const setSummary = (summary) => {
      state.addBook.summary = summary;
    };

    const setNumPages = (numPages) => {
      state.addBook.numPages = numPages;
    };

    const toggleCurrentBook = () => {
      state.addBook.isCurrentBook = !state.addBook.isCurrentBook;
    };

    const setQuery = (query) => {
      state.query = query;

      if (state.query.length) {
        state.searching = true;
        clearInterval(state.interval); // clear the previous interval
        state.searchDelay = SEARCH_DELAY; // reset the search delay

        // wait until countdown finishes to search
        state.interval = setInterval(() => {
          state.searchDelay -= 100;
          if (state.searchDelay === 0) {
            searchBooks();
          }
        }, 100);
      } else {
        state.searching = false;
        clearInterval(state.interval); // clear the previous interval
        state.searchDelay = SEARCH_DELAY; // reset the search delay
        state.books = [];
      }
    };

    const searchBooks = async () => {
      try {
        const response = await API.searchBooks(accessToken.value, state.query);
        state.books = response.data.data;
      } catch (error) {
        console.log(error);
      }
      state.searching = false;
    };

    const selectBook = (bookId) => {
      state.addBook = state.books.find((book) => book.id === bookId);
      state.addBook.isCurrentBook = true;
    };

    const submitClubBook = async () => {
      try {
        state.addBook.clubId = props.clubId;
        const response = await API.postClubBook(
          accessToken.value,
          state.addBook
        );
        console.log(response);
        addClubBook(response.data.data);
      } catch (error) {
        if (error.response) {
          console.log(error.response);
          state.fieldErrors = error.response.data.data;
          if (state.fieldErrors.clubId) state.errors = state.fieldErrors.clubId;
        } else {
          state.errors.push("an unknown error has occured. Please try again");
        }
      }
    };

    return {
      views,
      ...toRefs(state),
      setView,
      setTitle,
      setAuthor,
      setSummary,
      setNumPages,
      setQuery,
      searchBooks,
      selectBook,
      toggleCurrentBook,
      submitClubBook,
    };
  },
};
</script>

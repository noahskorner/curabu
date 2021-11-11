<template>
  <div class="w-full">
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
            class="ai ai-ChatDots mr-1"
          >
            <path
              d="M14 19c3.771 0 5.657 0 6.828-1.172C22 16.657 22 14.771 22 11c0-3.771 0-5.657-1.172-6.828C19.657 3 17.771 3 14 3h-4C6.229 3 4.343 3 3.172 4.172 2 5.343 2 7.229 2 11c0 3.771 0 5.657 1.172 6.828.653.654 1.528.943 2.828 1.07"
            />
            <path d="M12 11v.01" />
            <path d="M8 11v.01" />
            <path d="M16 11v.01" />
            <path
              d="M14 19c-1.236 0-2.598.5-3.841 1.145-1.998 1.037-2.997 1.556-3.489 1.225-.492-.33-.399-1.355-.212-3.404L6.5 17.5"
            />
          </svg>
          <p class="text-sm">Create post</p>
        </button></template
      >
      <template #content="{ hideModal }">
        <div
          class="bg-b-primary w-full max-w-lg relative z-10 mt-24 rounded shadow text-t-primary font-primary"
        >
          <div
            class="h-10 bg-b-secondary rounded-t px-2 flex items-center justify-between"
          >
            <h3
              class="uppercase text-xs tracking-wide font-medium font-secondary"
            >
              Create post
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
          <div class="p-4">
            <h6
              class="text-sm font-light text-t-secondary w-full border-b border-bd-primary pb-1 mb-4 font-primary"
            >
              Create a post in {{ clubName }}
            </h6>
            <Input
              :wrapperClass="['w-full']"
              label="Title"
              :value="title"
              @input="setTitle"
            />
            <Text
              :wrapperClass="['w-full', 'mt-2']"
              label="Body"
              :value="body"
              @input="setBody"
            />
            <div class="w-full flex justify-end items-center mt-4">
              <button
                @click="
                  cancelPost();
                  hideModal();
                "
                class="px-3 py-2 text-sm rounded border border-bd-primary hover:bg-b-secondary mx-2"
              >
                Cancel
              </button>
              <button
                @click="
                  createPost();
                  hideModal();
                "
                class="px-3 py-2 text-sm rounded bg-primary hover:bg-secondary"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "../../common/ui/Modal.vue";
import Input from "../../common/ui/Input.vue";
import Text from "../../common/ui/Text.vue";
import useClubs from "../../../composables/useClubs";
import { reactive, toRefs } from "@vue/reactivity";
export default {
  components: {
    Modal,
    Input,
    Text,
  },
  props: {
    clubName: {
      type: String,
      required: true,
    },
    clubId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { addPost } = useClubs();

    const state = reactive({
      title: "",
      body: "",
    });

    const setTitle = (title) => {
      state.title = title;
    };

    const setBody = (body) => {
      state.body = body;
    };

    const cancelPost = () => {
      state.title = "";
      state.body = "";
    };

    const createPost = async () => {
      const payload = {
        clubId: props.clubId,
        title: state.title,
        body: state.body,
      };

      await addPost(payload);
    };

    return {
      ...toRefs(state),
      setTitle,
      setBody,
      cancelPost,
      createPost,
    };
  },
};
</script>

<style></style>

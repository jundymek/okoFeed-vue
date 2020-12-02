<template>
  <div
    class="posts-container container"
    :class="{ inactive: state.isLoading }"
    ref="scrollComponent"
  >
    <post v-for="post in state.posts" :key="post.title" :post="post" />
  </div>
  <Spinner :isLoading="state.isLoading" />
  <p v-if="state.isFull" class="end-paragraph">Nie ma więcej wiadomości</p>
</template>

<script lang="ts">
import { ref, onMounted, onUnmounted, reactive } from "vue";
import Post from "./post/Post.vue";
import { fetchPosts } from "./utils/fetchPosts";
import Spinner from "../spinner/Spinner.vue";

export interface SinglePostType {
  title: string;
  thumb: string;
  date: string;
  excerpt: string;
  url: string;
}

export default {
  components: { Post, Spinner },
  name: "Posts",

  setup() {
    const scrollComponent = ref<InstanceType<typeof HTMLDivElement> | null>(
      null
    );
    const state = reactive({
      isLoading: false,
      isFull: false,
      posts: [] as SinglePostType[]
    });

    const handleFetchMore = async () => {
      state.isLoading = true;
      const anotherPosts: SinglePostType[] = await fetchPosts(
        state.posts.length
      );
      state.posts = [...state.posts, ...anotherPosts];
      if (anotherPosts.length < 10) {
        state.isFull = true;
      }
      state.isLoading = false;
    };

    onMounted(handleFetchMore);

    const handleScroll = () => {
      const element = scrollComponent.value;
      if (
        element &&
        element.getBoundingClientRect().bottom < window.innerHeight + 20 &&
        !state.isFull &&
        !state.isLoading
      ) {
        handleFetchMore();
      }
    };
    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return {
      scrollComponent,
      state
    };
  }
};
</script>

<style lang="scss" scoped>
.posts-container {
  display: grid;
  gap: 1.5rem;
  padding-top: 6rem;
  position: relative;
  width: 95%;
  margin: 0 auto;
  @media (min-width: 640px) {
    width: 100%;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.end-paragraph {
  margin: 1rem 0 5rem 0;
  text-align: center;
  color: #718096;
  font-size: 0.75rem;
}

.inactive {
  opacity: 0.2;
  pointer-events: none;
}
</style>

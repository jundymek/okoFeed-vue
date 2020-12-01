<template>
  <div class="posts-container container" ref="scrollComponent">
    <post v-for="post in state.posts" :key="post.title" :post="post" />
  </div>
  <p v-if="state.isLoading">Loading...</p>
  <div v-if="state.isFull">KONIEC</div>
</template>

<script>
import { ref, onMounted, onUnmounted, reactive } from "vue";
import Post from "./post/Post.vue";
import { fetchPosts } from "./utils/fetchPosts";

export default {
  components: { Post },
  name: "Posts",

  setup() {
    const scrollComponent = ref(null);
    const state = reactive({
      isLoading: false,
      isFull: false,
      posts: []
    });

    const handleFetchMore = async () => {
      state.isLoading = true;
      const anotherPosts = await fetchPosts(state.posts.length);
      state.posts.push(...anotherPosts);
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
        !state.isFull
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
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>

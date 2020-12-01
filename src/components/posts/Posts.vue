<template>
  <div class="scrolling-component" ref="scrollComponent">
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
      setTimeout(async () => {
        const anotherPosts = await fetchPosts(state.posts.length);
        state.posts.push(...anotherPosts);
        if (anotherPosts.length < 10) {
          state.isFull = true;
        }
        state.isLoading = false;
      }, 3000);
    };

    onMounted(handleFetchMore);

    const handleScroll = () => {
      const element = scrollComponent.value;
      if (
        element &&
        element.getBoundingClientRect().bottom < window.innerHeight &&
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
.posts {
  background-color: paleturquoise;
}

.list-element {
  height: 130px;
}
.scrolling-component {
  width: 40%;
  min-width: 300px;
  margin: 0 auto;
}
</style>

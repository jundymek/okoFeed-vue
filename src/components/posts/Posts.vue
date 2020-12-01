<template>
  <div
    class="posts-container container"
    :class="{ inactive: state.isLoading }"
    ref="scrollComponent"
  >
    <post v-for="post in state.posts" :key="post.title" :post="post" />
  </div>
  <div class="spinner">
    <p v-if="state.isLoading" class="loader"></p>
  </div>
  <div v-if="state.isFull">KONIEC</div>
</template>

<script lang="ts">
import { ref, onMounted, onUnmounted, reactive } from "vue";
import Post from "./post/Post.vue";
import { fetchPosts } from "./utils/fetchPosts";

export interface SinglePostType {
  title: string;
  thumb: string;
  date: string;
  excerpt: string;
  url: string;
}

export default {
  components: { Post },
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
      setTimeout(async () => {
        const anotherPosts: SinglePostType[] = await fetchPosts(
          state.posts.length
        );
        state.posts = [...state.posts, ...anotherPosts];
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
  width: 100%;
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.spinner {
  position: fixed;
  z-index: 100;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.inactive {
  opacity: 0.2;
  pointer-events: none;
}

.loader,
.loader:after {
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
}
.loader {
  /* font-size: 0.2rem; */
  text-indent: -9999rem;
  border-top: 0.4rem solid #fc8181;
  border-right: 0.4rem solid #fc8181;
  border-bottom: 0.4rem solid #fc8181;
  border-left: 0.4rem solid #181717;
  transform: translateZ(0);
  animation: load8 1.1s infinite linear;
}

@keyframes load8 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

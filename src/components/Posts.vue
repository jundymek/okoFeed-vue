<template>
  <div class="scrolling-component" ref="scrollComponent">
    <post v-for="post in posts" :key="post.title" :post="post" />
  </div>
  <div v-if="state.isFull">KONIEC</div>
</template>

<script>
import { ref, onMounted, onUnmounted, onUpdated, reactive } from "vue";
import Post from "./Post.vue";

const getNewPosts = async index => {
  console.log(index);
  try {
    const response = await fetch(
      `http://localhost:3000/posts?_start=${index}&_limit=10`
    );
    const newPosts = await response.json();
    return newPosts;
  } catch (error) {
    console.log(error);
  }
};

export default {
  components: { Post },
  name: "Posts",

  setup() {
    const posts = ref([]);
    const scrollComponent = ref(null);
    const state = reactive({ isFull: false });

    const fetchPosts = async () => {
      const anotherPosts = await getNewPosts(posts.value.length);
      posts.value.push(...anotherPosts);
      if (anotherPosts.length < 10) {
        console.log("DDDDDDDDD");
        state.isFull = true;
      }
    };

    onMounted(fetchPosts);

    onUpdated(() => {
      console.log(posts.value);
    });

    const handleScroll = () => {
      const element = scrollComponent.value;
      if (
        element &&
        element.getBoundingClientRect().bottom < window.innerHeight &&
        !state.isFull
      ) {
        fetchPosts();
      }
    };
    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return {
      posts,
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

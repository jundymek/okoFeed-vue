<template>
  <div class="scrolling-component" ref="scrollComponent">
    <post v-for="post in posts" :key="post.title" :post="post" />
  </div>
  <!-- <ul class="posts" ref="scrollComponent">
    <li v-for="post in posts" :key="post.title" class="list-element">
      {{ post.title }}
    </li>
  </ul> -->
  <div ref="scrollComponent">Dupa</div>
  <!-- <button @click="getPosts">Pobierz więcej</button> -->
</template>

<script>
// export interface SinglePostType {
//   title: string;
//   thumb: string;
//   date: string;
//   excerpt: string;
//   url: string;
// }
import { ref, onMounted, onUnmounted } from "vue";
import Post from "./Post.vue";

const getNewPosts = async index => {
  console.log(index);
  const response = await fetch(
    `http://localhost:3000/posts?_start=${index}&_limit=10`
  );
  // const numberOfRecords = response.headers.get("x-total-count");
  const newPosts = await response.json();
  console.log({ newPosts });
  return newPosts;
  // console.log(newPosts);
  // console.log(this.totalNumberOfRecords);
};

export default {
  components: { Post },
  name: "Posts",

  methods: {
    async getPosts() {
      const currentIndex = this.posts.length > 0 ? this.posts.length + 1 : 0;
      console.log(currentIndex);
      const response = await fetch(
        `http://localhost:3000/posts?_start=${currentIndex}&_limit=10`
      );
      const numberOfRecords = response.headers.get("x-total-count");
      if (this.totalNumberOfRecords === 0 && numberOfRecords) {
        this.totalNumberOfRecords = parseInt(numberOfRecords);
      }
      const newPosts = await response.json();
      this.posts = [...this.posts, ...newPosts];
      return newPosts;
      // console.log(newPosts);
      // console.log(this.totalNumberOfRecords);
    }
  },

  setup() {
    const posts = ref([]);
    const scrollComponent = ref(null);

    const loadMorePosts = async () => {
      console.log("loadMorePosts");
      const anotherPosts = await getNewPosts(posts.value.length);
      posts.value.push(...anotherPosts);
    };

    onMounted(loadMorePosts);

    const handleScroll = e => {
      console.log(e);
      const element = scrollComponent.value;
      console.log(element);
      if (
        element &&
        element.getBoundingClientRect().bottom < window.innerHeight
      ) {
        console.log("load");
        loadMorePosts();
        // console.log(posts.value);
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
      scrollComponent
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

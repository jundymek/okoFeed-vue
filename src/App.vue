<template>
  <Header />
  <Posts :posts="posts" @get-new-posts="getPosts" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "./components/Header.vue";
import Posts from "./components/Posts.vue";

export interface SinglePostType {
  title: string;
  thumb: string;
  date: string;
  excerpt: string;
  url: string;
}

export default defineComponent({
  name: "app",
  components: {
    Header,
    Posts
  },
  data() {
    return {
      posts: [] as SinglePostType[]
    };
  },

  mounted() {
    this.getPosts();
  },

  methods: {
    async getPosts() {
      const currentIndex = this.posts.length > 0 ? this.posts.length + 1 : 0;
      console.log(currentIndex);
      const response = await fetch(
        `http://localhost:3000/posts?_start=${currentIndex}&_limit=10`
      );
      const newPosts = await response.json();
      this.posts = [...this.posts, ...newPosts];
      console.log(newPosts);
    }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

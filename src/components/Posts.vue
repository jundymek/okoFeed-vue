<template>
  <ul class="posts">
    <li v-for="post in posts" :key="post.title">
      {{ post.title }}
    </li>
  </ul>
  <button @click="getPosts">Pobierz więcej</button>
</template>

<script lang="ts">
export interface SinglePostType {
  title: string;
  thumb: string;
  date: string;
  excerpt: string;
  url: string;
}
import { defineComponent } from "vue";
const Posts = defineComponent({
  name: "posts",

  data() {
    return {
      posts: [] as SinglePostType[],
      totalNumberOfRecords: 0
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
      const numberOfRecords = response.headers.get("x-total-count");
      if (this.totalNumberOfRecords === 0 && numberOfRecords) {
        this.totalNumberOfRecords = parseInt(numberOfRecords);
      }
      const newPosts = await response.json();
      this.posts = [...this.posts, ...newPosts];
      console.log(newPosts);
      console.log(this.totalNumberOfRecords);
    }
  }
});

export default Posts;
</script>

<style lang="scss" scoped>
.posts {
  background-color: paleturquoise;
}
</style>

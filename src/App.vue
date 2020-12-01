<template>
  <Header />
  <Posts :posts="posts" @get-new-posts="getPosts" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "./components/header/Header.vue";
import Posts from "./components/posts/Posts.vue";

export default defineComponent({
  name: "app",
  components: {
    Header,
    Posts
  }
});
</script>

<style lang="scss">
@import '~normalize.css';
</style>

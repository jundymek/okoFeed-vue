<template>
  <Header />
  <Posts :posts="posts" @get-new-posts="getPosts" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "./components/Header.vue";
import Posts from "./components/Posts.vue";

export default defineComponent({
  name: "app",
  components: {
    Header,
    Posts
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

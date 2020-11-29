<template>
  <ul class="posts">
    <li v-for="post in posts" :key="post.title">
      {{ post.title }}
    </li>
  </ul>
  <button @click="$emit('get-new-posts')">Pobierz więcej</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
const Posts = defineComponent({
  name: "posts",
  props: {
    posts: Array
  }
});

export default Posts;
</script>

<style lang="scss" scoped>
.posts {
  background-color: paleturquoise;
}
</style>

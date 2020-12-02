<template>
  <Header />
  <Posts />
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Footer from "./components/footer/Footer.vue";
import Header from "./components/header/Header.vue";
import Posts from "./components/posts/Posts.vue";

export default defineComponent({
  name: "app",
  components: {
    Header,
    Posts,
    Footer
  }
});
</script>

<style lang="scss">
@import "~normalize.css";
</style>

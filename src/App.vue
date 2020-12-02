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
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 640px) {
    max-width: 640px;
  }
  @media (min-width: 768px) {
    max-width: 768px;
  }
  @media (min-width: 1024px) {
    max-width: 1024px;
  }
  @media (min-width: 1280px) {
    max-width: 1280px;
  }
}
</style>

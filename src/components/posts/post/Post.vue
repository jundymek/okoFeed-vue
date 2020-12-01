<template>
  <section class="post">
    <a v-bind:href="post.url" class="post__link">
      <h3 class="post__title">{{ post.title }}</h3>
      <img
        v-bind:src="post.thumb"
        alt=""
        width="440"
        height="280"
        loading="lazy"
        class="post__image"
      />
      <p class="post__description">{{ post.excerpt }}</p>
      <span class="post__date">{{ post.date }}</span>
    </a>
  </section>
</template>

<script>
export default {
  props: {
    post: Object
  }
};
</script>
<style lang="scss" scoped>
.post {
  padding: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  &__date {
    float: right;
    margin: 0.5rem;
    color: #718096;
    font-size: 0.875rem;
  }

  &__description {
    padding-top: 0.5rem;
    font-weight: 100;
  }

  &__image {
    height: 12rem;
    width: 100%;
  }

  &__link {
    text-decoration: none;
    color: inherit;
  }

  &__title {
    height: 6rem;
    font-weight: bold;
  }
}
</style>

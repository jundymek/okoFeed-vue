<template>
  <footer class="footer">
    <p class="footer__paragraph">
      Wykonał z pasją i ❤️
      <a href="https://github.com/jundymek" class="footer__link"
        >Łukasz Dymek</a
      >
    </p>
  </footer>
</template>

<script lang="ts">
export default {
  name: "Footer"
};
</script>

<style lang="scss" scoped>
.footer {
  height: 4rem;
  width: 100vw;
  background-color: $color-header-bg;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  &__link {
    color: $color-dark-white;
    margin-left: 0.25rem;
    text-decoration: underline;
  }
  &__paragraph {
    color: $color-dark-white;
    font-size: 0.75rem;
  }
}
</style>

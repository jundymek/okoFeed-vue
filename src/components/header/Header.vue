<template>
  <header class="header">
    <div class="container">
      <div class="header__logo-wrapper">
        <EyeIcon />
        <h1 class="header__title">Oko Feed</h1>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import EyeIcon from "@/icons/EyeIcon.vue";
export default {
  components: {
    EyeIcon
  }
};
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  width: 100vw;
  height: 4rem;
  background-color: $color-header-bg;
  display: flex;
  align-items: center;
  /* padding-top: 0.5rem;
  padding-bottom: 0.5rem; */
  z-index: 100;

  &__logo-wrapper {
    display: flex;
    align-items: center;
    height: 100%;

    @media (max-width: 640px) {
      margin: 0 0.5rem;
    }
  }

  &__title {
    padding-left: 0.5rem;
    font-weight: bold;
    color: $color-dark-white;
  }

  /* &__wrapper {
    @include container;
  } */
}
</style>

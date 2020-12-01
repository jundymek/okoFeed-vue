<template>
  <header class="header">
    <div class="header__wrapper">
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
  width: 100%;
  height: 4rem;
  background-color: #2d3748;
  display: flex;
  align-items: center;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  z-index: 100;

  &__logo-wrapper {
    display: flex;
    align-items: center;
    margin: 0 0.5rem;
  }

  &__title {
    padding-left: 0.5rem;
    font-weight: bold;
    color: #f7fafc;
  }

  &__wrapper {
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
}
</style>

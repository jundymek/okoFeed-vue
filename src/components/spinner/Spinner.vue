<template>
  <div class="spinner">
    <p v-if="isLoading" class="spinner__item"></p>
  </div>
</template>

<script lang="ts">
export default {
  name: "Spinner",
  props: ["isLoading"]
};
</script>

<style lang="scss" scoped>
.spinner {
  position: fixed;
  z-index: 100;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  &__item,
  &__item:after {
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
  }
  &__item {
    text-indent: -9999rem;
    border-top: 0.4rem solid $color-pink;
    border-right: 0.4rem solid $color-pink;
    border-bottom: 0.4rem solid $color-pink;
    border-left: 0.4rem solid #181717;
    transform: translateZ(0);
    animation: load8 1.1s infinite linear;
  }
}

@keyframes load8 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<template>
  <div v-if="loading" class="loading-page">
    <div class="loading"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Loading extends Vue {
  loading = false
  start() {
    this.loading = true
  }
  finish() {
    this.loading = false
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';
.loading-page {
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  position: fixed;
  padding: 1rem;
  text-align: center;
  font-size: 3rem;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .loading {
    display: inline-block;
    width: 3rem;
    height: 3rem;
    z-index: 1000;
    border: 3px solid $primary;
    border-radius: 50%;
    border-top-color: $white;
    animation: spin 1s ease-in-out infinite;
  }
}
@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>

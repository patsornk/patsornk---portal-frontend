<template>
  <div class="error-page">
    <system-error />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SystemError from '~/components/molecules/error-display/SystemError.vue'
@Component({
  layout: 'resetPassword',
  components: {
    SystemError
  }
})
export default class Example extends Vue {}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.error-page {
  display: flex;
  flex-direction: column;
}
</style>

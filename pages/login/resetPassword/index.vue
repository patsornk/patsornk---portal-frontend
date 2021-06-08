<template>
  <div class="reset-password-page">
    <reset-password-section />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ResetPasswordSection from '~/components/molecules/login/ResetPasswordSection.vue'
@Component({
  layout: 'resetPassword',
  components: {
    ResetPasswordSection
  }
})

export default class Example extends Vue {}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.reset-password-page {
  display: flex;
  flex-direction: column;
}
</style>

<template>
  <div class="login-page">
    <span class="logo">The 1 Portal</span>
    <login-section />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LoginSection from '~/components/molecules/login/LoginSection.vue'

@Component({
  layout: 'login',
  components: {
    LoginSection
  }
})
export default class Example extends Vue {}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.login-page {
  display: flex;
  flex-direction: column;
  .logo {
    font-size: 96px;
    font-weight: 700;
  }
}
</style>
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
  },
  auth: false
})
export default class Example extends Vue {
  mounted() {
    if (this.$auth.loggedIn) {
      this.$router.push('/landing')
    } else {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.login-page {
  display: flex;
  flex-direction: column;
  .logo {
    font-size: 96px;
    font-weight: 700;
    margin-bottom: 43px;
  }
}
</style>

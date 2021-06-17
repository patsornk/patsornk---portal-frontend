<template>
  <div class="reset-password-section">
    <div class="reset-password-card">
      <reset-password />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ResetPassword from '~/components/molecules/login/ResetPassword.vue'
@Component({
  components: {
    ResetPassword
  }
})
export default class ResetPasswordSection extends Vue {}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.reset-password-section {
  .reset-password-card {
    position: relative;
    z-index: 1;
    width: 465px;
    min-height: 356px;
    background-color: $white;
    box-shadow: $box-shadow-black;
    border-radius: 10px;
    padding: 25px 19px;
  }
}
</style>

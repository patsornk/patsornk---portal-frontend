<template>
  <div class="error-container">
    <div class="error-message">
      {{ $t('login.systemErrorMessage') }}
    </div>
    <div class="error-detail">
      {{ $t('login.systemError') }}
    </div>
    <t-1-button class="btn-back" @click.native="onClick">
      {{ $t('login.goBack') }}
    </t-1-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import T1Button from '~/components/atoms/button.vue'

@Component({
  components: {
    T1Button
  }
})
export default class SystemError extends Vue {
  $i18n: any

  get language(): any {
    return this.$i18n.locale
  }

  onClick() {
    this.$router.push('/login')
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.error-container {
  width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .error-message {
    font-weight: bold;
    font-size: 24px;
    // text-align: center;
    line-height: 40px;
  }

  .error-detail {
    text-align: center;
    font-size: 14px;
    line-height: 23.3px;
  }

  .btn-back {
    margin-top: 16px;
    font-size: 16px;
    line-height: 24px;
    font-weight: 700;
  }
}
</style>

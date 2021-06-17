<template>
  <div class="login-section">
    <div class="login-tabs">
      <div
        class="login-tab"
        :class="tabIndex == 0 ? 'tab-active' : ''"
        @click="tabIndex = 0"
      >
        {{ $t('login.headingTitleCG') }}
      </div>
      <div
        class="login-tab no-margin"
        :class="tabIndex == 1 ? 'tab-active' : ''"
        @click="tabIndex = 1"
      >
        {{ $t('login.headingTitleNonCG') }}
      </div>
    </div>
    <div
      class="login-card"
      :class="tabIndex == 0 ? 'active-left' : 'active-right'"
    >
      <central-login v-if="tabIndex === 0" />
      <non-central-login v-if="tabIndex === 1" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CentralLogin from '~/components/molecules/login/CentralLogin.vue'
import NonCentralLogin from '~/components/molecules/login/NonCentralLogin.vue'
@Component({
  components: {
    CentralLogin,
    NonCentralLogin
  }
})
export default class LoginSection extends Vue {
  private tabIndex = 0
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.login-section {
  .login-tabs {
    display: flex;
    justify-content: space-between;
    align-content: center;
    flex: 1 0 auto;
    width: 100%;

    .login-tab {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 100%;
      padding: 13px;
      margin-right: 1rem;
      color: #5c5c5c;
      font-weight: 700;
      background-color: $gray-bg-fade;
      box-shadow: $box-shadow-black;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      cursor: pointer;
    }
    .tab-active {
      color: $primary;
      padding-bottom: 11px;
      border: 2px solid $primary;
      border-image: linear-gradient(
        to right,
        rgba(108, 219, 141, 0) 15%,
        $primary 15%,
        $primary 85%,
        rgba(108, 219, 141, 0) 85%
      ) !important;
      border-image-slice: 1 !important;
      border-right: none;
      border-left: none;
      border-top: none;
      background-color: $white;
    }

    .no-margin {
      margin-right: 0 !important;
    }
  }

  .login-card {
    position: relative;
    z-index: 1;
    width: 500px;
    min-height: 300px;
    background-color: $white;
    box-shadow: $box-shadow-black;
    border-radius: 10px;
    padding: 27px 40px;
  }

  .active-left {
    border-top-left-radius: 0px;
  }

  .active-right {
    border-top-right-radius: 0px;
  }
}
</style>

<template>
  <div class="landing-page">
    <div class="welcome">
      <span>Welcome</span>
    </div>
    <div class="mode-select">
      <span class="title-header">Mode</span>
      <div class="slide">
        <div
          v-for="(item, index) in menuApps"
          :key="index"
          class="slide-item"
          @click="onClickMode(item.value)"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Organization } from '~/constants'

@Component
export default class Landing extends Vue {
  get menuApps() {
    // mock data should get by role
    return [
      {
        title: 'By feature',
        value: Organization.FEATURE
      },
      {
        title: 'By member',
        value: Organization.MAMBER
      },
      {
        title: 'By request',
        value: Organization.REQUEST
      },
      {
        title: 'Organization Management',
        value: Organization.ACCOUNTMANAGEMENT
      }
    ]
  }

  private onClickMode(value: Organization): void {
    this.$store.dispatch('nav/setOrganization', value)
    value === 'ACCOUNTMANAGEMENT'
      ? this.$router.push('/accountManagement')
      : this.$router.push('/organizManagement')
  }

  mounted() {
    this.$store.dispatch('breadcrumb/setBreadcrumb', [])
    // set Page title
    this.$store.dispatch('breadcrumb/setPageTitle', '')
    this.$store.dispatch('nav/setOrganization', '')
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.landing-page {
  background-color: $gray-bg-fade !important;

  .welcome {
    display: flex;
    align-items: center;

    padding: 90px;
    height: 400px;
    background-color: #221f20;
    box-shadow: 0px 4px 22px rgba(0, 0, 0, 0.11);
    border-radius: 11px;

    font-size: 96px;
    color: $white;
    font-weight: 700;
  }

  .mode-select {
    margin: 50px 0px 10px 0px;

    .title-header {
      font-size: 48px;
      font-weight: 700;

      //border lnwza007
      border: 7px solid $primary;
      border-image: linear-gradient(
        to right,
        rgba(108, 219, 141, 0) 0%,
        $primary 0%,
        $primary 37%,
        rgba(108, 219, 141, 0) 37%
      ) !important;
      border-image-slice: 1 !important;
      border-right: none;
      border-left: none;
      border-top: none;
      background-color: $gray-bg-fade;
    }

    .slide {
      display: flex;
      margin-top: 2rem;

      .slide-item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20%;

        color: $white;
        font-size: 36px;
        font-weight: 700;

        background-color: $gray-disable;
        box-shadow: $box-shadow-black;
        border-radius: 11px;
        padding: 110px 140px;
        margin-right: 14px;
        cursor: pointer;
      }
    }
  }
}
</style>

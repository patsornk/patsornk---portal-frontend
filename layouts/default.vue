<template>
  <div class="flex w-full min-h-screen">
    <div class="sidebar">
      <sidebar-nav />
    </div>
    <div class="flex flex-col w-full">
      <header-nav />
      <div class="main w-full">
        <breadcrumb />
        <div v-if="isShowTitleButton" class="title-contriner">
          <span class="page-title">{{ pageTitle }}</span>
          <t-1-button @click.native="onClickTitleButton">Create</t-1-button>
        </div>
        <div v-else class="title-contriner">
          <span class="page-title">{{ pageTitle }}</span>
        </div>
        <transition name="zoom-fade" mode="out-in">
          <Nuxt class="content" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import HeaderNav from '~/components/organisms/navbar/HeaderNavbar.vue'
import SidebarNav from '~/components/organisms/navbar/SidebarNavbar.vue'
import Breadcrumb from '~/components/atoms/Breadcrumb.vue'
import T1Button from '@/components/atoms/button.vue'
import { BreadcrumbType, Organization } from '~/constants'

@Component({
  components: {
    HeaderNav,
    SidebarNav,
    T1Button,
    Breadcrumb
  }
})
export default class Default extends Vue {
  get isSidebar() {
    return this.$store.getters['nav/toggleSidebar']
  }

  get breadcrumbs(): BreadcrumbType[] {
    return this.$store.getters['breadcrumb/breadcrumbs']
  }

  get pageTitle(): string {
    return this.$store.getters['breadcrumb/pageTitle']
  }

  get isShowTitleButton(): boolean {
    switch (this.pageTitle) {
      case 'Organization Management':
        return true
      default:
        return false
    }
  }

  onClickTitleButton() {
    switch (this.pageTitle) {
      case 'Organization Management':
        this.$router.push('/organizationManagement/create')
        window.sessionStorage.removeItem('createCompanyFirstTime')
        window.sessionStorage.removeItem('companyFirstTime')
        window.sessionStorage.removeItem('createCompanyId')
        window.sessionStorage.removeItem('createBrandFirstTime')
        window.sessionStorage.removeItem('createBrandId')
        window.sessionStorage.removeItem('createBranchFirstTime')
        window.sessionStorage.removeItem('createBranchId')
        window.sessionStorage.removeItem('maxStepbar')
        this.$store.dispatch('stepbar/setMaxState', 0)
      default:
        return
    }
  }

  @Watch('$route')
  onRouteChanged() {
    if (this.isSidebar && window.innerWidth <= 768) {
      this.$store.dispatch('nav/toggleSidebar')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: greyscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

.main {
  display: flex;
  flex-direction: column;
  padding: 24px;
  background-color: $gray-bg-fade;

  .content {
    background-color: $white;
    min-height: calc(100vh - 206px);
    width: 100%;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }

  .title-contriner {
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .page-title {
      margin-bottom: 1rem;
      font-size: 36px;
      font-weight: 700;
      color: $mid-black;
    }
  }

  .zoom-fade-enter-active,
  .zoom-fade-leave-active {
    transition: transform 0.35s, opacity 0.28s ease-in-out;
  }
  .zoom-fade-enter {
    transform: scale(0.97);
    opacity: 0;
  }

  .zoom-fade-leave-to {
    transform: scale(1.03);
    opacity: 0;
  }
}
</style>

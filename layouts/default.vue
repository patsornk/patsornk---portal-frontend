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
          <div @click="onClickTitleButton" class="button-title">
            <img class="add-icon" :src="getIcon('icon/add-white.png')" />
            <span class="btn">{{ buttonTitle }}</span>
          </div>
        </div>
        <div v-else class="title-contriner">
          <span class="page-title">{{ pageTitle }}</span>
          <company-status v-if="companyStatus" :status="companyStatus" />
        </div>
        <transition name="zoom-fade" mode="out-in">
          <Nuxt class="content" />
        </transition>
      </div>
    </div>
    <div class="version">Version {{ version }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import T1Button from '@/components/atoms/button.vue'
import HeaderNav from '~/components/organisms/navbar/HeaderNavbar.vue'
import SidebarNav from '~/components/organisms/navbar/SidebarNavbar.vue'
import Breadcrumb from '~/components/atoms/Breadcrumb.vue'
import CompanyStatus from '~/components/atoms/company-status.vue'
import { BreadcrumbType } from '~/constants'
import { getAssetsPath } from '~/helper/images'

@Component({
  components: {
    HeaderNav,
    SidebarNav,
    T1Button,
    Breadcrumb,
    CompanyStatus
  }
})
export default class Default extends Vue {
  get companyStatus(): string {
    return this.$store.getters['company/status']
  }

  get version() {
    const pkgVersion = JSON.stringify(require('../package.json').version)
    return pkgVersion.replace(/["]/g, '')
  }

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
      case 'การจัดการองค์กร':
      case 'Organization Management':
        return true
      default:
        return false
    }
  }

  get buttonTitle(): String {
    switch (this.pageTitle) {
      case 'การจัดการองค์กร':
        return 'สร้างองค์กรใหม่'
      case 'Organization Management':
        return 'Create New Organization'
      default:
        return ''
    }
  }

  getIcon(name: string) {
    return getAssetsPath(name)
  }

  onClickTitleButton() {
    switch (this.pageTitle) {
      case 'การจัดการองค์กร':
      case 'Organization Management':
        window.sessionStorage.removeItem('createCompanyFirstTime')
        window.sessionStorage.removeItem('companyFirstTime')
        window.sessionStorage.removeItem('createCompanyId')
        window.sessionStorage.removeItem('createBrandFirstTime')
        window.sessionStorage.removeItem('createBrandId')
        window.sessionStorage.removeItem('createBranchFirstTime')
        window.sessionStorage.removeItem('createBranchId')
        window.sessionStorage.removeItem('maxStepbar')
        this.$store.dispatch('stepbar/setMaxState', 0)
        this.$router.push('/organizationManagement/create')
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

.version {
  position: fixed;
  right: 8px;
  bottom: 8px;
  color: $mid-black;
  text-align: center;
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
    .button-title {
      display: flex;
      flex-direction: row;
      // width: 229px;
      height: 40px;
      background: $primary;
      border-radius: 6px;
      align-content: center;
      align-items: center;
      cursor: pointer;
      .add-icon {
        width: 12px;
        height: 12px;
        margin: 0px 4px 0px 8px;
      }
      .btn {
        color: $white;
        font-size: 16px;
        font-weight: 700;
        margin: 0px 8px 0px 0px;
      }
    }
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

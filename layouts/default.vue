<template>
  <div class="flex w-full min-h-screen">
    <div class="sidebar">
      <sidebar-nav />
    </div>
    <div class="flex flex-col w-full">
      <header-nav />
      <div class="main w-full">
        <breadcrumb />
        <span class="page-title">{{ pageTitle }}</span>
        <Nuxt class="content" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Watch
} from 'vue-property-decorator'
import HeaderNav from '~/components/organisms/navbar/HeaderNavbar.vue'
import SidebarNav from '~/components/organisms/navbar/SidebarNavbar.vue'
import Breadcrumb from '~/components/atoms/Breadcrumb.vue'
import { BreadcrumbType, Organization } from '~/constants'

@Component({
  components: {
    HeaderNav,
    SidebarNav,
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
  font-family: 'Source Sans Pro', -apple-system,
    BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
    Arial, sans-serif;
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
  }

  .page-title {
    margin-bottom: 1rem;
    font-size: 36px;
    font-weight: 700;
    color: $mid-black;
  }
}
</style>

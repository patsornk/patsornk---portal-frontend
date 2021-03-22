<template>
  <div class="flex w-full">
    <div class="sidebar">
      <sidebar-nav />
    </div>
    <div class="flex flex-col w-full">
      <header-nav />
      <div class="main w-full">
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
import { Organization } from '~/constants'

@Component({
  components: {
    HeaderNav,
    SidebarNav
  }
})
export default class Default extends Vue {
  get isSidebar() {
    return this.$store.getters['nav/toggleSidebar']
  }

  @Watch('$route')
  onRouteChanged() {
    if (this.isSidebar && window.innerWidth <= 768) {
      this.$store.dispatch('nav/toggleSidebar')
    }
  }

  mounted() {
    this.$store.dispatch(
      'nav/setOrganization',
      Organization.FEATURE
    )
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
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

.main {
  padding: 24px;
  background-color: $grey2;

  .content {
    background-color: $white;
    min-height: calc(100vh - 112px);
    width: 100%;
  }
}
</style>

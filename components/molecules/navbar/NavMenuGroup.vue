<template>
  <div class="nav-menu-group">
    <span class="menu-title w-full px-6">
      {{ menuTitle }}
    </span>
    <div class="nav-menu-list my-2">
      <nav-menu
        class="cursor-pointer"
        v-for="(menu, index) in menuItems"
        :key="index"
        :menu="menu"
        :activeMenu="index === activeMenu"
        @click.native="onClickMenu(index)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import NavMenu from '~/components/molecules/navbar/NavMenu.vue'
import { SidebarMenu } from '~/constants'

@Component({
  components: {
    NavMenu
  }
})
export default class NavMenuGroup extends Vue {
  private activeMenu = 0 //should be computed when path existing

  get menuItems(): SidebarMenu[] {
    return this.$store.getters['nav/organizNavbarMenu']
  }

  get menuTitle(): string {
    return this.$store.getters['nav/organizName']
  }

  private onClickMenu(index: number, link: string): void {
    this.activeMenu = index
    // this.$router.push(link)
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

.nav-menu-group {
  .menu-title {
    color: $black;
    font-size: 18px;
    font-weight: 700;
    line-height: 20px;
  }
}
</style>
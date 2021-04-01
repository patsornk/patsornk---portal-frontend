<template>
  <li class="nav-menu">
    <nav-menu-item
      :label="menu.title"
      :icon="menu.icon"
      :active="activeMenu"
    >
      <img
        src="@/assets/images/navbar/arrow-right.png"
        v-if="menu.subMenu"
      />
    </nav-menu-item>
    <ul
      class="sub-menu"
      v-show="
        activeMenu && menu.subMenu && menu.subMenu.length
      "
    >
      <nav-menu
        v-for="(item, index) in menu.subMenu"
        :key="index"
        :menu="item"
        :activeMenu="index === activeSubMenu"
        @click.native="onClickMenu(index)"
      />
    </ul>
  </li>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  Watch
} from 'vue-property-decorator'
import NavMenuItem from '~/components/atoms/navbar/NavMenuItem.vue'

@Component({
  name: 'nav-menu',
  components: {
    NavMenuItem
  }
})
export default class NavMenu extends Vue {
  private activeSubMenu: number = -1

  @Prop({
    type: Boolean,
    default: false
  })
  readonly activeMenu?: false

  @Prop({
    required: true,
    type: Object,
    default: {}
  })
  readonly menu!: {}

  private onClickMenu(index: number, link: string): void {
    this.activeSubMenu = index
    // this.$router.push(link)
  }

  @Watch('activeMenu')
  onChangedActiveMenu() {
    this.activeSubMenu = -1
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.nav-menu {
  .sub-menu {
    padding-left: 36px;

    ::v-deep .content-active {
      border: 4px solid $primary;
      border-image: linear-gradient(
        to bottom,
        rgba(108, 219, 141, 0) 25%,
        $primary 25%,
        $primary 75%,
        rgba(108, 219, 141, 0) 75%
      ) !important;
      border-image-slice: 1 !important;
      border-right: none;
      border-bottom: none;
      border-top: none;
      background-color: $white;
    }

    ::v-deep img {
      display: none;
    }
  }
}
</style>
